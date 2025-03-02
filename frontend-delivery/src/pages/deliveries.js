import React, { useState, useEffect } from 'react';
import AddDelivery from '../components/addDelivery';
import DeliveryList from '../components/deliveryList';
import { getAllDeliveries } from '../api/deliveriesService';

const Deliveries = () => {
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
      <h1>The Deliveries</h1>
      <DeliveryList deliveries={deliveries} refreshDeliveries={fetchDeliveries} />
      <AddDelivery refreshDeliveries={fetchDeliveries} />
    </div>
    
  )
}

export default Deliveries