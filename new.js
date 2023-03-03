const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const ejs = require('ejs')

app.set('view engine', 'ejs')



app.use(bodyparser.urlencoded({extended:true}));

app.get("/" , function(req, res){
    
     res.render('index', {username:"bathri"})
});

app.listen(3000,function(){
    console.log("listening port 3000");
});