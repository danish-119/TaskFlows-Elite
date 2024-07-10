const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Todo = require("./models/todoSchema");

const app = express();
const port = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/taskflows");

app.use(bodyParser.json());
app.use(cors());

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
  const { text, finished } = req.body;
  try {
    const todo = new Todo({
      text,
      finished: finished || false,
    });

    // console.log(todo)
    await todo.save();
    res.status(201).json({message: "task added"});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a todo
app.put("/taskflows/:id", async (req, res) => {
  const id = req.params.id;
  const { text, finished } = req.body;

  try {
    const todo = await Todo.findByIdAndUpdate(
      id,
      { text, finished },
      { new: true }
    );
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a todo
app.delete("/taskflows/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
