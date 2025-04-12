import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useEffect, useRef } from 'react'
import './Charts.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const TemperatureChart = ({ data }) => {
  const chartRef = useRef(null)

  // Memoize chart data to prevent unnecessary re-renders
  const chartData = {
    labels: data.map(city => city.name),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: data.map(city => city.main.temp),
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      {
        label: 'Feels Like (°C)',
        data: data.map(city => city.main.feels_like),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Add this to prevent aspect ratio maintenance
    plugins: {
      title: {
        display: true,
        text: 'City Temperatures Comparison',
        font: {
          size: 16
        }
      },
      legend: {
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: false, // Change to false for better temperature ranges
        grid: {
          drawBorder: false
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  }

  // Add resize observer to handle container resizing
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (chartRef.current) {
        chartRef.current.update()
      }
    })

    if (chartRef.current?.canvas?.parentElement) {
      resizeObserver.observe(chartRef.current.canvas.parentElement)
    }

    return () => resizeObserver.disconnect()
  }, [])

  return (
    <div className="chart-container">
      <Bar 
        ref={chartRef}
        data={chartData} 
        options={options}
        height={400} // Fixed height
      />
    </div>
  )
}

export default TemperatureChart