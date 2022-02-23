import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import File from './File.js';

const Repo = new GraphQLObjectType({
  name: 'Repo',
  fields: {
    name: { type: GraphQLString },
    size: { type: GraphQLInt },
    ownerName: { type: GraphQLString },
    isPrivate: { type: GraphQLBoolean },
    filesCount: { type: GraphQLInt },
    firstYML: { type: File },
    activeWebhooks: { type: new GraphQLList(GraphQLString) },
  },
});

export default Repo;
