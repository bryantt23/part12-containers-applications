const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require("redis")
const { promisify } = require("util")

const client = redis.createClient({})

const getAsync = promisify(client.get).bind(client)
const setAsync = promisify(client.set).bind(client)

/* GET statistics. */
router.get('/statistics', async (req, res) => {
  const addedTodos = await getAsync("added_todos") || 0
  res.send({ added_todos: parseInt(addedTodos) })
});


/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  // Increment the counter by one in Redis after creating a new todo
  const currentCount = await getAsync("added_todos") || 0
  await setAsync("added_todos", parseInt(currentCount) + 1)

  res.send(todo);
});

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)
  next()
}

const singleRouter = express.Router();

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.todo._id, { $set: req.body }, { new: true });
  res.send(updatedTodo);
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
