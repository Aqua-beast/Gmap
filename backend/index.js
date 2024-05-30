const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const UserRouter = require('./routes/UserRouter');
const PinRouter = require('./routes/PinRouter');
const cors = require('cors');

const app  = express();

dotenv.config();

app.use(cors({
    origin: "https://gmap-one.vercel.app", 
}))

app.use(express.json());
app.use('/api', UserRouter);
app.use('/api', PinRouter);
const port = process.env.PORT;
mongoose.connect(process.env.MONGO_DB_URL)
.then(() => {
    console.log('database connected successfully');
})
.catch((error)=>{
    console.log(error);
})

app.listen(port, ()=>{
    console.log(`the console is listening at ${port}`);
})