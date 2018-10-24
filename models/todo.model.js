const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    title: String,
    description: String,
    date: Date,
    status: String
});

const Todo = mongoose.model('Todo',TodoSchema);

module.exports = Todo;