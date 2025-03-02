import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDeliveryById, updateDelivery } from '../api/deliveriesService';

export const DeliveryForm = ({ refreshDeliveries }) => {
  const { id } = useParams();
  const [delivery, setDelivery] = useState({ orderId: '', address: '', deliveryDate: '', customerName: '', status: '' })

  useEffect(() => {
    fetchDelivery()
  }, [])

  const fetchDelivery = async () => {
    try {
      const response = await getDeliveryById(id)
      setDelivery(response.data)
    } catch (error) {
      console.error('Error fetching delivery:', error)
    }
  }

  const handleChange = (e) => {
    setDelivery({ ...delivery, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDelivery(id, delivery)
      refreshDeliveries()
    } catch (error) {
      console.error('Error updating delivery:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="orderId" value={delivery.orderId} onChange={handleChange} required />
      <input type="text" name="address" value={delivery.address} onChange={handleChange} required />
      <input type="date" name="deliveryDate" value={delivery.deliveryDate} onChange={handleChange} required />
      <input type="text" name="customerName" value={delivery.customerName} onChange={handleChange} required />
      <input type="text" name="status" value={delivery.status} onChange={handleChange} required />
      <button type="submit">Update</button>
    </form>
  )
}

