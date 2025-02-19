const express = require('express')
const { getLocationByAddress } = require('../controllers/locationController');

const {
createDelivery,getAllDeliveries,updateDelivery,deleteDelivery,getDeliveryById,getDeliveriesByAddress,
getDeliveriesByDate,getDeliveriesByStatus,getDeliveriesByOrderId,generateDeliveryPDF} = require('../controllers/deliveryController')
const router = express.Router()

router.post('/create', createDelivery)
router.get('/get', getAllDeliveries)
router.get('/get/:id', getDeliveryById)
router.put('/update/:id', updateDelivery)
router.delete('/delete/:id', deleteDelivery)
router.get('/findA', getDeliveriesByAddress)
router.get('/findD', getDeliveriesByDate)
router.get('/findS', getDeliveriesByStatus)
router.get('/:id/pdf', generateDeliveryPDF)
router.get('/order/:id', getDeliveriesByOrderId)
router.post('/location', getLocationByAddress)


module.exports = router
