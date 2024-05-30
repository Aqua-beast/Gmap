const Pin = require('../models/PinModel');

const createNewPin = async (req, res) => {
    try{
        console.log('satrted')
        const newPin = new Pin(req.body);
        console.log(req.body)
        await newPin.save();
        return res.status(200).json({data: newPin}); 
    }catch(err){
        return res.status(500).json({
            message: 'Internal Server Error',
            error: err
        })
    }
}

const getAllPins = async(req, res) => {
    try{
        const {email} = req.params;
        console.log(email)
        const allPins = await Pin.find({ email: email});
        return res.status(200).json({data: allPins});
    }catch(err){
        return res.status(500).json({
            message: 'Internal Server Error',
            error: err
        })
    }
}

module.exports = {getAllPins, createNewPin};