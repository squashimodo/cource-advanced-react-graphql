const Query = {
  dogs(parent, args, context, info) {
    return global.dogs || [];
  }
};

module.exports = Query;
