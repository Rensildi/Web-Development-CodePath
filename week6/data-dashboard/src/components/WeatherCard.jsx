const WeatherCard = ({ data }) => {
    const weatherIcon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
  
    return (
      <div className="weather-card">
        <div className="card-header">
          <h2>{data.name}, {data.sys.country}</h2>
          <img src={iconUrl} alt={data.weather[0].description} />
        </div>
        <div className="card-body">
          <p>Temperature: {Math.round(data.main.temp)}°C</p>
          <p>Feels like: {Math.round(data.main.feels_like)}°C</p>
          <p>Humidity: {data.main.humidity}%</p>
          <p>Wind: {Math.round(data.wind.speed * 3.6)} km/h</p>
          <p>Conditions: {data.weather[0].main}</p>
        </div>
      </div>
    );
  };
  
  export default WeatherCard;