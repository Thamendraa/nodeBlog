const express = require("express");
const app = express();
const port = 4000;
const ejs =require("ejs");
const path =require("path");
const controller = require("./Controller/blogController")
const{storage,multer}= require('./Services/molterConfig')
const upload = multer({storage:storage})

//linking 
const db = require("./Model/index");
db.sequelize.sync({ force: false }); 

app.set("view engine","ejs");//gobal ejs lai call garnu ko lagi
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//calling from the controller

app.get("/", controller.blog);
app.get("/createBlog",controller.renderCreateBlog)

app.post("/createBlog",upload.single('image'), controller.createBlog);//middleware

app.use(express.static(path.join(__dirname,"uploads")));

app.get("/blog", controller.blog);

//seemore
app.get('/single/:id',controller.single);

//delete
app.get("/delete/:id",controller.delete);
//setting the port
app.listen(port, () => {
    console.log(" Hello, Node server started at port 4000");
  });