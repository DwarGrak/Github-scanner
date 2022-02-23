import 'dotenv/config';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import graphqlFields from 'graphql-fields';
import { getRepo, getRepoList } from './controller.js';

const RepoShort = new GraphQLObjectType({
  name: 'RepoShort',
  fields: {
    name: { type: GraphQLString },
    size: { type: GraphQLInt },
    ownerName: { type: GraphQLString },
  },
});

const FileContent = new GraphQLObjectType({
  name: 'FileContent',
  fields: {
    path: { type: GraphQLString },
    content: { type: GraphQLString },
  },
});

const Repo = new GraphQLObjectType({
  name: 'Repo',
  fields: {
    name: { type: GraphQLString },
    size: { type: GraphQLInt },
    ownerName: { type: GraphQLString },
    isPrivate: { type: GraphQLBoolean },
    filesCount: { type: GraphQLInt },
    firstYML: { type: FileContent },
    activeWebhooks: { type: new GraphQLList(GraphQLString) },
  },
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getRepoList: {
      type: new GraphQLList(RepoShort),
      args: {
        ownerName: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, args) => getRepoList(args),
    },
    getRepo: {
      type: Repo,
      args: {
        ownerName: { type: new GraphQLNonNull(GraphQLString) },
        repoName: { type: new GraphQLNonNull(GraphQLString) },
        branchName: { type: GraphQLString },
      },
      resolve: (_, args, __, info) => getRepo(args, graphqlFields(info)),
    },
  },
});

const schema = new GraphQLSchema({
  query: Query,
});

var app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(process.env.PORT);
console.log(`Listening :${process.env.PORT}`);
