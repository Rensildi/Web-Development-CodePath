import { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import WeatherStats from './WeatherStats';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [tempFilter, setTempFilter] = useState('all');
  
  // List of major cities for our dashboard
  const cities = [
    'London', 'New York', 'Tokyo', 'Paris', 'Berlin', 
    'Sydney', 'Moscow', 'Beijing', 'Dubai', 'Toronto',
    'Los Angeles', 'Chicago', 'Singapore', 'Mumbai', 'Rio de Janeiro'
  ];

  const mockData = [
    {
      "id": 2643743,
      "name": "London",
      "sys": {"country": "GB"},
      "main": {"temp": 15, "feels_like": 14, "humidity": 72, "pressure": 1012},
      "wind": {"speed": 4.1, "deg": 230},
      "weather": [{"id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d"}],
      "dt": Date.now()/1000
    },
    {
      "id": 5128581,
      "name": "New York",
      "sys": {"country": "US"},
      "main": {"temp": 22, "feels_like": 24, "humidity": 65, "pressure": 1015},
      "wind": {"speed": 3.6, "deg": 180},
      "weather": [{"id": 800, "main": "Clear", "description": "clear sky", "icon": "01d"}],
      "dt": Date.now()/1000
    },
    {
      "id": 1850147,
      "name": "Tokyo",
      "sys": {"country": "JP"},
      "main": {"temp": 28, "feels_like": 30, "humidity": 78, "pressure": 1009},
      "wind": {"speed": 2.1, "deg": 120},
      "weather": [{"id": 500, "main": "Rain", "description": "light rain", "icon": "10d"}],
      "dt": Date.now()/1000
    },
    {
      "id": 2968815,
      "name": "Paris",
      "sys": {"country": "FR"},
      "main": {"temp": 18, "feels_like": 17, "humidity": 68, "pressure": 1013},
      "wind": {"speed": 3.0, "deg": 270},
      "weather": [{"id": 801, "main": "Clouds", "description": "few clouds", "icon": "02d"}],
      "dt": Date.now()/1000
    },
    {
      "id": 2950159,
      "name": "Berlin",
      "sys": {"country": "DE"},
      "main": {"temp": 16, "feels_like": 15, "humidity": 70, "pressure": 1014},
      "wind": {"speed": 4.5, "deg": 210},
      "weather": [{"id": 300, "main": "Drizzle", "description": "light intensity drizzle", "icon": "09d"}],
      "dt": Date.now()/1000
    },
    {
      "id": 2147714,
      "name": "Sydney",
      "sys": {"country": "AU"},
      "main": {"temp": 25, "feels_like": 27, "humidity": 60, "pressure": 1018},
      "wind": {"speed": 5.7, "deg": 150},
      "weather": [{"id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03d"}],
      "dt": Date.now()/1000
    },
    {
      "id": 524901,
      "name": "Moscow",
      "sys": {"country": "RU"},
      "main": {"temp": 8, "feels_like": 5, "humidity": 82, "pressure": 1021},
      "wind": {"speed": 6.2, "deg": 310},
      "weather": [{"id": 600, "main": "Snow", "description": "light snow", "icon": "13d"}],
      "dt": Date.now()/1000
    },
    {
      "id": 1816670,
      "name": "Beijing",
      "sys": {"country": "CN"},
      "main": {"temp": 30, "feels_like": 33, "humidity": 55, "pressure": 1005},
      "wind": {"speed": 2.8, "deg": 90},
      "weather": [{"id": 701, "main": "Mist", "description": "mist", "icon": "50d"}],
      "dt": Date.now()/1000
    },
    {
      "id": 292223,
      "name": "Dubai",
      "sys": {"country": "AE"},
      "main": {"temp": 38, "feels_like": 42, "humidity": 40, "pressure": 1002},
      "wind": {"speed": 1.5, "deg": 0},
      "weather": [{"id": 800, "main": "Clear", "description": "clear sky", "icon": "01d"}],
      "dt": Date.now()/1000
    },
    {
      "id": 6167865,
      "name": "Toronto",
      "sys": {"country": "CA"},
      "main": {"temp": 12, "feels_like": 10, "humidity": 75, "pressure": 1016},
      "wind": {"speed": 5.0, "deg": 290},
      "weather": [{"id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d"}],
      "dt": Date.now()/1000
    },
    {
      "id": 5368361,
      "name": "Los Angeles",
      "sys": {"country": "US"},
      "main": {"temp": 26, "feels_like": 28, "humidity": 50, "pressure": 1013},
      "wind": {"speed": 2.6, "deg": 240},
      "weather": [{"id": 801, "main": "Clouds", "description": "few clouds", "icon": "02d"}],
      "dt": Date.now()/1000
    },
    {
      "id": 4887398,
      "name": "Chicago",
      "sys": {"country": "US"},
      "main": {"temp": 14, "feels_like": 12, "humidity": 80, "pressure": 1019},
      "wind": {"speed": 6.7, "deg": 330},
      "weather": [{"id": 500, "main": "Rain", "description": "light rain", "icon": "10d"}],
      "dt": Date.now()/1000
    },
    {
      "id": 1880252,
      "name": "Singapore",
      "sys": {"country": "SG"},
      "main": {"temp": 31, "feels_like": 37, "humidity": 85, "pressure": 1008},
      "wind": {"speed": 1.0, "deg": 0},
      "weather": [{"id": 500, "main": "Rain", "description": "light rain", "icon": "10d"}],
      "dt": Date.now()/1000
    },
    {
      "id": 1275339,
      "name": "Mumbai",
      "sys": {"country": "IN"},
      "main": {"temp": 33, "feels_like": 39, "humidity": 75, "pressure": 1007},
      "wind": {"speed": 3.1, "deg": 200},
      "weather": [{"id": 721, "main": "Haze", "description": "haze", "icon": "50d"}],
      "dt": Date.now()/1000
    },
    {
      "id": 3451190,
      "name": "Rio de Janeiro",
      "sys": {"country": "BR"},
      "main": {"temp": 29, "feels_like": 33, "humidity": 70, "pressure": 1012},
      "wind": {"speed": 4.0, "deg": 160},
      "weather": [{"id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03d"}],
      "dt": Date.now()/1000
    }
  ];

  // for the moment the API key is not working, after few google search I learned that the API key needs few hours to be activated
  useEffect(() => {
    // console.log('API Key:', import.meta.env.VITE_OPENWEATHER_API_KEY);
    const fetchWeatherData = async () => {
      try {
        // Using mock data
        setWeatherData(mockData);
        setLoading(false);
        /*
        const requests = cities.map(city => 
          axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
              q: city,
              units: 'metric',
              appid: import.meta.env.VITE_OPENWEATHER_API_KEY
            }
          })
        );
        
        const responses = await Promise.all(requests);
        const data = responses.map(response => response.data);
        setWeatherData(data);
        setLoading(false);
        */
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('API Error:', err); // Add this for debugging
        
      }
    };

    fetchWeatherData();
  }, []);

  const filteredData = weatherData.filter(city => {
    // Search filter (by city name)
    const matchesSearch = city.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Temperature filter
    let matchesTemp = true;
    if (tempFilter === 'hot') {
      matchesTemp = city.main.temp > 25;
    } else if (tempFilter === 'moderate') {
      matchesTemp = city.main.temp >= 15 && city.main.temp <= 25;
    } else if (tempFilter === 'cold') {
      matchesTemp = city.main.temp < 15;
    }
    
    return matchesSearch && matchesTemp;
  });

  if (loading) return <div>Loading weather data...</div>;
  if (error) return (
    <div className="error">
      <h3>Error Loading Weather Data</h3>
      <p>{error}</p>
      <p>Possible causes:</p>
      <ul>
        <li>Invalid API key</li>
        <li>API service unavailable</li>
        <li>Network connection issue</li>
      </ul>
      <p>Check your console for more details.</p>
    </div>
  );

  return (
    <div className="app">
    <div className="dashboard">
      <div className="controls">
        <input
          type="text"
          placeholder="Search by city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select value={tempFilter} onChange={(e) => setTempFilter(e.target.value)}>
          <option value="all">All Temperatures</option>
          <option value="hot">Hot (&gt;25°C)</option>
          <option value="moderate">Moderate (15-25°C)</option>
          <option value="cold">Cold (&lt;15°C)</option>
        </select>
      </div>
      
      <WeatherStats data={weatherData} filteredData={filteredData} />
      
      <div className="weather-list">
        {filteredData.length > 0 ? (
          filteredData.map(city => (
            <WeatherCard key={city.id} data={city} />
          ))
        ) : (
          <div>No cities match your search criteria.</div>
        )}
      </div>
    </div>
    </div>
  );
};

export default WeatherDashboard;