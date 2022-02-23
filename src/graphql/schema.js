import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import getRepo from './query/getRepo.js';
import getRepoList from './query/getRepoList.js';

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getRepoList,
    getRepo,
  },
});

const schema = new GraphQLSchema({
  query: Query,
});

export default schema;
