const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');
const { requireAuthenticated } = require('./helpers.js');

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  order: requireAuthenticated(async (parent, args, context, info) => {
    const order = await context.db.query.order(
      {
        where: {
          id: args.id,
        },
      },
      info
    );

    const ownsOrder = order.user.id === context.request.userId;

    if (!ownsOrder && !hasPermission(context.request.user, ['ADMIN']))
      throw new Error('No Permissions');

    return order;
  }),
  orders: requireAuthenticated(async (parent, args, context, info) => {
    const orders = await context.db.query.orders(
      {
        where: {
          user: {
            id: context.request.userId,
          },
        },
      },
      info
    );

    return orders;
  }),
  me: (parent, args, context, info) => {
    const { userId } = context.request;
    return userId
      ? context.db.query.user(
          {
            where: {
              id: userId,
            },
          },
          info
        )
      : null;
  },
  users: (parent, args, context, info) => {
    if (!ctx.request.userId) throw new Error('You must be logged in');

    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUDPATE']);

    return ctx.db.query.users({}, info);
  },
  // async items(parent, args, context, info) {
  //   return await context.db.query.items({}, info);
  // }
};

module.exports = Query;
