import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function SearchRestaurant() {
  let [restaurantName, setRestaurantName] = useState("")
  let [restArr, setRestArr] = useState([])
  useEffect(() => {


    axios.get(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=17.4505017&lng=78.360756&str=${restaurantName}&trackingId=03ad60a8-851c-fca3-07fb-c90a27ded652&submitAction=ENTER&queryUniqueId=5bdbc8ae-80af-26de-7165-ef2ebb985ec1`)
      .then((res) => {
        if (res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards?.length == 2) {
          console.log(res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards)
          setRestArr(res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards)
        } else if (res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards?.length > 2) {
          console.log(res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards)
          setRestArr(res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards)


        }
      })

  }, [restaurantName])
  function onInputChange(e) {

    setRestaurantName(e.target.value)


  }
  return (
    <>

      <div className='dish-cont' style={{ textAlign: "center", position: "relative", bottom: "40px", height: "75vh" }}>


        <input
          className='search-dish-inp'
          style={{
            position: "absolute",
            top: "60px",

            width: "70%",
            zIndex: '2',
            padding: '12px 20px',
            margin: "20px auto",
            borderRadius: "5px",
            border: "1px solid #ccc",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            fontSize: "16px",
            transition: "border 0.3s, box-shadow 0.3s",
            outline: "none", // Remove default outline
          }}
          placeholder='Enter Restaurant Name'
          onChange={(e) => {
            onInputChange(e)
          }}

          onFocus={(e) => {
            e.target.style.border = "1px solid #ff6f61"; // Change border color on focus
            e.target.style.boxShadow = "0 0 5px rgba(255, 111, 97, 0.5)"; // Add shadow on focus
          }}
          onBlur={(e) => {
            e.target.style.border = "1px solid #ccc"; // Reset border color on blur
            e.target.style.boxShadow = "none"; // Remove shadow on blur
          }}
        />
        <div style={{ width: "70%", position: "absolute", backgroundColor: "white", height: "100%", left: "15%", top: "18%", overflowY: "auto", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", padding: "20px" }} className='container scroll-div'>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {restArr?.length > 2 ? restArr.map((item, i) => (
              <>
                <Link to= {`/restaurantMenu/${item?.card?.card?.info?.name}/${item?.card?.card?.info?.id}`} className='restclickinfo'>
                  <div key={i} style={{
                    background: "white",
                    borderRadius: "10px",
                    display: "flex",
                    padding: "20px",
                    gap: "20px",
                    boxShadow: "0 1px 5px rgba(0, 0, 0, 0.2)",
                    alignItems: "center",
                  }}>
                    <img
                      style={{ width: "100px", height: "100px", borderRadius: "10px" }}
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/${item?.card?.card?.info?.cloudinaryImageId}`}
                      alt={item?.card?.card?.info?.name}
                    />
                    <div style={{ textAlign: "start" }} >
                      <p><b>{item?.card?.card?.info?.name}</b></p>
                      <span style={{ fontSize: "14px" }}> <b>
                        <i className={`bi bi-star-fill ${item?.card?.card?.info.avgRating > 4.5 ? "top-rated" : item?.card?.card?.info.avgRating > 4 ? "avg" : "low-rated"}`}></i>
                        {item?.card?.card?.info.avgRating}
                      </b></span>
                      <span style={{ margin: "0 5px" }}>.</span>
                      <span style={{ fontSize: "14px" }}>{item?.card?.card?.info?.sla?.minDeliveryTime} - {item?.card?.card?.info?.sla?.maxDeliveryTime} MINS</span>
                      <span style={{ margin: "0 5px" }}>.</span>

                      <span style={{ fontSize: "14px" }}>{item?.card?.card?.info?.costForTwo / 100}</span>
                      <br />
                      <div style={{display:"block"}}>
                      {item?.card?.card?.info?.cuisines.map((item2, i) => {
                        return (
                          <span style={{fontSize:"14px",fontWeight:"400",marginRight:"10px"}} key={i}  >{item2}</span>
                        );
                      })}
                      </div>
                    </div>
                  </div>
                </Link>
              </>
            )
            
          ) :""
          
          
        }
        </div>
      </div>
      {restArr.length == 2 ? 
      
      <div style={{ width: "70%", position: "absolute", backgroundColor: "white", height: "100%", left: "15%", top: "18%", overflowY: "auto", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", padding: "20px" }} className='container scroll-div'>
      
        
          <>
            <Link to= {`/restaurantMenu/${restArr[0]?.card?.card?.info?.name}/${restArr[0]?.card?.card?.info?.id}`} className='restclickinfo'>
              <div  style={{
                background: "white",
                borderRadius: "10px",
                display: "flex",
                padding: "20px",
                gap: "20px",
                boxShadow: "0 1px 5px rgba(0, 0, 0, 0.2)",
                alignItems: "center",
              }}>
                <img
                  style={{ width: "100px", height: "100px", borderRadius: "10px" }}
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/${restArr[0]?.card?.card?.info?.cloudinaryImageId}`}
                  alt={restArr[0]?.card?.card?.info?.name}
                />
                <div style={{ textAlign: "start" }} >
                  <p><b>{restArr[0]?.card?.card?.info?.name}</b></p>
                  <span style={{ fontSize: "14px" }}> <b>
                    <i className={`bi bi-star-fill ${restArr[0]?.card?.card?.info.avgRating > 4.5 ? "top-rated" : restArr[0]?.card?.card?.info.avgRating > 4 ? "avg" : "low-rated"}`}></i>
                    {restArr[0]?.card?.card?.info.avgRating}
                  </b></span>
                  <span style={{ margin: "0 5px" }}>.</span>
                  <span style={{ fontSize: "14px" }}>{restArr[0]?.card?.card?.info?.sla?.minDeliveryTime} - {restArr[0]?.card?.card?.info?.sla?.maxDeliveryTime} MINS</span>
                  <span style={{ margin: "0 5px" }}>.</span>

                  <span style={{ fontSize: "14px" }}>{restArr[0]?.card?.card?.info?.costForTwo / 100}</span>
                  <br />
                  <div style={{display:"block"}}>
                  {restArr[0]?.card?.card?.info?.cuisines.map((item2, i) => {
                    return (
                      <span style={{fontSize:"14px",fontWeight:"400",marginRight:"10px"}} key={i}  >{item2}</span>
                    );
                  })}
                  </div>
                </div>
              </div>
            </Link>
          </>
          <h2 style={{marginTop:"50px",textAlign:"start"}}>More Results Like this</h2>
          <div style={{ marginTop:"40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {restArr[1]?.card?.card?.restaurants.map((item,i)=>  {
console.log(item)
              return(
              
               <>
               <Link to= {`/restaurantMenu/${item?.info?.name}/${item?.info?.id}`} className='restclickinfo'>
                 <div  style={{
                   background: "white",
                   borderRadius: "10px",
                   display: "flex",
                   padding: "20px",
                   gap: "20px",
                   boxShadow: "0 1px 5px rgba(0, 0, 0, 0.2)",
                   alignItems: "center",
                 }}>
                   <img
                     style={{ width: "100px", height: "100px", borderRadius: "10px" }}
                     src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/${item?.info?.cloudinaryImageId}`}
                     alt={item?.info?.name}
                   />
                   <div style={{ textAlign: "start" }} >
                     <p><b>{item?.info?.name}</b></p>
                     <span style={{ fontSize: "14px" }}> <b>
                       <i className={`bi bi-star-fill ${item?.info.avgRating > 4.5 ? "top-rated" : item?.info.avgRating > 4 ? "avg" : "low-rated"}`}></i>
                       {item?.avgRating}
                     </b></span>
                     <span style={{ margin: "0 5px" }}>.</span>
                     <span style={{ fontSize: "14px" }}>{item?.info?.sla?.minDeliveryTime} - {item?.info?.sla?.maxDeliveryTime} MINS</span>
                     <span style={{ margin: "0 5px" }}>.</span>
   
                     <span style={{ fontSize: "14px" }}>{item?.info?.costForTwo / 100}</span>
                     <br />
                     <div style={{display:"block"}}>
                     {item?.info?.cuisines.map((item2, i) => {
                       return (
                         <span style={{fontSize:"14px",fontWeight:"400",marginRight:"10px"}} key={i}  >{item2}</span>
                       );
                     })}
                     </div>
                   </div>
                 </div>
               </Link>
             </>
              )

            })}
           

            </div>
    </div>
  :""
    
    }

      </div>
    </>

  )
}

export default SearchRestaurant
