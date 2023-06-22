const { name } = require("ejs");
const db = require("../Model/index");
const Blog = db.blog;

exports.blog = async(req,res) => {
    //
    const blog = await db.blog.findAll();
    console.log(blog);  
    //
    res.render("blog",{blog});
};

exports.renderCreateBlog = async(req,res)=>{
    res.render("createBlog");
;}

//ADD TO BLOG
exports.createBlog = async(req,res) =>{
    console.log(req.file)
    //destructuring objects
    const {title,description,image,}=req.body 
    
    //adding in database tabel
    db.blog.create({
        title,
        description,
       // image: req.file.filename,
     image: "http://localhost:4000/"+req.file.filename,
    })
    // redirecting to another page
    res.redirect('/blog')
    
};

// VIEW SINGLE PAGE
exports.single = async(req,res) =>{
    console.log(req.params.id);
    
    // const id = req.params.id;
    const blog = await db.blog.findAll({
        where:{
            id: req.params.id
        }
    });
    //console.log(blog[0]);

    res.render("single",{blog:blog[0]});
};

// DELETE
exports.delete = async(req,res) =>{
    console.log(req.params.id);
    const blog = await db.blog.destroy({
        where: {
            id:req.params.id
        }
    });

    res.redirect("/");

};

//edit
exports.edit = async(req,res) => {
     const id = req.params.id;
    const blog = await db.blog.findAll({
        where:{
            id: req.params.id
        }
    });
    console.log(blog[0].image);
    res.render("editBlog",{blog:blog[0]});
};

//update

exports.update=async (req,res)=>{

    const image = req.body.image; 
    if (req.file) {//
        image = "http://localhost:4000/" + req.file.filename;
    }
    //checks if req.file exists, which indicates that a file was uploaded. If a file was uploaded, 
    //it assigns the image URL to the image variable by concatenating the base URL "http://localhost:4000/" with the filename property of req.file.
    const blog=await db.blog.update({
      title:req.body.title,
      description:req.body.description,
      image:image
    },
    {
      where:{
        id:req.params.id,
      },
    });

    console.log("Updated successfully"),
    res.redirect("/")
  };
