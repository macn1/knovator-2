const mongoose = require('mongoose')

const postSchema =new mongoose.Schema({
    
        title: String,
        body: String,
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        active: { type: Boolean, default: true },
        location: {
          type: { type: String },
          coordinates: [Number],
        }
})

const Post = mongoose.model(Post,"postSchema")