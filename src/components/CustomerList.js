// src/components/CustomerList.js
import React from "react";

function CustomerList({ customers, onComplete }) {
  return (
    <div>
      <h3>Queue List</h3>
      <table>
        <thead>
          <tr>
            <th>Queue Number</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.queueNumber}>
              <td>{customer.queueNumber}</td>
              <td>{customer.firstName}</td>
              <td>{customer.lastName}</td>
              <td>{customer.email}</td>
              <td>{customer.status}</td>
              <td>
                {customer.status === "queued" && (
                  <button onClick={() => onComplete(customer.queueNumber)}>
                    Complete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;
