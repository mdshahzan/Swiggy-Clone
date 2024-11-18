import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Landing from './Landing';
import RestaurantMenu from './RestaurantMenu';
import SelectedItem from './SelectedItem';
import SearchRestDish from './SearchRestDish';
import SearchRestaurant from './SearchRestaurant';
import SearchDishClick from './SearchDishClick';
import SearchRestClick from './SearchRestClick';
import Search from './Search';
import CartIems from './CartIems';

function App() {
  let [products, setProducts] = useState([]);
  let [searchPlaces, setSearchPlaces] = useState(false);

  useEffect(() => {
    axios.get("https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4106735&lng=78.5451449&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
      .then((res) => {
        setProducts(res.data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
      });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Header 
          searchPlaces={searchPlaces}
          setSearchPlaces={setSearchPlaces}
        />
        <Routes>
          <Route path='/cartItems' element = {<CartIems/>} />
          <Route path='/' element={<Landing searchPlaces={searchPlaces} setSearchPlaces={setSearchPlaces} />} />
          <Route path='/restaurantMenu/:restName/:restId' element={<RestaurantMenu />} />
          <Route path='/selectedMenu/:menuName/:menuId' element={<SelectedItem />} />
          <Route path='/search' element = {<Search
          searchPlaces={searchPlaces}
          setSearchPlaces={setSearchPlaces}
          />}/>
          
         
          <Route path='/searchrestdish' element={<SearchRestDish />}>
            <Route path='restaurant' element={<SearchRestaurant />} />
            <Route path='dishItems' element={<SearchDishClick />} />         
             </Route>
          
          
          
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
