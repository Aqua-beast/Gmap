const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');

const signin = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const user = new User({username: username, email: email, password: password });

        await user.save();
        return res.status(200).json({
            message: 'user succcessfully created',
            id: user._id
        })
    } catch (error) {
        return res.status(500).json({
            message: 'internal server error',
            error: error
        })
    }
}

const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const data = await User.findOne({email: email});
        if(!data){
            return res.status(400).json({message: `user doesn't exist`});
        }
        if(!bcrypt.compareSync(password, data.password)){
            return res.status(400).json({message: 'password is not valid'});
        }
        res.status(200).json({
            message: 'user has logged in',
            data: data
        }) 
    }
    
    catch(error){
        res.status(500).json({
            message: 'internal server error',
            error: error
        });
    }
}



module.exports = {signin, login};