const Query = {
  dogs(parent, args, context, info) {
    return [
      {
        name: 'Snickers'
      },
      {
        name: 'Sunny'
      }
  ]
  }
};

module.exports = Query;
