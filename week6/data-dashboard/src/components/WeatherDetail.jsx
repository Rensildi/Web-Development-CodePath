import { useParams, Link } from 'react-router-dom'
import { getCityById } from '../mockData'
import './WeatherDetail.css'

const WeatherDetail = () => {
  const { id } = useParams()
  const city = getCityById(parseInt(id))

  if (!city) return (
    <div className="not-found">
      <h2>City not found</h2>
      <Link to="/" className="back-link">← Back to Dashboard</Link>
    </div>
  )

  return (
    <div className="detail-container">
      <Link to="/" className="back-link">← Back to Dashboard</Link>
      
      <div className="detail-header">
        <h1>{city.name}, {city.sys.country}</h1>
        <img 
          src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@4x.png`} 
          alt={city.weather[0].description} 
        />
      </div>

      <div className="detail-grid">
        <div className="detail-card">
          <h3>Temperature</h3>
          <p>Current: {city.main.temp}°C</p>
          <p>Feels like: {city.main.feels_like}°C</p>
          <p>Min: {city.main.temp_min}°C</p>
          <p>Max: {city.main.temp_max}°C</p>
        </div>

        <div className="detail-card">
          <h3>Wind</h3>
          <p>Speed: {city.wind.speed} m/s</p>
          <p>Direction: {city.wind.deg}°</p>
          <p>Gust: {city.wind.gust || 'N/A'} m/s</p>
        </div>

        <div className="detail-card">
          <h3>Conditions</h3>
          <p>{city.weather[0].main}</p>
          <p>({city.weather[0].description})</p>
        </div>

        <div className="detail-card">
          <h3>Atmosphere</h3>
          <p>Humidity: {city.main.humidity}%</p>
          <p>Pressure: {city.main.pressure} hPa</p>
        </div>
      </div>
    </div>
  )
}

export default WeatherDetail