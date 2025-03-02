import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDeliveryById, updateDelivery } from '../api/deliveriesService';

const EditDelivery = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [delivery, setDelivery] = useState({
    orderId: '',
    address: '',
    deliveryDate: '',
    costumerName: '',
    status: ''
  })

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
    setDelivery({ ...delivery, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateDelivery(id, delivery)
      alert('Delivery updated successfully!')
      navigate('/deliveries')
    } catch (error) {
      console.error('Error updating delivery:', error)
      alert('Error updating delivery!')
    }
  }

  return (
    <div className="container mt-4">
      <h2>Edit Delivery</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <label>Order ID:</label>
        <input type="text" name="orderId" value={delivery.orderId} onChange={handleChange} className="form-control" required />
        
        <label>Address:</label>
        <input type="text" name="address" value={delivery.address} onChange={handleChange} className="form-control" required />

        <label>Delivery Date:</label>
        <input type="date" name="deliveryDate" value={delivery.deliveryDate} onChange={handleChange} className="form-control" required />

        <label>Costumer Name:</label>
        <input type="text" name="costumerName" value={delivery.costumerName} onChange={handleChange} className="form-control" required />

        <label>Status:</label>
        <select name="status" value={delivery.status} onChange={handleChange} className="form-select" required>
          <option value="">Select status</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Canceled">Canceled</option>
        </select>

        <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
      </form>
    </div>
  )
}

export default EditDelivery
