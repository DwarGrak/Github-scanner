import { GraphQLObjectType, GraphQLString } from 'graphql';

const File = new GraphQLObjectType({
  name: 'File',
  fields: {
    path: { type: GraphQLString },
    content: { type: GraphQLString },
  },
});

export default File;
