import 'dotenv/config';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './graphql/schema.js';
import limitConnections from './middleware/limitConnections.js';

const app = express();

const { initConnection, freeConnection } = limitConnections(2);
app.use(
  '/graphql',
  initConnection,
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  }),
  freeConnection
);

app.listen(process.env.PORT);
console.log(`Listening :${process.env.PORT}`);
