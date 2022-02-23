import axios from 'axios';

const gitHub = axios.create({
  headers: {
    Authorization: `token ${process.env.GITHUB_AUTH_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
  },
  baseURL: 'https://api.github.com',
});

export const getRepoList = ({ ownerName }) =>
  gitHub.get(`/users/${ownerName}/repos`);

export const getRepo = ({ ownerName, repoName }) =>
  gitHub.get(`/repos/${ownerName}/${repoName}`);

export const getBranch = ({ ownerName, repoName, branchName }) =>
  gitHub.get(`/repos/${ownerName}/${repoName}/branches/${branchName}`);

export const getTree = ({ ownerName, repoName, treeSHA, recursive }) =>
  gitHub.get(`/repos/${ownerName}/${repoName}/git/trees/${treeSHA}`, {
    params: { recursive },
  });

export const getContent = ({ ownerName, repoName, filePath, branchName }) =>
  gitHub.get(`/repos/${ownerName}/${repoName}/contents/${filePath}`, {
    params: { ref: branchName },
  });

export const getHooks = ({ ownerName, repoName }) =>
  gitHub.get(`/repos/${ownerName}/${repoName}/hooks`);
