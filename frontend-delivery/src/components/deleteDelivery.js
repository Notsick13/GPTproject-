import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { deleteDelivery } from '../api/deliveriesService';


const DeleteDelivery = ({ deliveryId, refreshDeliveries }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this delivery?')) {
      try {
        await deleteDelivery(deliveryId)
        refreshDeliveries()
      } catch (error) {
        console.error('Error deleting delivery:', error)
        alert('Error deleting delivery. Try again.')
      }
    }
  }

  return (
    <button className="btn btn-danger btn-sm" onClick={handleDelete}>
      Delete
    </button>
  )
}

export default DeleteDelivery

