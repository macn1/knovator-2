const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,'enter your name']
    },
 
    password:{
        type:String,
        required:[true,'enter your password'],
        // select:false
    }
    
    
})

const User = mongoose.model("User",userSchema)

module.exports=User