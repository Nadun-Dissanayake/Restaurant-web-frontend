import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateRestaurant = () => {
  const [restaurant, setRestaurant] = useState({
    name: '',
    address: '',
    telephone: ''
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = {}

    if(!restaurant.name.trim()){
      validationError.name = "Name is Required"
    }

    if(!restaurant.address.trim()){
      validationError.address = "Address is Required"
    }

    if(!restaurant.telephone.trim()){
      validationError.telephone = "Telephone Number is Required"
    }

    setErrors(validationError)

    if(Object.keys(validationError).length === 0){
      alert("Successfully Restaurant Added")
    }

    try {
      const newRestaurant = await axios.post('http://localhost:8000/restaurants/save', restaurant);
      console.log('Post successful:', newRestaurant.data);
      setRestaurant({
        name: '',
        address: '',
        telephone: ''
      });
      navigate('/');
    } catch (error) {
      console.error('Error while posting:', error);
    }
  };
  

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit}>
      <h1 className="text-3xl font-bold mb-4">Create New Restaurant</h1>
        <div className="form-group mb-4">
          <label htmlFor="restaurantName" className="form-label">Restaurant Name</label>
          <input
            type="text"
            className="form-control border border-gray-300 p-2 rounded"
            id="restaurantName"
            placeholder="Enter restaurant name"
            name="name"
            value={restaurant.name}
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
            value={restaurant.address}
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
            value={restaurant.telephone}
            onChange={handleChange}
          />
          {errors.telephone && <span className="text-red-600">{errors.telephone}</span>}
        </div>
        <button type="submit" className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
      </form>
    </div>
  );
};

export default CreateRestaurant;
