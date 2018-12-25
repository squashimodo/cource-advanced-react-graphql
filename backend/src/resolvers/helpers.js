exports.requireAuthenticated = function requireAuthenticated(fn) {
  return async (parent, args, context, info) => {
    if (!context.request.userId) throw new Error('NOO');
    return fn(parent, args, context, info);
  };
};
