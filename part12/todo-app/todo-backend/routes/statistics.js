const express = require('express');
const router = express.Router();
const { getAsync } = require('../redis');


router.get('/', async (req, res) => {
  try {
    const added_todos = await getAsync('added_todos');
    res.json({ added_todos: added_todos ? parseInt(added_todos) : 0 });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).send({ error: 'Failed to fetch statistics' });
  }
});

module.exports = router;
