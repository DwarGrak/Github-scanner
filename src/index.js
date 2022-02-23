import 'dotenv/config';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import graphqlFields from 'graphql-fields';
import { getRepo, getRepoList } from './controller.js';

var schema = buildSchema(`
  type RepoShort {
    name: String
    size: String
    ownerName: String
  }

  type FileContent {
    path: String
    content: String
  }

  type Repo {
    name: String
    size: String
    ownerName: String
    isPrivate: Boolean
    filesCount: Int
    firstYML: FileContent
    activeWebhooks: [String]
  }

  type Query {
    repoList(ownerName: String!): [RepoShort!]
    repo(ownerName: String!, repoName: String!, branchName: String): Repo!
  }
`);

const root = {
  repoList: getRepoList,
  repo: (props, _, info) => {
    const fields = graphqlFields(info);
    return getRepo(props, fields);
  },
};

var app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(process.env.PORT);
console.log(`Listening :${process.env.PORT}`);
