import * as api from '../githubAPI.js';
import catchError from '../utils/catchError.js';
import getActiveWebhooks from './getActiveWebhooks.js';
import getFirstYML from './getFirstYML.js';
import getRepoTree from './getRepoTree.js';

const getRepo = async ({ ownerName, repoName, branchName }, fields) => {
  const {
    data: { name, size, owner, private: isPrivate },
  } = await catchError(
    api.getRepo({ ownerName, repoName }),
    'Repository was not found'
  );

  let filesCount, firstYML;
  if ('filesCount' in fields || 'firstYML' in fields) {
    const tree = await getRepoTree({ ownerName, repoName, branchName });

    filesCount = tree.length;

    if ('firstYML' in fields) {
      firstYML = getFirstYML({
        ownerName,
        repoName,
        branchName,
        tree,
      });
    }
  }

  const activeWebhooks =
    'activeWebhooks' in fields
      ? getActiveWebhooks({ ownerName, repoName })
      : null;

  return {
    name,
    size,
    ownerName: owner.login,
    isPrivate,
    filesCount,
    firstYML,
    activeWebhooks,
  };
};

export default getRepo;
