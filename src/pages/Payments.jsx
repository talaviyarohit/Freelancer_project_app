// src/pages/Payments.js
// import React from 'react';
// import PaymentList from '../components/PaymentList';

// function Payments() {
//   return (
//     <div className="mt-4">
//       <h3>Payments</h3>
//       <PaymentList />
//     </div>
//   );
// }

// export default Payments;
// src/pages/Payments.js
import React, { useState } from 'react';

import PaymentList from '../components/PaymentList';
import PaymentForm from './PaymentForm';


function Payments() {
  const [update, setUpdate] = useState(false);

  const handlePaymentAdded = () => {
    // Trigger an update after a payment is added
    setUpdate(!update);
  };

  return (
    <div className="mt-4">
      <h3 className='text-center fs-1'>Payment Tracking</h3>
      <PaymentForm onPaymentAdded={handlePaymentAdded} />
      <PaymentList key={update} />
    </div>
  );
}

export default Payments;
