import axios from "axios"

const API_URL = 'http://localhost:5000/api/deliveries'

export const getAllDeliveries = async () => axios.get(`${API_URL}`)
export const getDeliveryById = async (id) => axios.get(`${API_URL}/${id}`)
export const createDelivery = async (data) => axios.post(`${API_URL}`, data)
export const updateDelivery = async (id) => axios.put(`${API_URL}/${id}`)
export const deleteDelivery = async (id) => axios.delete(`${API_URL}/${id}`)
export const getDeliveriesByAddress= async (address) => axios.get(`${API_URL}/${address}`)
export const getDeliveriesByDate = async (date) => axios.get(`${API_URL}/${date}`)
export const getDeliveriesByStatus = async (status) => axios.get(`${API_URL}/${status}`)
export const getDeliveriesByOrderId = async (orderId) => axios.get(`${API_URL}/${orderId}`)
export const generateDeliveryPDF = async (id) => axios.get(`${API_URL}/${id}/pdf`, { responseType: 'blob' })
export const getLocationByAddress = async (address) => axios.get(`https://nominatim.openstreetmap.org/search=${address}`)
