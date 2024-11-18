import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Search from './Search'
import SlideItems from './SlideItems'

function Landing({searchPlaces,setSearchPlaces, fade}) {
 
  return (
    <>
    <div className='main-section'>
    <img className='main-section-vegetables' src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png'/>
    <div className='order-head'>
      <h2>Order food & groceries.<br/> Discover best restaurants. Swiggy it!</h2>
      <NavLink style={{width: "60%"}} to={'/searchrestdish/restaurant'}> <input className='search-inp' placeholder='Search for restaurant or more'/></NavLink>
    </div>
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
    <Link to={'/search'}> <img  style={{height:"400px",width:"450px",marginTop:"240px"}} src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/8/1/fa01e85b-3057-482d-9523-5289722b1df2_Food4BU.png'/></Link>
  </div>
  </div>
    <h1 style={{margin:"80px 0 40px 40px"}}>order our best food options</h1>
  <SlideItems/>
  <img style={{    objectFit:'contain',
    height: '100%',
    width: '100%',
    marginBottom:"140px"
  }} src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/seo/App_download_banner.png'/>
  {/* <Search
  fade = {fade}
  searchPlaces={searchPlaces}
  setSearchPlaces={setSearchPlaces}
  /> */}
  </>
  )
}

export default Landing
