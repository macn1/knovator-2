const app = require('./app')

const mongoose = require('mongoose')
const dotenv = require("dotenv");

dotenv.config({
  path: "./config.env",
});



mongoose.connect('mongodb+srv://athulmk:athulmk@cluster0.lsgsqfu.mongodb.net/knovator?retryWrites=true&w=majority',{useNewUrlParser:true}).then(()=>{
    console.log("db connected succesfully");
}).catch(()=>{
    console.log("db connection failed");
})

