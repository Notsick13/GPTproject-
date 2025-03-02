import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createDelivery } from '../api/deliveriesService';

const AddDelivery = ({ refreshDeliveries }) => {
  const [form, setForm] = useState({
    orderId: '',
    address: '',
    deliveryDate: new Date(),
    costumerName: '',
    status: ''
  })
  const [message, setMessage] = useState('')
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      await createDelivery(form);
      setMessage('Delivery created successfully!')
      setForm({ orderId: '', address: '', costumerName:'', deliveryDate: new Date(), status: '' })

      if (refreshDeliveries) {
        refreshDeliveries()
      }
    } catch (error) {
      console.error('Error creating delivery:', error)
      setMessage(' Error creating delivery. Try again.')
    }
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Add New Delivery</h2>
      {message && <div className={`alert ${message.startsWith("") ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
      
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-white">
        <div className="mb-3">
          <label className="form-label">Order ID</label>
          <input type="text" className="form-control" name="orderId" value={form.orderId} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input type="text" className="form-control" name="address" value={form.address} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Costumer Name</label>
          <input type="text" className="form-control" name="" value={form.costumerName} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Delivery Date</label>
          <input type="date" className="form-control" name="deliveryDate" value={form.deliveryDate} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select className="form-select" name="status" value={form.status} onChange={handleChange} required>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Canceled">Canceled</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success w-100">Add Delivery</button>
      </form>
    </div>
  )
}

export default AddDelivery

