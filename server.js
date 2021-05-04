// Setup empty JS object to act as endpoint for all routes
let projectData = {};
// Require Express to run server and routes
const express= require('express');
const cors = require('cors');
//const bodyParser = require('body-parser');


// Start up an instance of app
const app= express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors);

// Initialize the main project folder
app.use(express.static('website'));
//Get route to return project data
app.get('/all', function (req, res) {
    res.send(projectData);
    console.log(projectData);
  });
//Post route to add incoming data to project data
app.post('/add', addData);
function addData(req,res){
    newEntry={
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse
    }
    projectData=newEntry;
    console.log(projectData);
    res.send(projectData);
   

};
// Setup Server
const port=8000;
const server = app.listen(port, listening);
function listening(){
    console.log(`running on localhost: ${port}`);
};