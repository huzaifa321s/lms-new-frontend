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

ChartJS.register(ArcElement, Tooltip, Legend, Tooltip, Filler, Legend);

function DoughnutChart({ dounutData }) {

  const { courseLabels, studentsCount, borderColor, backgroundColor } = dounutData;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  // const labels = ['Electronics', 'Home Applicances', 'Beauty', 'Furniture', 'Watches', 'Apparel', 'Alpha'];
  const labels = courseLabels;

  const data = {
    labels,
    datasets: [
      {
        label: '# of Students',
        data: studentsCount,
        backgroundColor: borderColor,
        borderColor: backgroundColor,

        borderWidth: 1,
      }
    ],
  };

  return (
    <TitleCard title={"Courses by Students"}>
      <Doughnut options={options} data={data} />
    </TitleCard>
  )
}


export default DoughnutChart




// data: [122, 219, 30, 51, 82, 13, 15],
// backgroundColor: [
//   'rgba(255, 99, 132, 0.8)',
//   'rgba(54, 162, 235, 0.8)',
//   'rgba(255, 206, 86, 0.8)',
//   'rgba(75, 192, 192, 0.8)',
//   'rgba(153, 102, 255, 0.8)',
//   'rgba(255, 159, 64, 0.8)',
// ],
// borderColor: [
//   'rgba(255, 99, 132, 1)',
//   'rgba(54, 162, 235, 1)',
//   'rgba(255, 206, 86, 1)',
//   'rgba(75, 192, 192, 1)',
//   'rgba(153, 102, 255, 1)',
//   'rgba(255, 159, 64, 1)',
// ],