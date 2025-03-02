import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home';
import Deliveries from './pages/deliveries';
import GetDeliveryById from './components/getDeliveryById';
import EditDelivery from './components/editDelivery';
import Navbar from './components/navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deliveries" element={<Deliveries />} />
          <Route path="/delivery/:id" element={<GetDeliveryById />} />
          <Route path="/edit/:id" element={<EditDelivery />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
