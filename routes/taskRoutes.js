const express = require('express');
const router = express.Router();
const {createTask, getTasks, updateTask} = require('../controllers/taskController');
const validateToken = require('../middleware/validateTokenHandler');

router.post('/tasks', validateToken, createTask);
router.get('/tasks/:taskId', validateToken, getTasks);
router.put('/tasks/:taskId', validateToken, updateTask);

module.exports = router;
