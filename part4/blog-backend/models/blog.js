const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: String,
    url: { type: String, required: true },
    likes: { type: Number, default: 0 , min: 0 },
    comments: [{
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()

        returnedObject.comments.forEach(comment => {
            comment.id = comment._id.toString()
            delete comment._id
            delete comment.__v
        })

        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.user.blogs
    }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog