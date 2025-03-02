import React, { useEffect, useState } from 'react';
import DeleteDelivery from './deleteDelivery';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllDeliveries } from '../api/deliveriesService';


const DeliveryList = () => {
  const [deliveries, setDeliveries] = useState([])

  useEffect(() => {
    fetchDeliveries()
  }, [])

  const fetchDeliveries = async () => {
    try {
      const response = await getAllDeliveries()
      setDeliveries(response.data)
    } catch (error) {
      console.error('Error fetching deliveries:', error)
    }
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Delivery List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Address</th>
            <th>Delivery Date</th>
            <th>Costumer Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery._id}>
              <td>{delivery.orderId}</td>
              <td>{delivery.address}</td>
              <td>{delivery.deliveryDate}</td>
              <td>{delivery.customerName}</td>
              <td>{delivery.status}</td>
              <td>
                <DeleteDelivery deliveryId={delivery._id} refreshDeliveries={fetchDeliveries} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DeliveryList

