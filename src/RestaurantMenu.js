import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { addToCart } from './Reducer';
import { useDispatch } from 'react-redux';
import { ToastContainer,toast } from 'react-toastify';
import { render } from '@testing-library/react';

function RestaurantMenu() {
  let patch = useDispatch();
    const [restMenu, setRestMenu] = useState([]);
    const [menuCard,setMenuCard]  = useState({})
    const params = useParams();
    const [nestItemMenu,setNestItemMenu] = useState([])

    useEffect(() => {
        axios.get(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.4106735&lng=78.5451449&restaurantId=${params.restId}&catalog_qa=undefined&submitAction=ENTER`)
        .then((response)=>{
        setRestMenu(response.data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.splice(1))
        setMenuCard(response?.data?.data?.cards[2].card.card.info)               
                })
                
        
    }, [params.restId]); 

    return (
        <div style={{marginTop:"50px"}} className='restmenu'>
            <h1>{params?.restName}'s</h1>
            {restMenu.length>0?<div className='menucard'>
                <div style={{margin: "10px",fontSize:"20px", fontWeight: "bold"}} className='card-rating'>
                <i style={{color:"green"}} class="bi bi-star-fill"></i>
                <span>{menuCard?.avgRating} ({menuCard?.totalRatingsString}) </span>
                <span>{menuCard?.costForTwoMessage}</span>
                </div>
                <div style={{color:"orangered",textDecoration:"line"}} className='card-type'>
                    <span style={{marginRight:"10px"}}>{menuCard?.cuisines[0]},</span>
                    <span>{menuCard?.cuisines[1]}</span>
                </div>
                <div style={{fontWeight:"bold"}} className='time'>
                    <p>30-35mins</p>

                </div>
            </div> :"" }
              
            <div className='container'>
  <div className="accordion accordion-flush" id="accordionFlushExample">
    {restMenu.length > 0 ? (
      restMenu.map((item, i) => {
        if (item.card.card.itemCards) {
          return (
            <div className="accordion-item" key={i}>
              <h2 className="accordion-header" id={`flush-heading${i}`}>
                <button
                  style={{ fontSize: "24px", fontWeight:"bold" }}
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#flush-collapse${i}`}
                  aria-expanded="false"
                  aria-controls={`flush-collapse${i}`} 
                >
                  {item?.card?.card?.title}
                </button>
              </h2>
              <div
                id={`flush-collapse${i}`} 
                className="accordion-collapse collapse"
                aria-labelledby={`flush-heading${i}`} 
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                 
                  
                  {item?.card?.card?.itemCards?.map((item,i)=>{
                    console.log(item)
                    
                    return(
        <div className='card-container'>
          <div  className='card-details'>
                <h3 style={{fontSize:"24px"}}>{item?.card?.info?.name}</h3>
                <p style={{fontWeight:"bold"}}>₹{item?.card?.info?.price/100 ? item?.card?.info?.price/100 : item?.card?.info?.defaultPrice/100  }</p>
                <p><b><i style={{color:"green"}} class={`bi bi-star-fill`}></i>{item?.card.info?.ratings?.aggregatedRating?.rating}</b></p>
                <p>{item?.card?.info?.description    }</p>
                 </div>
                <div className='card-menu-picture'>
                   { item?.card?.info?.imageId ? <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item?.card?.info?.imageId}`}/>
                   :<img src = 'https://st4.depositphotos.com/4258905/28341/i/450/depositphotos_283411888-stock-photo-fork-and-spoon-on-an.jpg'/>}
                    <button 
                    onClick={()=>{
                      patch(addToCart({ Name:item?.card?.info?.name , price : item?.card?.info?.price/100 ? item?.card?.info?.price/100 : item?.card?.info?.defaultPrice/100 ,
                        Img : `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item?.card?.info?.imageId}`
                        }))
                        toast(
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "15px 20px",
                              height: "80px",
                              fontFamily: "'Poppins', sans-serif",
                              borderRadius: "8px",
                              backgroundColor: "green", // main toast background color
                            }}
                          >
                            <p
                              style={{
                                fontSize: "16px",
                                color: "white",
                                margin: 0,
                                fontWeight: "500", 
                              }}
                            >
                              Item is Added
                            </p>
                            <Link
                              to="/cartItems"
                              style={{
                                color: "white", 
                                fontWeight: "600", 
                                fontSize: "16px",
                                textDecoration: "none", 
                                padding: "5px 15px", 
                                borderRadius: "25px",
                                backgroundColor: "#f0a500", 
                                transition: "background-color 0.3s", 
                              }}
                              onMouseEnter={(e) => e.target.style.backgroundColor = "#ff9c00"} 
                              onMouseLeave={(e) => e.target.style.backgroundColor = "#f0a500"} 
                            >
                              Check Cart
                            </Link>
                          </div>,
                          {
                            style: {
                              backgroundColor: "green",
                              borderRadius: "8px", 
                              color: "white", 
                              padding: "0", 
                            },
                          }
                        );
                        
                    }}
                    style={{marginLeft:"12px"}} type="button" class="btn btn-success">ADD</button>
                     </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          );
        }
        return null; // Return null if the condition isn't met
      })
    ) : (
      <>
    <div class="spinner-border" style={{width:"3rem",height:"3rem",marginTop:"300px"}} role="status">
  <span class="sr-only"></span>
</div>

    </>
    )}
  </div>
</div>
<ToastContainer
position= 'bottom-right'
/>

        </div>
    );
}

export default RestaurantMenu;
