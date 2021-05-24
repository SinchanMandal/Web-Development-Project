
const express= require('express');
const request= require('request');
const app=express();
const dotenv=require('dotenv')
dotenv.config()
app.set("view engine","ejs")

app.get("/aboutme",(req,res)=>{
   // throw new Error('BROKEN') 
    res.render("Aboutme")
})
app.get("/", (req, res)=>{
    //res.send("Hello sin green ");
    res.render("homepage.ejs");
});



//Accept all routes except ones specified before

app.get("/result",async(req,res)=>{
    console.log(req.query.moviename)


    const url=`http://www.omdbapi.com/?apikey=${process.env.api_key}&s=${req.query.moviename}`
    request(url,function (error, response, body) {
        console.log(process.env.api_key)
        console.error('error:', error);
            if (!error&&response.statusCode==200) {
                console.log(response)
                const data=JSON.parse(body)
                console.log(data);
                    //res.send(data);
                   // if(data.Response==='False')
                  //  {
                   //     res.send("Movie Not Found");
                  //  }
                   // else{
                    res.render("result", {movieData: data});    
                
                    //}
                
            }
           else {
                res.send('Error');
           }
        })
})



app.get("/result/:id", async(req, res)=>{
    
   const url = `http://www.omdbapi.com/?apikey=${process.env.api_key}&i=${req.params.id}`;
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


app.use((req,res,next)=>{
    const error=new Error('Not Found')
    error.status=404;
    next('error');

})


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
app.get("*", (req, res)=>{
    res.send("Some Error");
});



app.listen(process.env.port, function(){
    console.log(`server started at ${process.env.port}`);
});



















