const express = require('express')
const ejs = require('ejs');
const path = require('path')

const app = express()

//template engine
app.set("view engine", "ejs");


//middleware
app.use(express.static('public'))


//routing
app.get('/', (req, res) => {
    res.render('index')
})
app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/contact', (req, res) => {
    res.render('contact')
})


const port = 3000;
app.listen(port, () => {
    console.log(`sunucu ${port}unda başlatıldı`);
});




