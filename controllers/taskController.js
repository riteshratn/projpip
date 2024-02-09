const asyncHandler = require('express-async-handler');
const Task = require('../models/task');
const Project = require('../models/project');

// @route POST /api/tasks
const createTask = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { projectId, title, description } = req.body;
  
    try {
      const project = await Project.findOne({ _id: projectId, createdBy: userId });
      if (!project) {
        return res.status(403).json({ message: 'You do not have access to this project.' });
      }
  
      const task = new Task({ title, description, project: projectId, createdBy: userId });
      const savedTask = await task.save();
  
      await Project.findByIdAndUpdate(projectId, { $push: { tasks: savedTask._id } });
  
      res.status(201).json(savedTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

// @route GET /api/tasks/:projectId
const getTasks = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const taskId = req.params.taskId;

  try {
      const task = await Task.findOne({ _id: taskId, createdBy: userId }).populate('project');
      if (!task) {
          return res.status(404).json({ message: 'Task not found for the user.' });
      }
      res.json(task);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

const updateTask = asyncHandler(async (req, res) => {
  const userId = req.user._id; 
  const taskId = req.params.taskId; 
  const { title, description } = req.body;

  try {
      const task = await Task.findOne({ _id: taskId, createdBy: userId });
      if (!task) {
          return res.status(403).json({ message: 'You do not have access to this task.' });
      }

      task.title = title || task.title;
      task.description = description || task.description;
      
      const updatedTask = await task.save();

      res.status(200).json(updatedTask);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = { createTask, getTasks, updateTask };
