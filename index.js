const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});




app.post("/", function(req,res){
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;

  var amount = req.body.amount;
  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }

  };

request(options,function(error, response, body){

  var data = JSON.parse(body);
  var price = data.price;
  const currtime = data.time;
  res.write("<h1>the current date is "+currtime+"</h1>");
  res.write("<h1> The current price of "+amount+ "is"+price+"</h1>");
});

});

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
