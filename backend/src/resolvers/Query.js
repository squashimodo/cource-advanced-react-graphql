const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me: function(parent, args, ctx, info) {
    const { userId } = ctx.request;
    return userId
      ? ctx.db.query.user(
          {
            where: {
              id: userId,
            },
          },
          info
        )
      : null;
  },
  users: function(parent, args, ctx, info) {
    if (!ctx.request.userId) throw new Error('You must be logged in');

    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUDPATE']);

    return ctx.db.query.users({}, info);
  },
  // async items(parent, args, context, info) {
  //   return await context.db.query.items({}, info);
  // }
};

module.exports = Query;
