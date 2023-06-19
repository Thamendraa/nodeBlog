const { name } = require("ejs");
const db = require("../Model/index");
const Blog = db.blog;

exports.blog = async(req,res) => {
    res.render("blog");
};

exports.renderCreateBlog = async(req,res)=>{
    res.render("createBlog");
}
exports.createBlog = async(req,res) =>{
    console.log(req.file)
    //destructuring objects
    const {title,description,image,}=req.body 
    
    // const name = req.body.name;
    // const email = req.body.email;
    // const address = req.body.address;
    // const contact = req.body.contact;
    // in short way to write it.....
    

    //adding in database tabel
    db.blog.create({
        // Name : name,(If the columne name is different in table ,table columne name 1st and object 2nd)
        title,
        description,
        image: req.file.filename,
        // or image: "http://localhost:4000/"+req.file.filename,
    })
    // redirecting to another page
    res.redirect('/blog')
}