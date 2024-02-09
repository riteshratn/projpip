const express = require('express');
const { registerUser,currentUser,loginUser,updateUser } = require('../controllers/authController');
const validateToken = require('../middleware/validateTokenHandler');
const { validateUser } = require('../joiValidation/userJoi');

const router = express.Router();

router.post('/register', validateUser(), registerUser);

router.post('/login', validateUser(), loginUser);

router.get('/current',validateToken, currentUser);

router.put('/update/:userId', updateUser);

module.exports = router;