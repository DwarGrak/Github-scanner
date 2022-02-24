import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from '../graphql/schema.js';
import limitConnections from '../middleware/limitConnections.js';

const router = express.Router();

const { initConnection, freeConnection } = limitConnections(2);
router.use(
  '/graphql',
  initConnection,
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  }),
  freeConnection
);

export default router;
