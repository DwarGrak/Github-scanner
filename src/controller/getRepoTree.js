import * as api from '../githubAPI.js';
import catchError from '../utils/catchError.js';

const getRepoTree = async ({ ownerName, repoName, branchName }) => {
  if (!branchName) throw new Error('"BranchName" field was not specified!');

  const {
    data: {
      commit: { sha: treeSHA },
    },
  } = await catchError(
    api.getBranch({ ownerName, repoName, branchName }),
    'Branch was not found'
  );

  const {
    data: { tree },
  } = await catchError(
    api.getTree({ ownerName, repoName, treeSHA, recursive: true }),
    'Tree was not found'
  );

  return tree;
};

export default getRepoTree;
