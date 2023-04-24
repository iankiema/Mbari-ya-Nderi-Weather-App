const apikey = "d83c64685d09c8b739e49ac2e5749cc3";

const weatherDataEl = document.getElementById("weather-data");
const cityInput = document.getElementById("city-input")
const cityInput2 = document.getElementById("city-input2")
const formEl = document.querySelector("form")
const cityName = document.getElementById("city-name")

formEl.addEventListener("submit",(event) => {
    event.preventDefault();
    const cityValue = cityInput.value || cityInput2.value;
    
    getWeatherData(cityValue)
    

    
})

async function getWeatherData(cityValue){
    try {
       const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)

       if(!response.ok){
            throw new Error("Network response was not ok")
       }
       const data = await response.json()

       console.log(data)
      
       const temperature = Math.round(data.main.temp)

       const description = data.weather[0].description

       const icon = data.weather[0].icon

       const city = data.name

       const details = [
        `Feels like: ${Math.round(data.main.feels_like)}`,
        `Humidity: ${data.main.humidity}%`,
        `Wind speed: ${data.wind.speed} m/s`,
        
       ]

       weatherDataEl.querySelector(".icon").innerHTML =`<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`

       weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`

       weatherDataEl.querySelector(".description").textContent = description

       weatherDataEl.querySelector("#city-name").innerHTML = `${city}`

       weatherDataEl.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join("")

       cityInput.value=""
       cityInput2.value=""

       
       
    } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(".temperature").textContent = "";
        weatherDataEl.querySelector(".description").textContent =
          "An error happened, please try again later"; cityInput.value ="" ;
    
        weatherDataEl.querySelector(".details").innerHTML = "";
        
}
}