import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { getDeliveries } from '../api/deliveriesService';


const GetAllDelivery = () => {
  const [deliveries, setDeliveries] = useState([])

  useEffect(() => {
    fetchDeliveries()
  }, [])

  const fetchDeliveries = async () => {
    try {
      const response = await getDeliveries();
      setDeliveries(response.data);
    } catch (error) {
      console.error('Error fetching deliveries:', error)
    }
  }

  return (
    <div className="container mt-4">
      <h2>All Deliveries</h2>
      <table className="table table-striped mt-3">
        <thead className="thead-dark">
          <tr>
            <th>Order ID</th>
            <th>Address</th>
            <th>Delivery Date</th>
            <th>Costumer Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.length > 0 ? (
            deliveries.map((delivery) => (
              <tr key={delivery._id}>
                <td>{delivery.orderId}</td>
                <td>{delivery.address}</td>
                <td>{new Date(delivery.deliveryDate).toLocaleDateString()}</td>
                <td>{delivery.costumerName}</td>
                <td>{delivery.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">No deliveries found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default GetAllDelivery
