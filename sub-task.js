const express = require('express');
const router = express.Router();
const Task = require('./models/subTask')


// add subtask----------------------------------------
router.post('/api/sub-task', async (req, res) => {
  try {
    const {task_id} = req.body;
    const newTask = new Task({ task_id});
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// delete subtask--------------------------------------------
router.post('/api/delete_sub_task', async (req, res) => {
  try {
    let del_task=await Task.deleteOne({_id:req.query.id})
    res.status(200).json("Deleted Successfully")
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
module.exports = router;

