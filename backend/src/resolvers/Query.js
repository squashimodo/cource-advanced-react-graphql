const { forwardTo } = require('prisma-binding');
const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me: function(parent, args, ctx, info) {
    const { userId } = ctx.request;
    return userId ? ctx.db.query.user({
      where: {
        id: userId
      }
    }, info) : null;
  }
  // async items(parent, args, context, info) {
  //   return await context.db.query.items({}, info);
  // }
};

module.exports = Query;
