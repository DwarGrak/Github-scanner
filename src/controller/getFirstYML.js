import * as api from '../githubAPI.js';
import catchError from '../utils/catchError.js';

const getFirstYML = async ({ ownerName, repoName, branchName, tree }) => {
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

export default getFirstYML;
