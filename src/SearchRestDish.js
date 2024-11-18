import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

function SearchRestDish() {

 


  return (
    <div className={`search-rest-dish`}>
      
      <div className='link-rest-dish'>
        <Link
          to='/searchrestdish/restaurant'
         
         
        >
          Search Restaurants
        </Link>
        <Link
          to='/searchrestdish/dishItems'
          
        >
          Search Dish
        </Link>
      </div>
      <Outlet/>
    </div>
  );
}

export default SearchRestDish;
