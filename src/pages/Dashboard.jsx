// src/pages/Dashboard.js
import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import EarningsOverview from '../components/EarningsOverview';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <Container className="mt-4">
      <h1 className='mb-4 text-center'>Welcome To Freelancer Project Management</h1>
      <Row>
        <Col md={12} className='text-center'>
          <h5 className='mb-4 fs-1'>Project Management</h5>
          <Link to="/projects" >
            <button className="btn btn-primary  ">Manage Projects</button>
          </Link>
          <Link to="/payments" className="ml-2">
            <button className="btn btn-secondary">Payment Tracking</button>
          </Link>
          
        </Col>
        <Col md={12} className='mt-4'>
          <EarningsOverview />
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
