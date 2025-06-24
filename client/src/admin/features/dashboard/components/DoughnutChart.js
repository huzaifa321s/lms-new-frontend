import {
  Chart as ChartJS,
  Filler,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import TitleCard from '../../../components/Cards/TitleCard';
import Subtitle from '../../../components/Typography/Subtitle';

ChartJS.register(ArcElement, Tooltip, Legend,
  Tooltip,
  Filler,
  Legend);

function DoughnutChart({totalTeachers, totalStudents}) {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const labels = ['Teachers', 'Students'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Count',
        data: [totalTeachers, totalStudents],
        backgroundColor: [
          '#2279E3',
          'rgba(54, 162, 235, 0.8)',
        ],
        borderColor: [
          '#2279E3',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      }
    ],
  };

  return (
    <TitleCard title={"Teachers and Students"}>
      <Doughnut options={options} data={data} />
    </TitleCard>
  )
}


export default DoughnutChart