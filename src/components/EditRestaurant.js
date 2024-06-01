import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditRestaurant = () => {
  // Get the restaurant ID from the URL parameters
  const { id } = useParams();

  // State to hold the restaurant data
  const [restaurant, setRestaurant] = useState({});

  // Hook to navigate to different routes programmatically
  const navigate = useNavigate();

  // State to hold form validation errors
  const [errors, setErrors] = useState({});

  // Handler for form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Fetch restaurant details on component mount and when ID changes
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

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Object to store validation errors
    const validationError = {};

    // Validation checks
    if (!restaurant.name?.trim()) {
      validationError.name = "Name is Required";
    }

    if (!restaurant.address?.trim()) {
      validationError.address = "Address is Required";
    }

    if (!restaurant.telephone?.trim()) {
      validationError.telephone = "Telephone Number is Required";
    }

    // Update errors state
    setErrors(validationError);

    // If no validation errors, proceed to submit
    if (Object.keys(validationError).length === 0) {
      try {
        // Put updated restaurant data to the server
        const updateRestaurant = await axios.put(`http://localhost:8000/restaurants/update/${id}`, restaurant);
        console.log('Update successful:', updateRestaurant.data);
        alert("Restaurant Updated Successfully");
        
        // Navigate to the homepage after successful update
        navigate('/');
      } catch (error) {
        console.error('Error while updating:', error);
      }
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold mb-4">Edit Restaurant Details</h1>

        <div className="form-group mb-4">
          <label htmlFor="restaurantName" className="form-label">Restaurant Name</label>
          <input
            type="text"
            className="form-control border border-gray-300 p-2 rounded"
            id="restaurantName"
            placeholder="Enter restaurant name"
            name="name"
            value={restaurant.name || ''}
            onChange={handleChange}
          />
          {errors.name && <span className="text-red-600">{errors.name}</span>}
        </div>

        <div className="form-group mb-4">
          <label htmlFor="restaurantAddress" className="form-label">Restaurant Address</label>
          <input
            type="text"
            className="form-control border border-gray-300 p-2 rounded"
            id="restaurantAddress"
            placeholder="Enter restaurant address"
            name="address"
            value={restaurant.address || ''}
            onChange={handleChange}
          />
          {errors.address && <span className="text-red-600">{errors.address}</span>}
        </div>

        <div className="form-group mb-4">
          <label htmlFor="restaurantTelephone" className="form-label">Telephone Number</label>
          <input
            type="number"
            className="form-control border border-gray-300 p-2 rounded"
            id="restaurantTelephone"
            placeholder="Enter telephone number"
            name="telephone"
            value={restaurant.telephone || ''}
            onChange={handleChange}
          />
          {errors.telephone && <span className="text-red-600">{errors.telephone}</span>}
        </div>
        
        <button type="submit" className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditRestaurant;
