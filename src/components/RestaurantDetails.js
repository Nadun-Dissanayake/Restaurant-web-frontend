import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RestaurantDetails = () => {
  // Extract the restaurant ID from the URL parameters
  const { id } = useParams(); 
  
  // State to hold the restaurant details
  const [restaurant, setRestaurant] = useState({});

  // Fetch restaurant details when the component mounts and when the ID changes
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/restaurants/${id}`);
        if (response.data.success) {
          setRestaurant(response.data.oneRestaurant);
        }
      } catch (error) {
        console.error("There was an error fetching the restaurant details!", error);
      }
    };

    fetchRestaurant();
  }, [id]);

  return (
    <div className="container mt-5">
      <h4 className="text-2xl font-semibold">{restaurant.name}</h4>
      <hr className="my-4" />
      <dl className="row">
        <dt className="col-sm-3 text-lg font-medium">Address:</dt>
        <dd className="col-sm-9 text-lg">{restaurant.address}</dd>
        <dt className="col-sm-3 text-lg font-medium">Telephone:</dt>
        <dd className="col-sm-9 text-lg">{restaurant.telephone}</dd>
      </dl>
    </div>
  );
};

export default RestaurantDetails;
