const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



const app = express();


mongoose.connect('mongodb://admin-user:Secure*123@localhost:27017/express-sample?authSource=admin',{ useNewUrlParser: true },(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("mongodb connection successful");
    }
});
mongoose.Promise = global.Promise;


app.use(bodyParser.json());

app.use('/api',require('./routes/products/product'))

app.use((err,req,res,next)=>{
    res.status(422).send({error:err.message});
})




app.listen(4000, err => {
    console.log("Listening on port 4000 ");
})