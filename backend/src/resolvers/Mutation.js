const Mutations = {
  createDog(parent, args, context, info) {
    global.dogs = global.dogs || [];
    global.dogs = [...global.dogs, { name: args.name }]
    return { name: args.name };
  }
};

module.exports = Mutations;
