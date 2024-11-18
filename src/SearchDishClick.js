import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from './Reducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom';

function SearchDishClick() {
    let patch = useDispatch();
    const [inpChange, setInputChange] = useState("");
    const [visible, setVisible] = useState(false);
    const [dishArr, setDishArr] = useState([]);
    const [selectedDish, setSelectedDish] = useState(null);


    useEffect(() => {
        if (inpChange) {
            axios.get(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=17.4106735&lng=78.5451449&str=${inpChange}&trackingId=4b118054-1e57-b904-cb61-61d8e9f01a4a&submitAction=ENTER&queryUniqueId=0fcac02b-49e0-5114-406c-9617a84afff3`)
                .then((res) => {
                    if (res.data.data && res.data.data.cards[1].groupedCard.cardGroupMap.DISH) {
                        setDishArr(res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards?.splice(1));
                    }
                });
        }
    }, [inpChange]);

    function moreDetails(dish) {
        setSelectedDish(dish);
        console.log(selectedDish)
        setVisible(true);
    }

    return (
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
                placeholder='Enter dish name'
                onChange={(e) => setInputChange(e.target.value)}
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
                <div className='dish-grid' >
                    {dishArr?.length > 0 ? dishArr.map((item, i) => (
                        <div key={i} style={{
                            background: "white",
                            borderRadius: "10px",
                            display: "flex",
                            padding: "20px",
                            boxShadow: "0 1px 5px rgba(0, 0, 0, 0.2)",
                            alignItems: "center",
                        }}>
                            <div style={{ flex: 1, paddingRight: "15px" }}>
                                <div style={{ display: "flex", flexDirection: "column", height: "100%", alignItems: "flex-start" }}>
                                    <div style={{ color: "gray", fontWeight: "600", marginBottom: "5px" }}>
                                        By {item?.card?.card?.restaurant.info.name}
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                        <b>
                                            <i className={`bi bi-star-fill ${item?.card?.card?.restaurant.info.avgRating > 4.5 ? "top-rated" : item?.card?.card?.restaurant.info.avgRating > 4 ? "avg" : "low-rated"}`}></i>
                                            {item?.card?.card?.restaurant.info.avgRating}
                                        </b>
                                        <span style={{ margin: "0 5px" }}>.</span>
                                        <span>{item?.card?.card?.restaurant.info?.sla?.minDeliveryTime} - {item?.card?.card?.restaurant.info?.sla?.maxDeliveryTime} MINS</span>
                                    </div>
                                    <h4 style={{ fontSize: "20px", margin: "5px 0" }}>{item?.card?.card?.info?.name}</h4>
                                    <h6 style={{ fontSize: "18px", margin: "5px 0", color: "#333" }}>₹{item?.card?.card?.info?.price / 100}</h6>
                                    <button
                                        style={{
                                            padding: "8px 12px",
                                            border: "none",
                                            background: "orangered",
                                            color: "white",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                            marginBottom: "10px",
                                            transition: "background 0.3s"
                                        }}
                                        onClick={() => moreDetails(item)}
                                    >
                                        More details
                                    </button>
                                    <button
                                        onClick={() => {
                                            patch(addToCart({
                                                Name: item?.card?.card?.info?.name, price: item?.card?.card?.info?.price / 100 ,
                                                Img: `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item?.card?.card?.info?.imageId}`
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
                                        style={{
                                            marginLeft: "0", padding: "8px 12px",
                                            border: "none",
                                            background: "green",
                                            color: "white",
                                            borderRadius: "5px",
                                            margintop: "100px",
                                            fontSize: "17px",
                                            cursor: "pointer",
                                            transition: "background 0.3s"
                                        }} type="button" class="btn btn-success">Add To Cart</button>
                                </div>
                            </div>
                            <img
                                style={{ width: "120px", height: "auto", borderRadius: "10px" }}
                                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/${item?.card?.card?.info?.imageId}`}
                                alt={item?.card?.card?.info?.name}
                            />
                        </div>
                    )) : ""}
                </div>
            </div>

            {visible && (
                <>
                    <div style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 5
                    }} onClick={() => setVisible(false)} />

                    <div className="details-card" style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        background: "white",
                        padding: "20px",
                        borderRadius: "10px",
                        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                        zIndex: 50,
                        width: "450px",
                        textAlign: "center"
                    }}>
                        <img
                            style={{ width: "100%", height: "auto", borderRadius: "10px", marginBottom: "10px" }}
                            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/${selectedDish?.card?.card?.info?.imageId}`}
                            alt={selectedDish?.card?.card?.info?.name}
                        />
                        <h2 style={{ margin: "0 0 10px" }}>{selectedDish?.card?.card?.info?.name}</h2>
                        <p style={{ margin: "5px 0" }}>Price: ₹{selectedDish?.card?.card?.info?.price / 100}</p>
                        <p style={{ margin: "5px 0" }}>Restaurant: {selectedDish?.card?.card?.restaurant.info.name}</p>
                        <p style={{ margin: "5px 0" }}>Rating: {selectedDish?.card?.card?.restaurant.info.avgRating}</p>
                        <button
                            style={{
                                padding: "8px 12px",
                                border: "none",
                                background: "orangered",
                                color: "white",
                                borderRadius: "5px",
                                cursor: "pointer",
                                transition: "background 0.3s"
                            }}
                            onClick={() => setVisible(false)}
                        >
                            Close
                        </button>
                    </div>
                </>
            )}
            <ToastContainer
            position= "bottom-right"
            />
        </div>
    );
}

export default SearchDishClick;
