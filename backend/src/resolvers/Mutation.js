const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { promisify } = require('util');
const randomBytes = promisify(crypto.randomBytes);
const { transport, makeANiceEmail } = require('../mail');
const { hasPermission } = require('../utils');

const requireAuthenticated = function(fn) {
  return async (parent, args, context, info) => {
    if (!context.request.userId) throw new Error('NOO');
    return fn(parent, args, context, info);
  };
};

const Mutations = {
  createItem: requireAuthenticated(async (parent, args, context, info) => {
    return await context.db.mutation.createItem(
      {
        data: {
          // Create a relationship between the item and the user
          user: {
            connect: {
              id: context.request.userId,
            },
          },
          ...args,
        },
      },
      info
    );
  }),

  async deleteItem(parent, args, context, info) {
    const item = await context.db.query.item(
      {
        where: {
          id: args.id,
        },
      },
      '{ id, title, user { id } }'
    );

    const ownsItem = item.user.id === context.request.userId;
    const hasPermission = context.request.user.permissions.some(p =>
      ['ADMIN', 'ITEMDELETE'].includes(p)
    );

    if (!ownsItem && !hasPermission)
      throw new Error('You dont have permissions to do this');
    return await context.db.mutation.deleteItem({
      where: {
        id: args.id,
      },
    });
  },

  async updateItem(parent, args, context, info) {
    const itemData = { ...args };
    delete itemData.id;
    return await context.db.mutation.updateItem(
      {
        where: { id: args.id },
        data: Object.keys(itemData).reduce(
          (obj, curr) =>
            itemData[curr] ? { ...obj, [curr]: itemData[curr] } : obj,
          {}
        ),
      },
      info
    );
  },

  signout(parent, { email }, context, info) {
    context.response.clearCookie('token');
    return {
      message: 'Bye!',
    };
  },

  async requestReset(parent, { email }, context, info) {
    const user = await context.db.query.user({
      where: {
        email,
      },
    });

    if (!user) throw new Error(`No such user found for email ${email}`);

    const resetToken = (await randomBytes(20)).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1h from now

    const response = await context.db.mutation.updateUser({
      where: {
        email: email,
      },
      data: {
        resetToken: resetToken,
        resetTokenExpiry: resetTokenExpiry,
      },
    });

    const mailResponse = await transport.sendMail({
      from: 'noreply@store.com',
      to: user.email,
      subject: 'Reset password',
      html: makeANiceEmail(
        `Click the following link to enter a new password \n\n
        <a href="${
          process.env.FRONTEND_URL
        }/reset?resetToken=${resetToken}">Click here!</a>
        `
      ),
    });

    return {
      message: 'Done!',
    };
  },

  async resetPassword(
    parent,
    { password, confirmPassword, resetToken },
    context,
    info
  ) {
    if (confirmPassword !== password)
      throw new Error('Passwords does not match');
    const [user] = await context.db.query.users({
      where: {
        resetToken: resetToken,
        resetTokenExpiry_gte: Date.now() - 3600000,
      },
    });

    if (!user) throw new Error('This token is either invalid or expired');

    const updatedUser = await context.db.mutation.updateUser({
      where: { email: user.email },
      data: {
        password: await bcrypt.hash(password, 10),
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.APP_SECRET
    );

    context.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1year cookie
    });

    return updatedUser;
  },

  async signin(parent, { email, password }, context, info) {
    const user = await context.db.query.user({
      where: {
        email,
      },
    });

    if (!user) throw new Error(`No such user found for email ${email}`);

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) throw new Error('Invalid password');

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.APP_SECRET
    );

    context.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1year cookie
    });

    return user;
  },

  async signup(parent, args, context, info) {
    const props = {
      ...args,
      email: args.email.toLowerCase(),
      password: await bcrypt.hash(args.password, 10),
      permissions: {
        set: ['USER'],
      },
    };

    const user = await context.db.mutation.createUser(
      {
        data: props,
      },
      info
    );

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.APP_SECRET
    );

    context.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1year cookie
    });

    return user;
  },

  updatePermissions: requireAuthenticated(
    async (parent, { permissions, userId }, context, info) => {
      const user = await context.db.query.user(
        {
          where: {
            id: userId,
          },
        },
        info
      );

      if (!user) throw new Error('No user found');

      hasPermission(context.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

      context.db.mutation.updateUser({
        where: {
          id: userId,
        },
        data: {
          permissions: {
            set: permissions,
          },
        },
      });
    }
  ),

  addToCart: requireAuthenticated(async (parent, args, context, info) => {
    const { userId } = context.request;
    const [existingCartItem] = await context.db.query.cartItems({
      where: {
        user: {
          id: userId,
        },
        item: {
          id: args.id,
        },
      },
    });

    if (existingCartItem) {
      return context.db.mutation.updateCartItem(
        {
          where: {
            id: existingCartItem.id,
          },
          data: {
            quantity: existingCartItem.quantity + 1,
          },
        },
        info
      );
    } else {
      return context.db.mutation.createCartItem(
        {
          data: {
            user: {
              connect: {
                id: userId,
              },
            },
            quantity: 1,
            item: {
              connect: {
                id: args.id,
              },
            },
          },
        },
        info
      );
    }
  }),

  removeFromCart: requireAuthenticated(async (parent, args, context, info) => {
    const cartItem = await context.db.query.cartItem(
      {
        where: {
          id: args.id,
        },
      },
      ` { id, user { id }}`
    );

    if (!cartItem) throw new Error('No item found');

    if (cartItem.user.id !== context.request.userId)
      throw new Error('Not da owner');

    return context.db.mutation.deleteCartItem(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
  }),
};
module.exports = Mutations;
