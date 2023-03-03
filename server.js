const express = require("express");
const { join } = require("path");
const app = express();
const mongoose = require("mongoose");
const ObjectId = mongoose.ObjectId;
const bodyparser = require("body-parser");
const { url } = require("inspector");
app.use(bodyparser.urlencoded({extended:false}));
var urlencoded = bodyparser.urlencoded({extended:false})
app.use(express.json())
//app.use(express.urlencoded({extended: false}))
mongoose.connect("mongodb+srv://pathri14:goodboybathri@cluster0.yht3ea9.mongodb.net/cloud",{ useUnifiedTopology: true,useNewUrlParser: true});
const noteschema={
    
  name:String,
  type : String, breed:String, age:String,gender:String, vaccinated: String, spayed:String, bite: String,
   friendly:String,
  reason:String
}
const Note = mongoose.model("Note", noteschema);
app.set('view engine', 'ejs')
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.static(join(__dirname, "public")));


app.get("/", (_, res) => {
  res.sendFile(join(__dirname, "home.html"));
});

app.get("/rehome.html", (_, res) => {
  res.sendFile(join(__dirname, "rehome.html"));
});
app.post("/rehome.html",function(req,res){
  let nt = new Note({
    name :req.body.names,
    type : req.body.type,
    breed : req.body.breed,
    age : req.body.age,
    gender : req.body.gender,
    vaccinated:req.body.vaccinated,
    spayed: req.body.spayed,
    bite: req.body.bite,
    friendly: req.body.friendly,
    reason : req.body.reason


});
nt.save();
res.redirect('/');

})

app.post('/update/:id', urlencoded,(req, res) => {
 

  Note.findOne({
    _id: req.params.id
}).then(data => {
    
  data.name = req.body.name,
  data.type = req.body.type,
  data.breed = req.body.breed,
  data.age = req.body.age,
  data.gender = req.body.gender,
  data.vaccinated = req.body.vaccinated,
  data.spayed= req.body.spayed,
  data.bite =  req.body.bite,
  data.friendly =  req.body.friendly,
  data.reason = req.body.reason

    data.save().then(() => {
        res.redirect('/');
    }).catch(err => console.log(err))
}).catch(err => console.log(err));
  
})

app.post('/delete/:id', (req, res) => {
  console.log(req.params.id);
  Note.remove({
      _id: req.params.id
  }).then(() => {
      res.redirect('/');
  }).catch(err => console.log(err));

})

app.post('/edit/:id', (req,res)=>{
  Note.findOne({
    _id: req.params.id
}).then((data) => {
    res.render('Edit', { pets: data });
}).catch(err => console.log(err));
  
})

app.get("/adoptpet.html", (_, res) => {
    Note.find({}, function(err,notes){
      res.render('index' , {petlist:notes})
    })
   
  
  
});

app.get("/blog.html", (_, res) => {
  res.sendFile(join(__dirname, "blog.html"));
});

app.get("/home.html", (_, res) => {
  res.sendFile(join(__dirname, "home.html"));
});

app.get("/index.html", (_, res) => {
  res.sendFile(join(__dirname, "home.html"));
});

// Listen on port 3000
app.listen(5000, () => console.log("Application running on port 5000"));