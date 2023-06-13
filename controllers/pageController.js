const blog = require('../models/blog');

exports.getAbout = (req, res) => {
    res.render('about')
}
exports.getContact = (req, res) => {
    res.render('contact')
}
exports.getEdit = async (req, res) => {
    const Blog = await blog.findOne({ _id: req.params.id })
    console.log(Blog);
    res.render('edit', {
        Blog
    })
}