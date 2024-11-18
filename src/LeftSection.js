import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SlideItems from './SlideItems'

function LeftSection({inputSearch,setInputSearch,location,coordinates,setCoordinates}) {

  function onLocationClick(item){
    console.log(item)
    axios.get(`https://www.swiggy.com/dapi/misc/address-recommend?place_id=${item.place_id}`)
    .then((res) => {
      setCoordinates(res.data.data[0].geometry.location)
    })
  }

  return (
    <>
      <h2 style={{marginLeft: "100px",marginTop:"150px"}}>What's on your mind?</h2>
      <SlideItems />
   
      <div className='location-click' >
        <button 
          className="btn btn-location" 
          type="button" 
          data-bs-toggle="offcanvas" 
          data-bs-target="#staticBackdrop" 
          aria-controls="staticBackdrop">
          Other Locations
        </button>

        <div className="location-off offcanvas offcanvas-start location-container"  data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
          <div className="offcanvas-header">
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <div>
              <div id='left'>
                <h1 style={{textAlign: "center", fontSize: "30px"}}>Locations</h1>
                <input 
                  className="location-input" 
                  placeholder='Enter the location' 
                  onChange={(e) => setInputSearch(e.target.value)} 
                />
                {inputSearch !== "" && (
                  <ul className="location-list">
                    {location?.map((item, i) => (
                      <li 
                        data-bs-dismiss="offcanvas" 
                        key={i} 
                        onClick={() => {
                          onLocationClick(item)
                          console.log(item)
                        }} 
                        className="location-item">
                        {item.description}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LeftSection
