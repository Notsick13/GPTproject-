import React, { useEffect, useState } from 'react';
import { getDeliveryById } from '../api';
import { useParams } from 'react-router-dom';

export const DeliveryDetails = () => {
  const { id } = useParams()
  const [delivery, setDelivery] = useState(null);

  useEffect(() => {
    fetchDelivery()
  }, [])

  const fetchDelivery = async () => {
    try {
      const response = await getDeliveryById(id)
      setDelivery(response.data);
    } catch (error) {
      console.error('Error fetching delivery:', error)
    }
  }

  return (
    <div className="container">
      {delivery ? (
        <div>
          <h2> Delivery Details</h2>
          <p><strong>Order ID:</strong> {delivery.orderId}</p>
          <p><strong>Address:</strong> {delivery.address}</p>
          <p><strong>Customer Name:</strong> {delivery.customerName}</p>
          <p><strong>Status:</strong> {delivery.status}</p>
          <p><strong>Delivery Date:</strong> {delivery.deliveryDate}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}


