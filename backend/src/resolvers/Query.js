const { forwardTo } = require('prisma-binding');
const Query = {
  items: forwardTo('db')
  // async items(parent, args, context, info) {
  //   return await context.db.query.items({}, info);
  // }
};

module.exports = Query;
