const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  text: {
    type: String,
    required: true,
  },
  finished: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
