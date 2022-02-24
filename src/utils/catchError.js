export default async (promise, errorMessage) => {
  try {
    return await promise;
  } catch (e) {
    throw new Error(errorMessage);
  }
};
