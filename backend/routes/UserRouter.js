const express = require('express');
const UserRouter = express.Router();
const {signin, login} = require('../controller/UserController');

UserRouter
.get('/register', (req, res)=>{
    res.status(200).json({message: 'demo'});
})
.post('/register', signin)
.post('/login', login)

module.exports = UserRouter;