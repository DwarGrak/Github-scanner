import * as api from '../githubAPI.js';
import catchError from '../utils/catchError.js';

const getActiveWebhooks = async ({ ownerName, repoName }) => {
  const { data } = await catchError(
    api.getHooks({ ownerName, repoName }),
    'Hooks requesting error'
  );
  return data.filter(({ active }) => active).map(({ config: { url } }) => url);
};

export default getActiveWebhooks;
