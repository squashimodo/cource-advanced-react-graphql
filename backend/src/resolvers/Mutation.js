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
  }
};

module.exports = Mutations;
