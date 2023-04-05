const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

        res.sendFile(__dirname+"/index.html");
    
    //res.send("server is up and running")
})

app.post("/",function(req,res){
    //console.log(req.body.cityName);
    //console.log("post request received");
    //const query="london";
    const query=req.body.cityName;
    const apikey="5afb89c4348531aed32a1185002e0cc9";
    const unit="metric";

    const url="https://api.openweathermap.org/data/2.5/weather?q="+query +"&appid="+ apikey+"&units="+unit;
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            //console.log(data);
            const weatherData=JSON.parse(data)
            //console.log(weatherData);
            // const object ={
            //     name:"Angela",
            //     favouriteFood:"Ramen"
            // }
            // console.log(JSON.stringify(object));
            const temp=weatherData.main.temp;
            //console.log(temp);
            const wdesc=weatherData.weather[0].description;
            //console.log(wdesc);
           //res.send("<h1>The temperature in london is"+temp+"degree celcius.</h1>");
            res.write("<p>The weather is currentyly "+wdesc+"</p> ");
            res.write("<h1>The temperature in "+ query +" is"+temp+"degree celcius.</h1>");
            //res.send();
            const icon=weatherData.weather[0].icon;
            const imgURL="http://openweathermap.org/img/wn/"+icon +"@2x.png";
            res.write("<img src="+ imgURL +">");
            res.send();


        })

    })
})



app.listen(3000,function(){
    console.log("server is running on port 3000.");
})