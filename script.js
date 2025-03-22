async function getWeather() {
    const city = document.getElementById("city").value;
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    const apiKey = "47c7cae90097d9f8f3cd8661a7d518ea"; 
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        if (weatherData.cod === "401") {
            alert("Invalid API Key! Please check your API Key.");
            return;
        }

        if (weatherData.cod === "404") {
            alert("City not found! Please enter a valid city.");
            return;
        }

        let weatherImage = "";
        let bgImage = "";
        let weatherCondition = weatherData.weather[0].main.toLowerCase();

        if (weatherCondition.includes("clear")) {
            weatherImage = "https://cdn-icons-png.flaticon.com/512/869/869869.png"; // Sunny
            bgImage = "https://source.unsplash.com/1600x900/?sunny,clear";
        } else if (weatherCondition.includes("cloud")) {
            weatherImage = "https://cdn-icons-png.flaticon.com/512/414/414927.png"; // Cloudy
            bgImage = "https://source.unsplash.com/1600x900/?cloudy,sky";
        } else if (weatherCondition.includes("rain")) {
            weatherImage = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png"; // Rainy
            bgImage = "https://source.unsplash.com/1600x900/?rain,storm";
        } else if (weatherCondition.includes("snow")) {
            weatherImage = "https://cdn-icons-png.flaticon.com/512/642/642102.png"; // Snow
            bgImage = "https://source.unsplash.com/1600x900/?snow,mountain";
        } else {
            weatherImage = "https://cdn-icons-png.flaticon.com/512/1779/1779940.png"; // Default Weather
            bgImage = "https://source.unsplash.com/1600x900/?weather,nature";
        }

        document.getElementById("bg").style.backgroundImage = `url('${bgImage}')`;

        document.getElementById("weather-info").innerHTML = `
            <h3>${weatherData.name}, ${weatherData.sys.country}</h3>
            <p>Temperature: ${weatherData.main.temp}°C</p>
            <p>Weather: ${weatherData.weather[0].description}</p>
            <img src="${weatherImage}" alt="Weather icon">
        `;

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// 🔹 Real-time Date & Time Function
function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString("en-US", options);
    const formattedTime = now.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    document.getElementById("datetime").innerHTML = `📅 ${formattedDate} | ⏰ ${formattedTime}`;
}

// 🔹 Update Date & Time Every Second
setInterval(updateDateTime, 1000);
updateDateTime();
