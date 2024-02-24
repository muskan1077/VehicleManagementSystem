import React from 'react';

const CheckInTable = ({ checkIns, onEdit, onCheckout }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Vehicle Number</th>
          <th>Delivery Challan Number</th>
          <th>Purchase Order Number</th>
          <th>Vendor Name</th>
          <th>Vendor Company Name</th>
          <th>Cost</th>
          {checkIns.some(item => !item.isCheckedOut) && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {checkIns.map((checkIn) => (
          <tr key={checkIn.id}>
            <td>{checkIn.id}</td>
            <td>{checkIn.vehicleNumber}</td>
            <td>{checkIn.deliveryChallanNumber}</td>
            <td>{checkIn.purchaseOrderNumber}</td>
            <td>{checkIn.purchaseOrder.vendorName}</td>
            <td>{checkIn.purchaseOrder.vendorCompanyName}</td>
            <td>{checkIn.purchaseOrder.cost}</td>
            {checkIns.some(item => !item.isCheckedOut) && (
              <td>
                {checkIn.isCheckedOut ? (
                  <button disabled>Checkout</button>
                ) : (
                  <>
                    <button onClick={() => onEdit(checkIn)}>Edit</button>
                    <button onClick={() => onCheckout(checkIn.id)}>Checkout</button>
                  </>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CheckInTable;
