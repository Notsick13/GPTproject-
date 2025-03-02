import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">🚚 DeliveryApp</NavLink>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>🏠 Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/deliveries">📦 Deliveries</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/addDeliveries" > Add Deliveries</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/delivery/:id" >🔍 Search Delivery</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar
