const express = require('express');
const router = express.Router();
const redis = require('../redis')


router.get('/', async (req, res) => {
  const added_todos = await redis.get('added_todos')
  res.send({
    added_todos: Number(added_todos) || 0
  });
});

module.exports = router;