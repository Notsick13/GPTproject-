import React, { useState } from 'react';
import { getDeliveryById } from '../api/deliveriesService';


const GetDeliveryById = () => {
  const [deliveryId, setDeliveryId] = useState('')
  const [delivery, setDelivery] = useState(null)
  const [error, setError] = useState('')

  const handleSearch = async () => {
    if (!deliveryId) {
      setError('Please enter a delivery ID.')
      return;
    }
    try {
      const response = await getDeliveryById(deliveryId)
      setDelivery(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching delivery:', err)
      setError('Delivery not found.')
      setDelivery(null);
    }
  }

  return (
    <div className="container mt-4">
      <h2>Search Delivery by ID</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Enter Delivery ID"
          value={deliveryId}
          onChange={(e) => setDeliveryId(e.target.value)}
          className="form-control"
        />
        <button onClick={handleSearch} className="btn btn-primary mt-2">Search</button>
      </div>

      {error && <p className="text-danger mt-3">{error}</p>}

      {delivery && (
        <div className="mt-4">
          <h3>Delivery Details</h3>
          <p><strong>Order ID:</strong> {delivery.orderId}</p>
          <p><strong>Address:</strong> {delivery.address}</p>
          <p><strong>Delivery Date:</strong> {new Date(delivery.deliveryDate).toLocaleDateString()}</p>
          <p><strong>Costumer Name:</strong> {delivery.costumerName}</p>
          <p><strong>Status:</strong> {delivery.status}</p>
        </div>
      )}
    </div>
  )
}

export default GetDeliveryById
