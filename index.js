const apikey = "d83c64685d09c8b739e49ac2e5749cc3";

const weatherDataEl = document.getElementById("weather-data");
const cityInput = document.getElementById("city-input")
const formEl = document.querySelector("form")

formEl.addEventListener("submit",(event) => {
    event.preventDefault();
    const cityValue = cityInput.value;
    
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

       const details = [
        `Feels like: ${Math.round(data.main.feel_like)}`,
        `Humidity: ${data.main.humidity}%`,
        `Wind speed: ${data.wind.speed} m/s`,
        
       ]

       weatherDataEl.querySelector(".icon").innerHTML =`<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`

       weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`

       weatherDataEl.querySelector(".description").textContent = description

       weatherDataEl.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join("")

       
       
    } catch (error) {
        
    }
}