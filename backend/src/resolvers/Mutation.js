const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutations = {
  async createItem(parent, args, context, info) {
    // TODO Check if logged in
    return await context.db.mutation.createItem({
      data: {
        ...args
      }
    }, info);
  },

  async deleteItem(parent, args, context, info) {
    return await context.db.mutation.deleteItem({
      where: {
        id: args.id
      }
    })
  },

  async updateItem(parent, args, context, info) {
    const itemData =  { ...args };
    delete itemData.id;
    return await context.db.mutation.updateItem({
      where: { id: args.id },
      data: Object.keys(itemData).reduce((obj, curr) => itemData[curr] ? { ...obj, [curr]: itemData[curr] } : obj,{})
    }, info)
  },

  async deleteItem(parent, args, context, info) {
    return await context.db.mutation.deleteItem({
      where: { id: args.id }
    })
  },

  async signup(parent, args, context, info) {
    const props = {
      ...args, 
      email: args.email.toLowerCase(),
      password: await bcrypt.hash(args.password, 10),
      permissions: {
        set: ['USER']
      }
    };

    const user = await context.db.mutation.createUser({
      data: props
    }, info);

    const token = jwt.sign({
      userId: user.id
    }, process.env.APP_SECRET);

    context.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000*60*60*24*365 // 1year cookie
    });

    return user;
  }

};
module.exports = Mutations;
