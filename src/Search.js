import React, { useEffect, useState } from 'react'
import ShimmerEffect from './ShimmerEffect'
import axios from 'axios'
import LeftSection from './LeftSection'
import { Link ,NavLink} from 'react-router-dom'


function Search({ searchPlaces, setSearchPlaces }) {
  // States
  let [inputSearch, setInputSearch] = useState("")
  let [isFilter,setIsFilter] = useState(false)
  let [isSecondFilter,setIsSecondFilter] = useState(false)
  
  let [location, setLocation] = useState([])
  let [coordinates, setCoordinates] = useState({
    lat: 17.4106735,
    lng: 78.5451449
  })
  let [products, setProducts] = useState([])

  let [loading, setLoading] = useState(true)

  // Fetching location data based on search input
  useEffect(() => {
    if (inputSearch) {
      axios.get(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=${inputSearch}&types=`)
        .then((res) => {
          setLocation(res.data.data)
        })
    }
  }, [inputSearch])

  useEffect(() => {
    setLoading(true) 
    axios.get(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${coordinates.lat}&lng=${coordinates.lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
      .then((res) => {
        if(res.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle ==!undefined){
        setProducts(res?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
      }
      else{
        setProducts([])
      }
        setLoading(false) 
      })
      .catch(() => {
        setLoading(false)
      })
  }, [coordinates])

  
  function highRating() {
    setIsSecondFilter(false)
    setLoading(true) 
    setIsFilter(true)
    const filtered = products.filter((item) => item.info.avgRating > 4)

    
    setTimeout(() => {
      setProducts(filtered) 
      setLoading(false) 
    },500) 
  }
  function lessPrice(){
setIsSecondFilter(true)
    setLoading(true)
    setIsFilter(false)
    const filtered = products.filter((item)=> {
      const costForTwoStr = item?.info?.costForTwo 
      const cost = costForTwoStr ? parseInt(costForTwoStr.replace(/[^\d]/g, '')) : 0;
      return cost < 300


    })
    

    setTimeout(()=>{
      setProducts(filtered)
      setLoading(false)
    },500)
    
  }

  
  // useEffect(() => {
  //   if (location.length > 0 && inputSearch) {
  //     const newCoordinates = location[0].place.location
  //     setCoordinates({
  //       lat: newCoordinates.lat,
  //       lng: newCoordinates.lng,
  //     })
  //   }
  // }, [location, inputSearch])
  console.log(products)

  return (
    <>
      <div style={{ textAlign: "center", marginLeft: "200px" }}>
        <h1 style={{ fontSize: "30px" }}>Top Restaurants Near You</h1>
      </div>

      <div id='box'>
        {/* Left Section for location search */}
        <LeftSection
          setCoordinates={setCoordinates}
          coordinates={coordinates}
          setInputSearch={setInputSearch}
          location={location}
          inputSearch={inputSearch}
          searchPlaces={searchPlaces}
          setSearchPlaces={setSearchPlaces}
        />

       
        <h2 style={{ marginLeft: "130px" }}>Top restaurant chains in Hyderabad</h2>
        <div style={{ marginLeft: "130px" }}>
          <button 
            onClick={highRating} 
            className= {isFilter ? 'active' : 'not-active'}
            
          >
            Ratings 4+
          </button>
          <button  onClick={lessPrice} className= {isSecondFilter ? 'active' : 'not-active'}
          style={{marginLeft:"17px"}}
          
          >
            Less than 300
          </button>
        </div>

        
        <div id='right' className="row row-cols-1 row-cols-lg-4 row-cols-md-3 g-4">
          {loading ? (
            <ShimmerEffect /> 
          ) : (
            products.map((item) => (
              <Link to={`/restaurantMenu/${item.info.name}/${item.info.id}`} key={item.info.id}>
                <div className="col">
                  <div className="card" >
                    <img
                      className=""
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item?.info?.cloudinaryImageId}`}
                      className="card-img-top"

                    />
                    <div className="card-body">
                      <h5 className="card-title">{item?.info?.name}</h5>
                          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"15px"}}>
                      <span>
                        <b>
                          <i
                            className={`bi bi-star-fill ${item?.info?.avgRating > 4.5
                              ? "top-rated"
                              : item?.info?.avgRating > 4
                                ? "avg"
                                : "low-rated"
                              }`}
                          ></i>

                          {item?.info?.avgRating}
                        </b>
                      </span>
                      <i style={{fontSize:"26px"}} class="bi bi-bicycle"></i>
                      <span>{item?.info?.sla?.slaString}</span>
                          </div>
                      <p>{item?.info?.locality}</p>
                     <span style={{fontWeight:"600",color:"rgba(2, 6, 12, 0.6)"}}>{item?.info?.cuisines[0]} , {item?.info?.cuisines[1]}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default Search
