import express from 'express';
import getRepoList from '../controller/getRepoList.js';

const router = express.Router();

router.get('/', (_, res) => {
  res.render('index');
});

router.get('/list', async (req, res) => {
  const { ownerName } = req.query;
  try {
    const list = await getRepoList({ ownerName });
    res.render('list', { list });
  } catch (e) {
    res.render('list', { error: e.message });
  }
});

export default router;
