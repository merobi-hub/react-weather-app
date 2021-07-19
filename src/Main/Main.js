import React from 'react';
import axios from 'axios';
require('./css/main.css');

const { apiKey } = require('../hidden/credentials.js');

export const Main = () => {

    const loadData = async (apiData) => {

        // convert temps from K to F and round to nearest whole number
    
        var tempF = ((`${apiData.main.temp}` - 273.15) * 9/5 + 32).toFixed() 
        var highF = ((`${apiData.main.temp_max}` - 273.15) * 9/5 + 32).toFixed() 
        var lowF = ((`${apiData.main.temp_min}` - 273.15) * 9/5 + 32).toFixed() 
        var feelsF = ((`${apiData.main.feels_like}` - 273.15) * 9/5 + 32).toFixed() 
    
        console.log(tempF, highF, lowF, feelsF)
    
        // collect data in array
    
        var weatherData = {
            "name": `${apiData.name}`,
            "temp": tempF,
            "high": highF,
            "low": lowF,
            "feelsLike": feelsF,
            "humidity": `${apiData.main.humidity}`,
            "pressure": `${apiData.main.pressure}`,
            "weather": `${apiData.weather[0].description}`
        }
    
        console.log(weatherData)
    
        return createTables(weatherData)
    }
    
    // Populate tables in index.html with data, adjusting text color based on temp
    
    const createTables = (data) => {
    
        var city = document.querySelector(".city")
        city.innerHTML = `${data["name"]}`
    
        var temp = document.querySelector(".temp td")
        if (data["temp"] >= 85){
            temp.innerHTML = `<span style="color:red;">${data["temp"]}&#176;F</span>`
        } else if (data["temp"] >= 50){
            temp.innerHTML = `<span>${data["temp"]}&#176;F</span>`
        } else if (data["temp"] < 50){
            temp.innerHTML = `<span style="color:blue;">${data["temp"]}&#176;F</span>`
        }
    
        var high = document.querySelector(".high td")
        if (data["high"] >= 85){
            high.innerHTML = `<span style="color:red;">${data["high"]}&#176;F</span>`
        } else if (data["high"] >= 50){
            high.innerHTML = `<span>${data["high"]}&#176;F</span>`
        } else if (data["high"] < 50){
            high.innerHTML = `<span style="color:blue;">${data["high"]}&#176;F</span>`
        }
    
        var low = document.querySelector(".low td")
        if (data["low"] >= 85){
            low.innerHTML = `<span style="color:red;">${data["low"]}&#176;F</span>`
        } else if (data["low"] >= 50){
            low.innerHTML = `<span>${data["low"]}&#176;F</span>`
        } else if (data["low"] < 50){
            low.innerHTML = `<span style="color:blue;">${data["low"]}&#176;F</span>`
        }
    
        var feels = document.querySelector(".feels-like td")
        if (data["feelsLike"] >= 80){
            feels.innerHTML = `<span style="color:red;">${data["feelsLike"]}&#176;F</span>`
        } else if (data["feelsLike"] >= 50){
            feels.innerHTML = `<span>${data["feelsLike"]}&#176;F</span>`
        } else if (data["feelsLike"] < 50){
            feels.innerHTML = `<span style="color:blue;">${data["feelsLike"]}&#176;F</span>`
        }
    
        var humidity = document.querySelector(".humidity td")
        humidity.innerHTML = `${data["humidity"]}<span>&#x25;</span>`
    
        var pressure = document.querySelector(".pressure td")
        pressure.innerHTML = `${data["pressure"]} inHg.`
    
        var weather = document.querySelector(".weather td")
        weather.innerHTML = `${data["weather"]}`
    }

    const apiData = async (loc) => {

        // use regex to route input to correct API endpoint (zip if not alpha or name if alpha)
    
        var regex = /^[a-z A-Z]+$/;
        if(!loc.match(regex)){
            let response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${loc},us&appid=${apiKey}`)
            console.log(response.data)
            return loadData(response.data)
        } else {
            let response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}`)
            console.log(response.data)
            return loadData(response.data)
        }
    }

    const [loc, setLoc] = React.useState("");

    const handleSubmit = (event) => {
        console.log(`Location: ${loc}`);
        apiData(loc);
        event.preventDefault();
    }

    return (

        <html lang="en">
            <head>
                <meta charSet="UTF-8"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <script src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
                <title>Weather Data</title>
            </head>

            <body>

                <form onSubmit={handleSubmit} name="testData" id="testDataForm">
                    <label htmlFor="loc">Enter City Name or Zip Code</label>
                    <input type="text" value={loc} onChange={e => setLoc(e.target.value)} name="loc" id="loc" placeholder="New Delhi"/>
                    <button type="submit" id="submitButton">Get Data</button>
                </form> 

                <div className="container" id="table-div">
                    <h1 className="city"></h1>
                </div>

                <table className="temp">
                    <tr>
                        <th>Current Temperature</th>
                    </tr>
                    <tr>
                        <td></td>
                    </tr>
                </table>

                <table className="high">
                    <tr>
                        <th>Today's High</th>
                    </tr>
                    <tr>
                        <td></td>
                    </tr>
                </table>

                <table className="low">
                    <tr>
                        <th>Today's Low</th>
                    </tr>
                    <tr>
                        <td></td>
                    </tr>
                </table>

                <table className="feels-like">
                    <tr>
                        <th>Feels Like</th>
                    </tr>
                    <tr>
                        <td></td>
                    </tr>
                </table>

                <table className="humidity">
                    <tr>
                        <th>Humidity</th>
                    </tr>
                    <tr>
                        <td></td>
                    </tr>
                </table>

                <table className="pressure">
                    <tr>
                        <th>Pressure</th>
                    </tr>
                    <tr>
                        <td></td>
                    </tr>
                </table>

                <table className="weather">
                    <tr>
                        <th>Weather</th>
                    </tr>
                    <tr>
                        <td></td>
                    </tr>
                </table>
                
            </body>
            <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
            <script src="js/main.js" defer></script>
        </html>

    )
}
