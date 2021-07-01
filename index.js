//required npm
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');

//DB connection
mongoose.connect('mongodb://localhost:27017/socialDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + "/public"));

//require the models
const Blog = require('./models/blog');


//landing page
app.get('/', (req, res) => {
    res.render('landing');
})

//index page: show all blogs
app.get('/blogs', async (req, res) => {
    const allBlogsDb = await Blog.find();
    res.render('index', { allBlogsDb });
})

//new page: to add blog
app.get('/blogs/new', async (req, res) => {
    res.render('new');
})

//post request to add blog 
app.post('/blogs', async (req, res) => {
    const newBlog = req.body;
    await Blog.insertMany(newBlog);
    res.redirect('/blogs');
})

//show page to open one blog
app.get('/blogs/:id', async (req, res) => {
    const id = req.params.id;
    const oneBlog = await Blog.findById(id);
    res.render('show', { oneBlog });
})

//edit form 
app.get('/blogs/:id/edit', async (req, res) => {
    const { id } = req.params;
    const oneBlog = await Blog.findById(id);
    res.render('edit', { oneBlog });
})

//patch the blog and visit show page
app.patch('/blogs/:id', async (req, res) => {
    const { id } = req.params;
    const updatedValue = req.body.desc;
    await Blog.findByIdAndUpdate(id, { desc: updatedValue });
    res.redirect(`/blogs/${id}`);

})

//delete blog
app.delete('/blogs/:id', async (req, res) => {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    res.redirect('/blogs');
})

//listening on port 8080
app.listen(8080, () => {
    console.log("OPEN ON PORT 8080!");
})




