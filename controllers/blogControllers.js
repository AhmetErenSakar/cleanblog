const fs = require('fs')
const blog = require('../models/blog');


exports.getAllBlogs = async (req, res) => {

    const page = req.query.page || 1;
    const BlogsPerPage = 2;
    const totalBlog = await blog.find().countDocuments();

    const blogs = await blog.find({}).sort('-dateCreated').skip((page - 1) * BlogsPerPage).limit(BlogsPerPage);

    res.render('index', {
        blogs: blogs,
        current: page,
        pages: Math.ceil(totalBlog / BlogsPerPage)
    })

}

exports.getBlog = async (req, res) => {
    const photo = await blog.findById(req.params.id)
    res.render('post', {
        post: photo
    })
}

exports.createBlog = async (req, res) => {
    const uploadDir = 'public/uploads';

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir)
    }

    let uploadeImage = req.files.image
    let uploadPath = __dirname + '/../public/uploads/' + uploadeImage.name

    uploadeImage.mv(uploadPath, async () => {
        await blog.create({
            ...req.body,
            image: '/uploads/' + uploadeImage.name
        })
        res.redirect('/')
    })

}

exports.editBlog = async (req, res) => {
    const Blog = await blog.findOne({ _id: req.params.id })
    Blog.title = req.body.title
    Blog.description = req.body.description
    Blog.save()

    res.redirect(`/Blogs/${req.params.id}`)
}

exports.deleteBlog = async (req, res) => {
    const Blog = await blog.findOne({ _id: req.params.id });
    let deletedBlog = __dirname + '/../public' + Blog.image;
    fs.unlinkSync(deletedBlog);
    await blog.findByIdAndRemove(req.params.id)
    res.redirect(`/`)
}