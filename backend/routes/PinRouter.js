const {getAllPins, createNewPin} = require('../controller/PinController'); 
const router = require('express').Router();

router.get('/user/:email', getAllPins);
router.post('/new', createNewPin);

module.exports = router;