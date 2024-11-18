import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header({ searchPlaces, setSearchPlaces }) {
  let noOfItemsInCart = useSelector((state) => state.cartItems.length);

  return (
    <div className="header" style={{width:"100%"}}>
      <nav style={{width:"100%",backgroundColor:"white"}} className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          {/* Logo */}
          <Link to="/" className="navbar-brand">
            <img
              className="swiggy-logo"
              src="https://media.licdn.com/dms/image/v2/D4D0BAQEHg8WfL1CDeg/company-logo_200_200/company-logo_200_200/0/1712215166717/swiggy_in_logo?e=2147483647&v=beta&t=uoyWzjhC45Ib0t1nV0qXv6cgU-DLEgeDCLibOie-rd8"
              alt="Swiggy Logo"
              style={{ width: '100px' }} // Adjust logo size as needed
            />
          </Link>

          {/* Hamburger Menu for Small Screens */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            // aria-controls="navbarNav"
            // aria-expanded="false"
            // aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse signUp" id="navbarNav">
            <ul style={{gap:'30px'}} className="navbar-nav ms-auto">
              <li className="nav-item">
                <a
                  style={{ color: 'black' }}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.swiggy.com/corporate/"
                  className="nav-link"
                  data-bs-target="#navbarNav"
                >
                  <i className="bi bi-box2" ></i> Swiggy Corporate
                </a>
              </li>

              <li className="nav-item" data-bs-target="#navbarNav">
                <Link data-bs-target="#navbarNav" to="/searchrestdish/restaurant" className="nav-link" style={{ color: 'black' }}>
                  <i className="bi bi-search"></i> Search
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/cartItems" className="nav-link">
                  <i className="bi bi-bag"></i>
                  <span>{noOfItemsInCart}</span>
                </Link>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                >
                  Sign In
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Offcanvas Sign In Form */}
      <div 
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Sign In</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <form >
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <div style={{width:"100%",textAlign:"center"}}>
            <button style={{textAlign:"center"}} type="submit" className="  btn-primary"  data-bs-dismiss="offcanvas" >
              Sign In
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Header;
