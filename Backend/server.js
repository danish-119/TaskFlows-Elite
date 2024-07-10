const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Todo = require("./models/todoSchema");

const app = express();
const port = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/taskflows");

app.use(bodyParser.json());

// GET all todos
app.get("/taskflows", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new todo
app.post("/taskflows", async (req, res) => {
  const todo = new Todo({
    id: req.body.id,
    text: req.body.text,
    finished: req.body.finished || false,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a todo
app.put("/taskflows/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.text = req.body.text || todo.text;
    todo.finished = req.body.finished || todo.finished;

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
