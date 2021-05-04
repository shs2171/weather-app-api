/* Global Variables */
let baseURL ='http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey='661daa7377189bfe425b6af1f07ac279';

//async get
const retrieveData = async (baseURL,zipCode,apiKey) =>{ 
    const request = await fetch(baseURL + zipCode + ',us' + '&APPID=' + apiKey);
    try {
    const allData = await request.json()
    console.log(allData);
    console.log('Data retrieved');
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
    .then(function (data){
        // Add data to POST request
        console.log('Data being posted');
        console.log(data.main.temp);
        postData('http://localhost:8080/add', {temperature: data.main.temp, date: newDate, userResponse: feelings } )
        console.log('Data posted!')
        // Function which updates UI
        .then(function() {
            updateUI()
        })
    })
}
//async post
const postData = async (url = '', data = {}) => {
    const postRequest = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        
        },
        body: JSON.stringify({
            temperature:data.temperature,
            date:data.date,
            userResponse:data.userResponse
        }),
    });
    try {
        console.log('working!')
        const newData = await postRequest.json();
        console.log(newData,'working');
        console.log('Data posted')
        return newData;
    }
    catch (error) {
        console.log('Error', error);
    }
}
//Function to update UI
const updateUI = async () => {
    const request = await fetch('http://localhost:8080/all');
    try {
        const allData = await request.json();
        console.log(allData);
        console.log('UI updated')
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('content').innerHTML = allData.userResponse;
    }
    catch (error) {
        console.log('error', error);
    }
}