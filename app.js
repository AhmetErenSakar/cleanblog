const express = require('express')
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path')
const blog = require('./models/blog')

const app = express()

//connect db
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


//template engine
app.set("view engine", "ejs");


//middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());


//routing
app.get('/', async (req, res) => {
    const blogs = await blog.find({})
    res.render('index', {
        blogs: blogs
    })
})

app.get('/Blogs/:id', async (req, res) => {
    const photo = await blog.findById(req.params.id)
    res.render('post', {
        post: photo
    })
})


app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/contact', (req, res) => {
    res.render('contact')
})
app.post('/Blogs', async (req, res) => {
    await blog.create(req.body)
    res.redirect('/')
})


const port = 3000;
app.listen(port, () => {
    console.log(`sunucu ${port}unda başlatıldı`);
});




