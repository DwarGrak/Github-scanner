import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import graphqlRoute from './router/graphql.js';
import uiRoute from './router/ui.js';

const app = express();

app.use(uiRoute);
app.use(graphqlRoute);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.listen(process.env.PORT);
console.log(`Listening :${process.env.PORT}`);
