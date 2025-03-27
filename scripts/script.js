const API_KEY = '6a7b4c338540d936ad894e7d119f5ed2';

// Fetch weather data
async function getWeatherData(city) {
    try {
        const [currentRes, forecastRes] = await Promise.all([
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`),
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`)
        ]);

        if (!currentRes.ok || !forecastRes.ok) throw new Error('City not found');

        const currentData = await currentRes.json();
        const forecastData = await forecastRes.json();

        return { current: currentData, forecast: forecastData };
    } catch (error) {
        alert(error.message);
        return null;
    }
}

// Update the UI with weather data
function updateUI(data) {
    const currentIconCode = data.current.weather[0].icon;
    document.getElementById('current-icon').src = `https://openweathermap.org/img/wn/${currentIconCode}@2x.png`;
    document.getElementById('city').textContent = data.current.name;
    document.getElementById('datetime').textContent = formatDateTime(data.current.dt);
    document.getElementById('temperature').textContent = `${Math.round(data.current.main.temp)}°C`;
    document.getElementById('feels-like').textContent = `Feels like: ${Math.round(data.current.main.feels_like)}°C`;

    // Weather details and forecasts
    // Add the weather details and forecast update logic here (same as original script)
}

// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Event listener for search form
document.getElementById('search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const city = document.getElementById('search-input').value;
    getWeatherData(city).then(data => {
        if (data) {
            updateUI(data);
        }
    });
});

// Call to fetch and display initial weather data
getWeatherData('Agadir').then(data => {
    if (data) {
        updateUI(data);
    }
});
