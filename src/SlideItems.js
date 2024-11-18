import React from 'react'
import { Link } from 'react-router-dom'

function SlideItems() {
  let menuArr = ['Burger', 'Biryani', 'Rolls', 'Shake', 'Pizza', 'IceCreams', 'cake', 'salad', 'dosa']
  let collectionId = [83637, 83639, 83669, 83673, 83631, 83640, 83656, 80395, 80426]

  return (
    <div className='slide-menu-container'>
      <div className='slider-wrapper'>
        {menuArr.slice(0, 5).map((item, index) => (
          <div key={index} className='slider-item'>
            <Link to={`/selectedMenu/${item}/${collectionId[index]}`}>
              <img 
                className='slider-img' 
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/${item}.png`} 
                alt={item} 
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SlideItems
