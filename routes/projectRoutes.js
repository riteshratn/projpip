const express = require('express');
const router = express.Router();
const {createProject, getProjects, updateProject} = require('../controllers/projectController');
const validateToken = require('../middleware/validateTokenHandler');

router.post('/projects', validateToken, createProject);
router.get('/projects/:projectId', validateToken, getProjects);
router.put('/projects/:projectId', validateToken, updateProject);

module.exports = router;
