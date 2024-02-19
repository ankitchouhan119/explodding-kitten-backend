const express = require('express');
const { createUser, updateScores, getHighScores, signInUser } = require('../controllers/userController');
const { checkAuth } = require('../middleware/checkAuth');

const authRouter = express.Router();

authRouter.post('/signup', createUser);
authRouter.post('/login', signInUser);

authRouter.use(checkAuth);
authRouter.post('/updatescore', updateScores);
// authRouter.get('/updatescore', updateScores);

// authRouter.get('/', getAllUsers);

authRouter.get('/highest', getHighScores);

module.exports = { authRouter };
