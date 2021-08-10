const express = require('express');
const add = require('./db');
const app = express.Router();

app.post('/add', function(req, res) {
  const todo = {
      taskName: req.body.taskName,
      taskId: req.body.taskId,
      subtaskId: req.body.subtaskId,
  };
  console.log(231);
  add(todo);
});

module.exports=app;

