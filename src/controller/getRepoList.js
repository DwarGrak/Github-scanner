import * as api from '../githubAPI.js';
import catchError from '../utils/catchError.js';

const getRepoList = async ({ ownerName }) => {
  const { data } = await catchError(
    api.getRepoList({ ownerName }),
    'Owner was not found'
  );
  return data.map(({ name, size, owner: { login: ownerName } }) => ({
    name,
    size,
    ownerName,
  }));
};

export default getRepoList;
