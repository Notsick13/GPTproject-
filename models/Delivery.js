const mongoose = require('mongoose')
const deliverySchema = new mongoose.Schema({
  
  orderId: {
    type: String,
    ref: 'Order',
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
  costumerName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending'/*en attente*/, 'Shipped'/*transporté*/, 'Delivered'/*livré*/, 'Canceled'/* annuler*/ ],
    default: 'Pending',
  },
  location: {
    lat: { type: Number, required: false },
    lng: { type: Number, required: false },
  }
})



const Delivery = mongoose.model('Delivery', deliverySchema)
module.exports = Delivery
