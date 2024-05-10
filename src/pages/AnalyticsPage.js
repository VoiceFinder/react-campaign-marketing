import React from 'react';
// import { Line, Bar } from 'react-chartjs-2';
import styles from '../assets/styles/AnalyticsPage.module.css'; // 스타일 모듈 임포트

function AnalyticsPage() {
  // const lineChartData = {
  //   labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  //   datasets: [
  //     {
  //       label: 'Number of Campaigns',
  //       data: [65, 59, 80, 81, 56, 55],
  //       fill: false,
  //       backgroundColor: 'rgb(75, 192, 192)',
  //       borderColor: 'rgba(75, 192, 192, 0.2)',
  //     }
  //   ]
  // };

  // const barChartData = {
    // labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  //   datasets: [
  //     {
  //       label: 'User Engagement',
  //       data: [400, 300, 200, 500, 700, 800],
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(255, 206, 86, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
  //         'rgba(153, 102, 255, 0.2)',
  //         'rgba(255, 159, 64, 0.2)'
  //       ],
  //       borderColor: [
  //         'rgba(255, 99, 132, 1)',
  //         'rgba(54, 162, 235, 1)',
  //         'rgba(255, 206, 86, 1)',
  //         'rgba(75, 192, 192, 1)',
  //         'rgba(153, 102, 255, 1)',
  //         'rgba(255, 159, 64, 1)'
  //       ],
  //       borderWidth: 1
  //     }
  //   ]
  // };

  return (
    <div className={styles.analyticsContainer}>
      <h2>Campaign Analytics</h2>
      <div className={styles.chartContainer}>
        <h3>Monthly Campaigns</h3>
        {/* <Line data={lineChartData} /> */}
      </div>
      <div className={styles.chartContainer}>
        <h3>User Engagement by Month</h3>
        {/* <Bar data={barChartData} options={{ scales: { y: { beginAtZero: true } } }} /> */}
      </div>
    </div>
  );
}

export default AnalyticsPage;
