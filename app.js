const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");




const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");

});

app.post("/", (req, res) => {
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };

    const jsonData = JSON.stringify(data);
    
    const url = "https://us14.api.mailchimp.com/3.0/lists/9faaddd5ea"

    const options = {
        method: "POST",
        auth: "ShivamU:dfffdedd1d0614758e0f3970f77c5859-us14"
    }

    const request = https.request(url, options, (response) => {

        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        

        response.on("data", (data) => {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
     

});


// apiKey = "dfffdedd1d0614758e0f3970f77c5859-us14";
// listId = 9faaddd5ea;


app.post("/failure", (req, res) => {
    res.redirect("/");

});








app.listen(process.env.PORT || 3000, () => {
    // console.log("server is running on port 3000");
});