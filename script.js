const apiKey = "826265043a667984a2dc4ce106ad3bb8";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    
    if (res.status === 404) {
        alert("Cidade não encontrada. Tente novamente!");
        return null;
    }

    const data = await res.json();
    return data;
};

const showWeatherData = async (city) => {
    if (city === "") return;

    const data = await getWeatherData(city);
    if (!data) return; 

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    
    weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);

    const countryCode = data.sys.country.toUpperCase();
    countryElement.setAttribute("src", `https://flagsapi.com/${countryCode}/flat/32.png`);
    
    humidityElement.innerText = `${data.main.humidity}%`;  
    windElement.innerText = `${data.wind.speed} km/h`;

    weatherContainer.classList.remove("hide");
};

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value.trim();
        showWeatherData(city);
    }
});
