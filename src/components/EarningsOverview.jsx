// // src/components/EarningsOverview.js
// import React from 'react';
// import { Card } from 'react-bootstrap';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// function EarningsOverview() {
//   const earningsData = {
//     labels: ['January', 'February', 'March', 'April', 'May'],
//     datasets: [
//       {
//         label: 'Earnings ($)',
//         data: [500, 700, 800, 600, 750],
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//       },
//     ],
//   };

//   return (
//     <Card>
//       <Card.Body>
//         <h4>Total Earnings: $3,550</h4>
//         <Bar data={earningsData} />
//       </Card.Body>
//     </Card>
//   );
// }

// export default EarningsOverview;


// src/components/EarningsOverview.js
import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Firebase setup file
// Import and register required components from Chart.js
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  // Register the components
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  

function EarningsOverview() {
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    const fetchEarnings = async () => {
      const paymentsCollection = collection(db, 'payments');
      const paymentSnapshot = await getDocs(paymentsCollection);
      const payments = paymentSnapshot.docs.map((doc) => doc.data());

      const total = payments.reduce((acc, payment) => {
        if (payment.status === 'paid') {
          return acc + payment.amount;
        }
        return acc;
      }, 0);

      setTotalEarnings(total);
    };

    fetchEarnings();
  }, []);

  // Mock data for earnings over the last few months
  const data = {
    labels: ['April', 'May', 'June', 'July', 'August', 'September'],
    datasets: [
      {
        label: 'Monthly Earnings ($)',
        data: [1200, 1900, 1500, 2200, 1700, 2100], // Mock data for earnings
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <Card className="p-3">
            <h4>Total Earnings: ${totalEarnings}</h4>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="p-3">
            <h5>Earnings Over the Last Few Months</h5>
            <Bar data={data} options={options} />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EarningsOverview;
