const express = require('express');
const router = express.Router();

const Task = require('../models/task');

router.get('/', async (req, res) => {
  // res.send('Mongo');
  const tasks = await Task.find();
  console.log(tasks);
  res.render('index', {
    tasks // = tasks: tasks
  });
});

// ADD
router.post('/add', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.redirect('/');
  // res.send('received');
  // console.log(new Task(req.body));
  // console.log(req.body);
});

// UPDATE STATE
router.get('/turn/:id', async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  task.status = !task.status;
  await task.save();
  res.redirect('/');
});

// Edit
router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  res.render('edit', {
    task
  });
});

// Update Data
router.post('/edit/:id', async (req, res) => {
  const { id } = req.params;
  await Task.update({_id: id}, req.body);
  res.redirect('/');
})

// Delete
router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await Task.remove({_id: id});
  res.redirect('/');
  // console.log(req.params);
  // res.send('received!');
});

module.exports = router;