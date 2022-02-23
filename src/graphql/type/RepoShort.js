import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';

const RepoShort = new GraphQLObjectType({
  name: 'RepoShort',
  fields: {
    name: { type: GraphQLString },
    size: { type: GraphQLInt },
    ownerName: { type: GraphQLString },
  },
});

export default RepoShort;
