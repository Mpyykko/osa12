const express = require('express');
const { Todo } = require('../mongo');
const router = express.Router();
const { getAsync, setAsync } = require('../redis');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const updateTodoCounter = async () => {
    try {
      const count = await getAsync('added_todos');
      if (count) {
        await setAsync('added_todos', parseInt(count) + 1);
      } else {
        await setAsync('added_todos', 1);
      }
    } catch (error) {
      console.error('Error updating Redis counter:', error);
    }
  };

  await updateTodoCounter();

  try {
    const todo = await Todo.create({
      text: req.body.text,
      done: false,
    });
    res.send(todo);
  } catch (error) {
    console.error('Error creating TODO:', error);
    res.status(500).send({ error: 'Failed to create TODO' });
  }
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const { text, done } = req.body

  if (text) req.todo.text = text
  if (done !== undefined) req.todo.done = done

  await req.todo.save()
  res.send(req.todo)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;