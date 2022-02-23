import { GraphQLNonNull, GraphQLString } from 'graphql';
import graphqlFields from 'graphql-fields';
import { getRepo } from '../../controller.js';
import Repo from '../type/Repo.js';

export default {
  type: Repo,
  args: {
    ownerName: { type: new GraphQLNonNull(GraphQLString) },
    repoName: { type: new GraphQLNonNull(GraphQLString) },
    branchName: { type: GraphQLString },
  },
  resolve: (_, args, __, info) => getRepo(args, graphqlFields(info)),
};
