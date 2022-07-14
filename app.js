const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("Public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  var data ={
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);
  const url = "https://us17.api.mailchimp.com/3.0/lists/365542b81f";
  const options = {
    method: "POST",
    auth: "nisargno1:9611b2f3014df4bee58bb8ded5bf83e1-us17"
  };
  const request = https.request(url, options, function(response){
    if(response.statusCode === 200){
      res.sendFile(__dirname+"/success.html")
    }
    else{
      res.sendFile(__dirname+"/failure.html")
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(req, res){
  console.log("Server is running on port 3000");
})

//Succesful subscribed message


//API Key
//9611b2f3014df4bee58bb8ded5bf83e1-us17

//User List id:
//365542b81f
