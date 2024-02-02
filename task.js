const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Task = require('./models/task')
const authenticateJWT = (req, res, next) => {
  // const token = req.header('Authorization');

  //id of user which is logged in
  const token = jwt.sign(
    { id: '65ba0c23063f9c40d201a906'},
    "token"
  );
const decoded = jwt.verify(token, 'token');
  if (!decoded) return res.status(401).json({ message: 'Unauthorized' });
  // console.log(decoded)
req.userId = decoded.id;
next()
};


//get user tasks----------------------------------------------------------

router.get('/get_tasks', authenticateJWT , async (req, res) =>
{
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  try {
    
  const skip = (page - 1) * limit;
  // setting priprity-----------
 
  if (req.query.priority !== undefined) {
    priority = req.query.priority;
    const tasks = await Task.find({ user_id: req.userId, priority: { $gte: priority } })
    .skip(skip)
    .limit(limit);

  res.json({
    status: true,
    content: {
      data: tasks,
      currentPage: page,
      totalPages: Math.ceil(await Task.countDocuments({ user_id: req.userId, priority: { $gte: priority } }) / limit),
      totalItems: await Task.countDocuments({ user_id: req.userId, priority: { $gte: priority } }),
    },
  });
} else {
  // sorting by date-----------------------------------------
  // const sortByDate = req.query.sort === 'date';
  // const sortParam = sortByDate ? { createdAt: sortByDate ? 1 : -1 } : { title: 1 };
    let tasks = await Task.find({ user_id : req.userId }).skip(skip).limit(limit);
    // console.log(tasks);
    res.json({
      status:true,
      content:{
        data:tasks,
        currentPage: page,
      totalPages: Math.ceil(await Task.countDocuments() / limit),
      totalItems: await Task.countDocuments(),
      }
    });}

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
});

//add tasks------------------------------------------------------------
router.post('/api/tasks', authenticateJWT, async (req, res) => {
  try {
    const user_id = req.userId;
    const {id,title, description, due_date } = req.body;
    const newTask = new Task({id,user_id,title, description, due_date });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


//update task----------------------------------------------------------------
router.post('/api/update_task', authenticateJWT, async (req, res) => {
  try {
    const query = req.query.id;
    const up_task = Task.findOne({ id: query });
    if(up_task){
    const {due_date, status} = req.body;
    const newTask =Task.findByIdAndUpdate({ id: query },{due_date:due_date,status:status });
    
    res.status(201).json(newTask);}
    else{
      return res.status(404).json('The task with the given ID was not found')
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



// delete task---------------------------------------------------------
router.post('/api/delete_task', authenticateJWT, async (req, res) => {
  try {
    let del_task=await Task.deleteOne({id:req.query.id})
    res.status(200).json("Deleted Successfully")
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
module.exports = router;

