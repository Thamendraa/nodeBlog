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
// exports.update = async(req,res) =>{
//     console.log(req.body.title)
//     console.log(req.body.imagepath)

//     const {title,description,image,}=req.body 
//     //adding in database tabel
//     const blog=await db.blog.update({
//         title,
//         description, 
//         image:"http://localhost:4000/"+req.file.filename,
//         where:{
//             id: req.params.id,
//         }
//     })
//     console.log("sucess")
//     // redirecting to another page
//     res.redirect('/')
// }
exports.update=async (req,res)=>{
    console.log(req.body.title)
    console.log(req.body.imagepath)
    const image="http://localhost:4000/"+req.file.filename;
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

    console.log("Updated successfully")
    res.redirect("/")
  }
