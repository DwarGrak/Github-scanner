import delay from 'delay';
import express from 'express';
import supertest from 'supertest';
import limitConnections from './limitConnections.js';

const sendRequests = (app) =>
  Promise.all(
    Array(4)
      .fill()
      .map(async (_, i) => {
        await delay(50 * i);
        await supertest(app).get(`/test/${i}`);
      })
  );

describe('limitConnections', () => {
  test('unlimited', async () => {
    const log = [];

    const app = express();
    app.get('/test/:id', async (req, res, next) => {
      const {
        params: { id },
      } = req;
      log.push(`start: ${id}`);
      await delay(300);
      log.push(`finish: ${id}`);
      next();
    });

    await sendRequests(app);

    expect(log).toEqual([
      'start: 0',
      'start: 1',
      'start: 2',
      'start: 3',
      'finish: 0',
      'finish: 1',
      'finish: 2',
      'finish: 3',
    ]);
  });

  test('limited', async () => {
    const log = [];

    const app = express();
    const { initConnection, freeConnection } = limitConnections(2);
    app.get(
      '/test/:id',
      initConnection,
      async (req, res, next) => {
        const {
          params: { id },
        } = req;
        log.push(`start: ${id}`);
        await delay(300);
        log.push(`finish: ${id}`);
        next();
      },
      freeConnection
    );

    await sendRequests(app);

    expect(log).toEqual([
      'start: 0',
      'start: 1',
      'finish: 0',
      'start: 2',
      'finish: 1',
      'start: 3',
      'finish: 2',
      'finish: 3',
    ]);
  });
});
