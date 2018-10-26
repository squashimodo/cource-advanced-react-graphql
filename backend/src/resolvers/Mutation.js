const Mutations = {
  async createItem(parent, args, context, info) {
    // TODO Check if logged in
    return await context.db.mutation.createItem({
      data: {
        ...args
      }
    }, info);
  }
};

module.exports = Mutations;
