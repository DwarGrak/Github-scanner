import * as api from './githubAPI.js';
import { catchError } from './utils.js';

export const getRepoList = async ({ ownerName }) => {
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

export const getRepoTree = async ({ ownerName, repoName, branchName }) => {
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

export const getActiveWebhooks = async ({ ownerName, repoName }) => {
  const { data } = await catchError(
    api.getHooks({ ownerName, repoName }),
    'Hooks requesting error'
  );
  return data.filter(({ active }) => active).map(({ config: { url } }) => url);
};

export const getFirstYML = async ({
  ownerName,
  repoName,
  branchName,
  tree,
}) => {
  const file = tree.find(({ path }) => /\.yml$/.test(path));
  if (!file) return;

  const {
    data: { content },
  } = await catchError(
    api.getContent({
      ownerName,
      repoName,
      filePath: file.path,
      branchName,
    }),
    'YML file content requesting error'
  );

  return {
    path: file.path,
    content: Buffer.from(content, 'base64').toString(),
  };
};

export const getRepo = async ({ ownerName, repoName, branchName }, fields) => {
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
