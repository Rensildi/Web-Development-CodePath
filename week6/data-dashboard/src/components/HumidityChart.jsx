import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import './Charts.css'

ChartJS.register(ArcElement, Tooltip, Legend)

const HumidityChart = ({ data }) => {
  const colors = [
    'rgba(255, 99, 132, 0.7)',
    'rgba(54, 162, 235, 0.7)',
    'rgba(255, 206, 86, 0.7)',
    'rgba(75, 192, 192, 0.7)',
    'rgba(153, 102, 255, 0.7)',
  ]

  const chartData = {
    labels: data.map(city => city.name),
    datasets: [{
      label: 'Humidity (%)',
      data: data.map(city => city.main.humidity),
      backgroundColor: data.map((_, i) => colors[i % colors.length]),
      borderWidth: 1,
    }],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Humidity Distribution',
        font: { size: 16 }
      },
    }
  }

  return (
    <div className="chart-container">
      <Pie data={chartData} options={options} />
    </div>
  )
}

export default HumidityChart