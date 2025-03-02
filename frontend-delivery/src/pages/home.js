import React from 'react';
import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';


const Home = () => {
    return (
        <div>
        <h1 >Welcome to Delivery System</h1>
        <p>Manage your deliveries efficiently.</p>

      <Link to="/deliveries">
      <button className="btn btn-primary mt-3" >View Deliveries</button>
      </Link>
      <Link to="/">
      <button className="btn btn-primary mt-3" >Add Deliveries</button>
      </Link>

        </div>
    )
    }
export default Home