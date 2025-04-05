const WeatherStats = ({ data, filteredData }) => {
  if (data.length === 0) return null;
  
  // Calculate average temperature for all cities
  const avgTemp = data.reduce((sum, city) => sum + city.main.temp, 0) / data.length;
  
  // Find hottest and coldest cities
  const sortedByTemp = [...data].sort((a, b) => b.main.temp - a.main.temp);
  const hottestCity = sortedByTemp[0];
  const coldestCity = sortedByTemp[sortedByTemp.length - 1];
  
  // Count cities with clear weather
  const clearCities = data.filter(city => city.weather[0].main === 'Clear').length;
  
  return (
    <div className="weather-stats">
      <div className="stat-card">
        <h3>Average Temperature</h3>
        <p>{avgTemp.toFixed(1)}°C</p>
      </div>
      <div className="stat-card">
        <h3>Hottest City</h3>
        <p>{hottestCity.name}: {Math.round(hottestCity.main.temp)}°C</p>
      </div>
      <div className="stat-card">
        <h3>Coldest City</h3>
        <p>{coldestCity.name}: {Math.round(coldestCity.main.temp)}°C</p>
      </div>
      <div className="stat-card">
        <h3>Clear Skies</h3>
        <p>{clearCities} of {data.length} cities</p>
      </div>
      <div className="stat-card">
        <h3>Showing</h3>
        <p>{filteredData.length} of {data.length} cities</p>
      </div>
    </div>
  );
};

export default WeatherStats;