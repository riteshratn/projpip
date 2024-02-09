const asyncHandler = require('express-async-handler');
const Project = require('../models/project');
const User = require('../models/user');

// @route POST /api/projects
const createProject = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { name } = req.body;
  
    try {
      const project = new Project({ name, createdBy: userId });
      const savedProject = await project.save();
  
      await User.findByIdAndUpdate(userId, { $push: { projects: savedProject._id } });
  
      res.status(201).json(savedProject);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

// @route GET /api/projects
const getProjects = asyncHandler(async (req, res) => {
  const userId = req.user._id;
    const projectId = req.params.projectId;

    try {
        const project = await Project.findOne({ _id: projectId, createdBy: userId });
        if (!project) {
            return res.status(404).json({ message: 'Project not found for the user.' });
        }
        res.json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const updateProject = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const projectId = req.params.projectId;
  const { name } = req.body;

  try {
      const project = await Project.findOne({ _id: projectId, createdBy: userId });
      if (!project) {
          return res.status(403).json({ message: 'You do not have access to this project.' });
      }

      project.name = name || project.name;

      const updatedProject = await project.save();

      res.status(200).json(updatedProject);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = { createProject, getProjects, updateProject };
