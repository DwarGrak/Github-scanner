export default (max) => {
  let count = 0;
  const queue = [];

  const initConnection = (req, res, next) => {
    if (count < max) {
      count += 1;
      next();
    } else {
      queue.push(next);
    }
  };
  const freeConnection = (req, res, next) => {
    if (queue.length) {
      queue.shift()();
    } else {
      count -= 1;
    }
    next();
  };

  return { initConnection, freeConnection };
};
