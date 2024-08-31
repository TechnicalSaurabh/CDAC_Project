import React, { useEffect, useState } from 'react';
import '../../css/BillList.css'
import UserHeader from './UserHeader';

const BillList = () => {
  const [bills, setBills] = useState([]);
  const [error, setError] = useState('');
  const [noBillsMessage, setNoBillsMessage] = useState('');

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const token = sessionStorage.getItem('authToken');
        const response = await fetch('http://localhost:7117/pg_api/bill/getbill', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch bills');
        }

        const data = await response.json();
        if (data.length === 0) {
          setNoBillsMessage('No bills available.');
        } else {
          setBills(data);
          setNoBillsMessage(''); // Clear message if bills are present
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBills();
  }, []);

  const downloadBill = async (billId) => {
    try {
      const token = sessionStorage.getItem('authToken');
      const response = await fetch(`http://localhost:7117/pg_api/bill/downloadBill/${billId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to download the bill');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${billId}_bill.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url); // Clean up the URL object
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePayNow = (billId) => {
    // Implement the payment logic here
    console.log(`Paying bill with ID: ${billId}`);
  };

  return (
    <>
    <UserHeader/>
    <div>
        All pg
        <br />
        pg
        <br />
        pg
      </div>
    <div>      
      <h1>Bills</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {noBillsMessage ? (
        <p>{noBillsMessage}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Bill ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Billing Period Start</th>
              <th>Billing Period End</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bills.map(bill => (
              <tr key={bill.billId}>
                <td>{bill.billId}</td>
                <td>{bill.amount}</td>
                <td>{bill.status}</td>
                <td>{bill.billingPeriodStart}</td>
                <td>{bill.billingPeriodEnd}</td>
                <td>{bill.createdDate}</td>
                <td>
                  <button onClick={() => downloadBill(bill.billId)}>Download PDF</button>
                  {bill.status === 'UNPAID' || bill.status === 'PENDING' ? (
                    <button onClick={() => handlePayNow(bill.billId)}>Pay Now</button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </>
  );
};

export default BillList;
