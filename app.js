require('dotenv').config()
const express=require('express');
const app=express();
const PORT=3000;
const path = require('path')
const ejs = require('ejs')
const mongoose=require('mongoose')

require('./config/db');
mongoose.connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: true,
    // useCreateIndex: true
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("database connected successfully...");
}).on('error', (error) => {
    console.warn('Warning', error);
});

app.use(express.static('public'));
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app)

app.listen(PORT,(req,res)=>{
    console.log('Server started');
})