import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import ShimmerEffect from './ShimmerEffect'

function SelectedItem() {
  const [selectedItemDish, setSelectedItemDish] = useState([]);
  const params = useParams();

  useEffect(() => {
    axios.get(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4106735&lng=78.5451449&collection=${params.menuId}&tags=layout_CCS_Burger&sortBy=&filters=&type=rcv2&offset=0&page_type=null`)
      .then((res) => {
        setSelectedItemDish(res?.data?.data?.cards?.splice(3));
      })
  }, [params.menuId]);

  return (
    <>
      <h3 className=" text-center" style={{ fontSize: '40px', fontWeight: 'bold', color: '#333' ,marginTop:"150px",marginBottom:"0"}}>
        {params.menuName}
      </h3>

      <div className="selected-item row row-cols-1 row-cols-lg-3 row-cols-md-3 g-4 mt-4">
        {selectedItemDish.length === 0 ? <ShimmerEffect /> : selectedItemDish.map((item, i) => (
          <Link
            to={`/restaurantMenu/${item?.card?.card.info?.name}/${item?.card?.card.info?.id}`}
            className="col"
            key={i}
          >
            <div className="card shadow-sm border-0 rounded-3 h-100">
              {item?.card?.card?.info?.cloudinaryImageId ? (
                <img
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item?.card?.card?.info?.cloudinaryImageId}`}
                  className="card-img-top rounded-3"
                  alt={item?.card?.card?.info?.name}
                />
              ) : (
                <img
                  src='https://st4.depositphotos.com/4258905/28341/i/450/depositphotos_283411888-stock-photo-fork-and-spoon-on-an.jpg'
                  className="card-img-top rounded-3"
                  alt="default"
                />
              )}

              <div className="card-body text-center">
                <h5 className="card-title text-truncate">{item?.card?.card.info?.name}</h5>
                <p className="card-text">
                  <b>
                    <i
                      className={`bi bi-star-fill ${item?.card?.card.info?.avgRating > 4.5 ? "top-rated"
                        : item?.card?.card.info?.avgRating > 4 ? "avg"
                          : "low-rated"}`}
                    ></i>
                    {item?.card?.card.info?.avgRating}
                  </b>
                </p>
                <p className="text-muted">{item?.card?.card.info?.locality}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default SelectedItem;
