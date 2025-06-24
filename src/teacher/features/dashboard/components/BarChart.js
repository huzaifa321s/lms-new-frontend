import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import TitleCard from '../../../components/Cards/TitleCard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart({ monthlyEnrollments }) {

  const { monthlyCounts, pastSixMonths } = monthlyEnrollments;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    },
  };

  // const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul, Augest, Sept, Nov, Dec'];
  const labels = pastSixMonths;

  const data = {
    labels,
    datasets: [
      {
        label: 'Monthly Enrolled Students',
        // data: labels.map(() => { return Math.random() * 1000 + 500 }),
        data: monthlyCounts,
        backgroundColor: 'rgba(53, 162, 235, 1)',
      },
    ],
  };

  return (
    <TitleCard title={"Monthy Enrolled Students"}>
      <Bar options={options} data={data} />
    </TitleCard>

  )
}


export default BarChart