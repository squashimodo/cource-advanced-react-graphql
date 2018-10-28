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
  }
};

module.exports = Mutations;
