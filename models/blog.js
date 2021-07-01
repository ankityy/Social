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
})

const Blog = mongoose.model('Blog', schema);

module.exports = Blog;

