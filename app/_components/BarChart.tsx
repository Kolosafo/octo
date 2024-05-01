// "use client";
// import { useEffect, useRef } from "react";
// // import Chart from "chart.js/auto";
// const BarChart = ({ data }: any) => {
//   const chartRef = useRef<any>(null);
//   useEffect(() => {
//     if (chartRef && chartRef.current) {
//       const ctx = chartRef.current.getContext("2d");
//       new Chart(ctx, {
//         type: "bar",
//         data: {
//           labels: data.map((item) => item.subject),
//           datasets: [
//             {
//               label: "Correct",
//               data: data.map((item) => item.correct),
//               backgroundColor: "rgba(75, 192, 192, 0.2)",
//               borderColor: "rgba(75, 192, 192, 1)",
//               borderWidth: 1,
//             },
//             {
//               label: "Wrong",
//               data: data.map((item) => item.wrong),
//               backgroundColor: "rgba(255, 99, 132, 0.2)",
//               borderColor: "rgba(255, 99, 132, 1)",
//               borderWidth: 1,
//             },
//           ],
//         },
//         options: {
//           scales: {
//             y: {
//               beginAtZero: true,
//             },
//           },
//         },
//       });
//     }
//   }, [data]);

//   return <canvas ref={chartRef} />;
// };

// export default BarChart;
