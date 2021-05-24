
const express= require('express');
const request= require('request');
const app=express();
const dotenv=require('dotenv')
dotenv.config()
app.set("view engine","ejs")


app.get("/", (req, res)=>{
    //res.send("Hello sin green ");
    res.render("homepage.ejs");
});
app.get("/aboutme",(req,res)=>{
    res.render("Aboutme")
})

//Accept all routes except ones specified before


app.get("/result",(req,res)=>{
    console.log(req.query.moviename)
    const url=`http://www.omdbapi.com/?apikey=${process.env.api_key}&s=`+ req.query.moviename
    request(url,function (error, response, body) {
        console.log(process.env.api_key)
            if (!error&&response.statusCode==200) {
                
                const data = JSON.parse(body);
                console.log(data);
                
               // res.send(data);
               res.render("result",{movieData:data})
                
            }
           else {
                res.send('bhag');
           }
        })
})

app.get("/result/:id", (req, res)=>{
   
   const url = `http://www.omdbapi.com/?apikey=${process.env.api_key}&i=` + req.params.id;
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body)
            //console.log(data);
            if(data.Response==='False'){
                res.send("Movie Not Found");
            }else{
                //res.send(data);
                res.render("Info", {movie: data});    
            }
        }else{
            res.send('Error');
        }
    });
});
app.get("/result",(req,res)=>{
    res.send("data received")
    console.log(req.query)

})




    

   
   


var colors = require('colors');
const { json, query } = require('express');
//const { request } = require('express');
console.log('hello'.green); // outputs green text
console.log('i like cake and pies'.underline.yellow) // outputs red underlined text
//console.log('inverse the color'.inverse); // inverses the color
console.log('OMG Rainbows!'.rainbow); // rainbow
console.log('Run the trap'.trap); // Drops the bass

app.listen(process.env.port, function(){
    console.log(`server started at ${process.env.port}`);
});




