import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Component } from 'react';
import Home from './components/Home';
import CreateRestaurant from './components/CreateRestaurant';
import EditRestaurant from './components/EditRestaurant';
import RestaurantDetails from './components/RestaurantDetails';


export default class App extends Component {
  render(){
    return(
      <Router>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/add' element={<CreateRestaurant />} />
            <Route path='/edit/:id' element={<EditRestaurant />} />
            <Route path='/restaurant/:id' element={<RestaurantDetails />} />
          </Routes>
        </div>
      </Router>
    )
  }
}
