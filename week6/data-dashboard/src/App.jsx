import { Routes, Route } from 'react-router-dom'
import WeatherDashboard from './components/WeatherDashboard'
import WeatherDetail from './components/WeatherDetail'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'

function App() {
  return (
    <ErrorBoundary>
      <div className="app-container">
        <h1>Weather Data Dashboard</h1>
        <Routes>
          <Route path="/" element={<WeatherDashboard />} />
          <Route path="/city/:id" element={<WeatherDetail />} />
        </Routes>
      </div>
    </ErrorBoundary>
  )
}

export default App