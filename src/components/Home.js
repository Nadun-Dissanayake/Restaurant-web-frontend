import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  // State to hold the list of restaurants
  const [restaurants, setRestaurants] = useState([]);
  
  // Hook to navigate to different routes programmatically
  const navigate = useNavigate();

  // Fetch the list of restaurants when the component mounts
  useEffect(() => {
    retrieveRestaurants();
  }, []);

  // Function to retrieve the list of restaurants from the server
  const retrieveRestaurants = () => {
    axios.get("http://localhost:8000/restaurants")
      .then(res => {
        if (res.data.success) {
          setRestaurants(res.data.existingRestaurants);
        }
      })
      .catch(err => {
        console.error("There was an error fetching the restaurants!", err);
      });
  };

  // Function to handle the deletion of a restaurant
  const handleDelete = async (id, event) => {
    event.stopPropagation(); // Prevent the event from bubbling up to parent elements
    try {
      await axios.delete(`http://localhost:8000/restaurants/delete/${id}`);
      console.log('Delete successful');
      alert("Restaurant deleted successfully");
      retrieveRestaurants(); // Refresh the list of restaurants after deletion
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">List of Restaurants</h1>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">#</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Telephone Number</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant, index) => (
              <tr
                className="hover:bg-slate-100 cursor-pointer"
                key={restaurant._id}
                onClick={() => navigate(`/restaurant/${restaurant._id}`)}
              >
                <th className="py-2 px-4 border-b">{index + 1}</th>
                <td className="py-2 px-4 border-b">{restaurant.name}</td>
                <td className="py-2 px-4 border-b">{restaurant.address}</td>
                <td className="py-2 px-4 border-b">{restaurant.telephone}</td>
                <td className="py-2 px-4 border-b">
                  <Link
                    to={`/edit/${restaurant._id}`}
                    className="inline-block hover:bg-blue-500 hover:no-underline bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    onClick={(e) => e.stopPropagation()} // Prevent the link click from triggering the row click
                  >
                    <i className="far fa-edit hover:no-underline"></i>&nbsp;Edit
                  </Link>
                  <button
                    className="inline-block bg-red-500 text-white px-3 py-1 rounded hover:bg-blue-500"
                    onClick={(e) => handleDelete(restaurant._id, e)}
                  >
                    <i className="far fa-trash-alt"></i>&nbsp;Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-500">
          <Link to="/add" className="text-white hover:no-underline">
            Add New Restaurant
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
