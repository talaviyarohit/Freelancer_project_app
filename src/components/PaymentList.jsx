// src/components/PaymentList.js
import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from '../firebase';

function PaymentList() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      const data = await getDocs(collection(db, 'payments'));
      setPayments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchPayments();
  }, []);

  const markAsPaid = async (id) => {
    const paymentDoc = doc(db, 'payments', id);
    await updateDoc(paymentDoc, { status: 'paid' });
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Payment ID</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((payment) => (
          <tr key={payment.id}>
            <td>{payment.id}</td>
            <td>${payment.amount}</td>
            <td>{payment.status}</td>
            <td>
              {payment.status === 'unpaid' && (
                <Button variant="success" onClick={() => markAsPaid(payment.id)}>
                  Mark as Paid
                </Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default PaymentList;
