const express = require('express')
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')
const ejs = require('ejs');
const path = require('path')
const methodOverride = require('method-override')
const blogController = require('./controllers/blogControllers')
const pageController = require('./controllers/pageController')

const app = express()

//connect db
mongoose.connect('mongodb+srv://Vivictom:GJ43OmeI1N7TFnOG@cluster0.m9xakau.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


//template engine
app.set("view engine", "ejs");


//middlewares
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}));

//routes
app.get('/', blogController.getAllBlogs);
app.get('/Blogs/:id', blogController.getBlog)
app.get('/about', pageController.getAbout)
app.get('/contact', pageController.getContact)
app.post('/Blogs', blogController.createBlog)
app.get('/Blogs/edit/:id', pageController.getEdit)
app.put('/Blogs/:id', blogController.editBlog)
app.delete('/Blogs/:id', blogController.deleteBlog)


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`sunucu ${port}unda başlatıldı`);
});




