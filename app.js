const express = require("express");
const app = express();
const port = 4000;
const ejs =require("ejs");
const path =require("path");
const controller = require("./Controller/blogController")
//linking 
const db = require("./Model/index");
db.sequelize.sync({ force: false }); 

app.set("view engine","ejs");//gobal ejs lai call garnu ko lagi
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//calling from the controller
app.get("/", controller.blog);
app.get("/createBlog",controller.renderCreateBlog)


//setting the port
app.listen(port, () => {
    console.log(" Hello, Node server started at port 4000");
  });