// src/mockData.js
export const mockData = [
    {
      "coord": { "lon": -0.13, "lat": 51.51 },
      "weather": [
        {
          "id": 300,
          "main": "Drizzle",
          "description": "light intensity drizzle",
          "icon": "09d"
        }
      ],
      "base": "stations",
      "main": {
        "temp": 15.6,
        "feels_like": 14.2,
        "temp_min": 14.0,
        "temp_max": 17.0,
        "pressure": 1012,
        "humidity": 72,
        "sea_level": 1016,
        "grnd_level": 1008
      },
      "visibility": 10000,
      "wind": {
        "speed": 4.1,
        "deg": 230,
        "gust": 7.2
      },
      "clouds": {
        "all": 90
      },
      "dt": 1624185600,
      "sys": {
        "type": 2,
        "id": 2019646,
        "country": "GB",
        "sunrise": 1624152200,
        "sunset": 1624211600
      },
      "timezone": 3600,
      "id": 2643743,
      "name": "London",
      "cod": 200,
      "forecast": {
        "daily": [
          { "day": "Mon", "temp": 16, "icon": "10d" },
          { "day": "Tue", "temp": 18, "icon": "01d" },
          { "day": "Wed", "temp": 20, "icon": "02d" }
        ]
      }
    },
    {
      "coord": { "lon": -74.01, "lat": 40.71 },
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "main": {
        "temp": 22.3,
        "feels_like": 23.1,
        "temp_min": 20.0,
        "temp_max": 24.0,
        "pressure": 1015,
        "humidity": 65
      },
      "wind": {
        "speed": 3.6,
        "deg": 180
      },
      "id": 5128581,
      "name": "New York",
      "sys": { "country": "US" },
      "forecast": {
        "daily": [
          { "day": "Mon", "temp": 24, "icon": "01d" },
          { "day": "Tue", "temp": 26, "icon": "01d" },
          { "day": "Wed", "temp": 23, "icon": "11d" }
        ]
      }
    },
    // Additional cities with similar structure
    {
      "id": 1850147,
      "name": "Tokyo",
      "main": {
        "temp": 28.5,
        "feels_like": 32.1,
        "temp_min": 26.0,
        "temp_max": 30.0,
        "humidity": 78
      },
      "weather": [{ "main": "Rain", "icon": "10d" }],
      "sys": { "country": "JP" }
    },
    {
      "id": 2968815,
      "name": "Paris",
      "main": {
        "temp": 18.2,
        "feels_like": 17.8,
        "temp_min": 16.0,
        "temp_max": 20.0,
        "humidity": 68
      },
      "weather": [{ "main": "Clouds", "icon": "04d" }],
      "sys": { "country": "FR" }
    },
    {
      "id": 2950159,
      "name": "Berlin",
      "main": {
        "temp": 16.8,
        "feels_like": 15.3,
        "temp_min": 15.0,
        "temp_max": 18.0,
        "humidity": 70
      },
      "weather": [{ "main": "Drizzle", "icon": "09d" }],
      "sys": { "country": "DE" }
    },
    {
      "id": 2147714,
      "name": "Sydney",
      "main": {
        "temp": 25.1,
        "feels_like": 27.3,
        "temp_min": 23.0,
        "temp_max": 27.0,
        "humidity": 60
      },
      "weather": [{ "main": "Clouds", "icon": "03d" }],
      "sys": { "country": "AU" }
    },
    {
      "id": 524901,
      "name": "Moscow",
      "main": {
        "temp": 8.4,
        "feels_like": 5.2,
        "temp_min": 7.0,
        "temp_max": 10.0,
        "humidity": 82
      },
      "weather": [{ "main": "Snow", "icon": "13d" }],
      "sys": { "country": "RU" }
    },
    {
      "id": 1816670,
      "name": "Beijing",
      "main": {
        "temp": 30.7,
        "feels_like": 33.5,
        "temp_min": 28.0,
        "temp_max": 33.0,
        "humidity": 55
      },
      "weather": [{ "main": "Mist", "icon": "50d" }],
      "sys": { "country": "CN" }
    },
    {
      "id": 292223,
      "name": "Dubai",
      "main": {
        "temp": 38.2,
        "feels_like": 42.8,
        "temp_min": 36.0,
        "temp_max": 40.0,
        "humidity": 40
      },
      "weather": [{ "main": "Clear", "icon": "01d" }],
      "sys": { "country": "AE" }
    },
    {
      "id": 6167865,
      "name": "Toronto",
      "main": {
        "temp": 12.6,
        "feels_like": 10.8,
        "temp_min": 11.0,
        "temp_max": 14.0,
        "humidity": 75
      },
      "weather": [{ "main": "Clouds", "icon": "04d" }],
      "sys": { "country": "CA" }
    },
    {
      "id": 5368361,
      "name": "Los Angeles",
      "main": {
        "temp": 26.3,
        "feels_like": 28.1,
        "temp_min": 24.0,
        "temp_max": 28.0,
        "humidity": 50
      },
      "weather": [{ "main": "Clouds", "icon": "02d" }],
      "sys": { "country": "US" }
    },
    {
      "id": 4887398,
      "name": "Chicago",
      "main": {
        "temp": 14.9,
        "feels_like": 12.7,
        "temp_min": 13.0,
        "temp_max": 16.0,
        "humidity": 80
      },
      "weather": [{ "main": "Rain", "icon": "10d" }],
      "sys": { "country": "US" }
    },
    {
      "id": 1880252,
      "name": "Singapore",
      "main": {
        "temp": 31.4,
        "feels_like": 37.6,
        "temp_min": 30.0,
        "temp_max": 33.0,
        "humidity": 85
      },
      "weather": [{ "main": "Rain", "icon": "10d" }],
      "sys": { "country": "SG" }
    },
    {
      "id": 1275339,
      "name": "Mumbai",
      "main": {
        "temp": 33.7,
        "feels_like": 39.2,
        "temp_min": 32.0,
        "temp_max": 35.0,
        "humidity": 75
      },
      "weather": [{ "main": "Haze", "icon": "50d" }],
      "sys": { "country": "IN" }
    },
    {
      "id": 3451190,
      "name": "Rio de Janeiro",
      "main": {
        "temp": 29.8,
        "feels_like": 33.4,
        "temp_min": 28.0,
        "temp_max": 31.0,
        "humidity": 70
      },
      "weather": [{ "main": "Clouds", "icon": "03d" }],
      "sys": { "country": "BR" }
    }
  ];
  
  export const getCityById = (id) => {
    return mockData.find(city => city.id === id);
  };