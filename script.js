document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    form.addEventListener("submit", async function(event) {
        event.preventDefault(); // Prevent the default form submission

        const city = document.querySelector("#city").value.trim();
        const country = ""; // Set your country here if needed

        // Fetch weather data
        const url = "https://api.weatherbit.io/v2.0/current";
        const params = {
            "key": "0249bb0f331f4fcc851919a5d3deef78",
            "lang": "en",
            "units": "M",
            "city": city,
            "country": country
        };

        try {
            const response = await fetch(url + "?" + new URLSearchParams(params));
            const weatherData = await response.json();
            console.log(weatherData);

            // Update HTML content with fetched data
            document.getElementById("name").textContent = "Weather Report for " + weatherData.data[0].city_name;
            document.querySelector("#temp").textContent = "Temperature: " + weatherData.data[0].app_temp + "°C";
            document.querySelector("p:nth-of-type(1)").textContent = "Country Code: " + weatherData.data[0].country_code;
            document.querySelector("p:nth-of-type(2)").textContent = "Datetime: " + weatherData.data[0].ob_time;
            document.querySelector("p:nth-of-type(3)").textContent = "Timezone: " + weatherData.data[0].timezone;
            document.querySelector("#weDes").textContent = "Weather Description: " + weatherData.data[0].weather.description;
            document.querySelector("#Hum").textContent = "Humidity: " + weatherData.data[0].rh + "%";
            document.querySelector("#AQI").textContent = "Air Quality Index (AQI): " + (weatherData.data[0].aqi || "N/A");
            document.getElementById("lat").textContent = "Latitude: " + weatherData.data[0].lat;
            document.getElementById("lon").textContent = "Longitude: " + weatherData.data[0].lon;
            document.getElementById("sr").textContent = "Sunrise Time: " + convertUtcToIst(weatherData.data[0].sunrise);
            document.getElementById("st").textContent = "Sunset Time: " + convertUtcToIst(weatherData.data[0].sunset);
            document.getElementById("wd").textContent = "Wind Direction: " + weatherData.data[0].wind_cdir_full;
            document.getElementById("ws").textContent = "Wind Speed: " + weatherData.data[0].wind_spd + " m/s";

        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    });
});

function convertUtcToIst(utcTimeStr) {
    const utcTime = new Date("1970-01-01T" + utcTimeStr + "Z");
    const istTime = new Date(utcTime.getTime() + (5 * 60 * 60 * 1000) + (30 * 60 * 1000)); // Add 5 hours 30 minutes for IST
    return istTime.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}
