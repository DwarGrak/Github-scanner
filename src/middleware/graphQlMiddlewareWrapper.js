const graphqlMiddlewareWrapper =
  (graphqlMiddleware) => async (req, res, next) => {
    await graphqlMiddleware(req, res);
    next();
  };

export default graphqlMiddlewareWrapper;
