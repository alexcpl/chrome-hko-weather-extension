const weatherInfoElement = document.getElementById('weather-info');

fetch('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en')
.then(response => response.json())
.then(data => {
    let weatherInfo = '';

    // Temperature
    const temperatureData = data.temperature.data;
    weatherInfo += 'Temperature:\n';
    temperatureData.forEach(tempInfo => {
    weatherInfo += `${tempInfo.place}: ${tempInfo.value}°${tempInfo.unit}\n`;
    });

    // Humidity
    const humidityData = data.humidity.data;
    weatherInfo += '\nHumidity:\n';
    humidityData.forEach(humidityInfo => {
    weatherInfo += `${humidityInfo.place}: ${humidityInfo.value}${humidityInfo.unit}\n`;
    });

    // Rainfall
    const rainfallData = data.rainfall.data;
    weatherInfo += '\nMaximum Rainfall:\n';
    rainfallData.forEach(rainfallInfo => {
    weatherInfo += `${rainfallInfo.place}: ${rainfallInfo.max}${rainfallInfo.unit}\n`;
    });

    // Weather description
    const iconCode = data.icon[0];
    const iconDescription = {
    62: 'Sunny'
    // Add more icon codes and descriptions as needed
    };
    weatherInfo += `\nWeather description: ${iconDescription[iconCode] || 'Unknown'}\n`;

    // Warning messages
    const warningMessages = data.warningMessage;
    if (warningMessages.length > 0) {
    weatherInfo += '\nWarning Messages:\n';
    warningMessages.forEach(message => {
        weatherInfo += `- ${message}\n`;
    });
    }

    // Tropical cyclone messages
    const tcMessages = data.tcmessage;
    if (tcMessages.length > 0) {
    weatherInfo += '\nTropical Cyclone Messages:\n';
    tcMessages.forEach(message => {
        weatherInfo += `- ${message}\n`;
    });
    }

    weatherInfoElement.textContent = weatherInfo;
})
.catch(error => {
    weatherInfoElement.textContent = 'Failed to fetch weather data from the HKO API.';
    console.error('Error:', error);
});
