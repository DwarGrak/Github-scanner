import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import getRepoList from '../../controller/getRepoList.js';
import RepoShort from '../type/RepoShort.js';

export default {
  type: new GraphQLList(RepoShort),
  args: {
    ownerName: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (_, args) => getRepoList(args),
};
