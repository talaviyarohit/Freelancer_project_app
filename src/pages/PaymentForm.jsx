// src/components/PaymentForm.js
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

function PaymentForm({ onPaymentAdded }) {
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('unpaid');
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payment = {
      amount: parseFloat(amount),
      status: status,
    };

    try {
      // Add payment to Firebase
      await addDoc(collection(db, 'payments'), payment);
      onPaymentAdded(payment);
      setAmount(''); // Reset form
      setStatus('unpaid');
      
    } catch (error) {
      console.error("Error adding payment: ", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group controlId="paymentAmount">
        <Form.Label>Amount ($)</Form.Label>
        <Form.Control
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="paymentStatus" className="mt-2">
        <Form.Label>Status</Form.Label>
        <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="unpaid">Unpaid</option>
          <option value="paid">Paid</option>
        </Form.Select>
      </Form.Group>
      <Button type="submit" className="mt-3" variant="primary">
        Add Payment
      </Button>
    </Form>
  );
}

export default PaymentForm;
