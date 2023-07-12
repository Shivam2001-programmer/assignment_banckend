const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = 'b8c2f5b889af4ce7a3652440231207'; 

app.post('/getWeather', async (req, res) => {
  try {
    const { cities } = req.body;
    const weatherData = {};

    for (const city of cities) {
      try {
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}`);
        const temperature = response.data.current.temp_c;
        weatherData[city] = `${temperature}C`;
      } catch (error) {
        console.error(`Error fetching weather for ${city}:`, error.message);
        weatherData[city] = 'N/A';
      }
    }

    res.json({ weather: weatherData });
  } catch (error) {
    console.error('Error fetching weather:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
