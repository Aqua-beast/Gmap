const mongoose = require('mongoose');
const validator = require('email-validator');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        min: 6,
        max: 18,
    } ,
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate: {
            validator : (value) => validator.validate(value),
            message: (props) => `${props.value} is not a valid email address`,
        }
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

UserSchema.pre('save', async function(next){
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
    next();
})

module.exports = mongoose.model('User', UserSchema);