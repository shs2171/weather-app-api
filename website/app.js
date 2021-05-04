/* Global Variables */
let baseURL ='http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey='661daa7377189bfe425b6af1f07ac279';

//async get
const retrieveData = async (baseURL,zipCode,apiKey) =>{ 
    const request = await fetch(baseURL + zipCode + ',us' + '&APPID=' + apiKey);
    try {
    const allData = await request.json()
    //console.log(allData);
    //console.log('Data retrieved');
    return allData;
    }
    catch(error) {
      console.log("error", error);
    }
  }
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    console.log(newDate);
    retrieveData(baseURL, zipCode, apiKey)
    .then(function (allData){
        // Add data to POST request
        console.log('Data being posted');
        console.log(allData.main.temp);
        postData('http://localhost:8000/add', {temperature: allData.main.temp, date: newDate, userResponse: feelings } )
      // Function to update UI
      .then(function() {
        updateUI()
    })
     
    })
}
//async post
const postData = async (url = '', data = {}) => {
    console.log('post data started',data);
    const postRequest = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        
        },
        body: JSON.stringify(data),
    })
  
    try {
         
        const newData = await postRequest.json();
        console.log(newData);
        return newData;
    }
    catch (error) {
        console.log('Error', error);
    }
}
//Function to update UI
const updateUI = async () => {
    const request = await fetch('http://localhost:8000/all');
    try {
        const allData = await request.json();
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('content').innerHTML = allData.userResponse;
    }
   
    catch (error) {
        console.log('error', error);
    }
}