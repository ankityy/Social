const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }

}, { timestamps: {updatedAt :'updatedAt'}} )

const Blog = mongoose.model('Blog', schema);

module.exports = Blog;

