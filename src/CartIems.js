import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteFromCart } from './Reducer';
import { removeCart } from './Reducer';

function CartItems() {
  const patch = useDispatch();
  const cart = useSelector((state) => state.cartItems); // Array of cart items

  // Calculate the total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };
  function clearCart(){
    patch(removeCart())
    

  }

  return (
    <div className="cart-container">
      <h1 className="cart-header">Your Cart</h1>

      {/* Display Cart Items in the Main Page */}
      <div className="cart-items">
        {cart.length !== 0 ? (
          <>
            {/* Display Cart Items in a Vertical Layout */}
            {cart.map((item, i) => (
              <div key={i} className="cart-item-card">
                <img className="cart-item-image" src={item.Img} alt={item.Name} />
                <div className="cart-item-details">
                  <h2 className="cart-item-name">{item.Name}</h2>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                  <i
                    onClick={() => {
                      patch(deleteFromCart(i));
                      toast('Item is removed', {
                        style: {
                          color: 'white',
                          backgroundColor: 'red',
                          fontWeight: 'bold',
                        },
                      });
                    }}
                    className="bi bi-trash"
                  ></i>
                </div>
              </div>
            ))}

            {/* Display Total Price */}
           

            {/* Button to Open Offcanvas */}
          </>
        ) : (
          <div className="empty-cart-message">
            <h2 className="empty-cart-text">Your cart is empty!</h2>
            <p className="empty-cart-subtext">
              Looks like you haven't added anything yet. Start browsing and add items to your cart.
            </p>
            <Link to={'/searchrestdish/restaurant'} className="empty-cart-button">
              Start Shopping
            </Link>
          </div>
        )}
      </div>

      {/* Offcanvas Bottom - Scrollable and Total Price */}
      <div className="offcanvas offcanvas-bottom" style={{ height: '70%' }} tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasBottomLabel">Your Cart Items</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          {/* Scrollable Cart Items in Offcanvas */}
          <div className="cart-item-list" style={{ display: 'flex', overflowX: 'auto', whiteSpace: 'nowrap', gap: '15px' }}>
            {cart.map((item, i) => (
              <div key={i} className="cart-item-card2" style={{ flexShrink: 0 }}>
                <img className="cart-item-image" src={item.Img} alt={item.Name} />
                <div className="cart-item-details">
                  <h2 className="cart-item-name">{item.Name}</h2>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                  <i
                    onClick={() => {
                      patch(deleteFromCart(i));
                      toast('Item is removed', {
                        style: {
                          color: 'white',
                          backgroundColor: 'red',
                          fontWeight: 'bold',
                        },
                      });
                    }}
                    className="bi bi-trash"
                  ></i>
                </div>
              </div>
            ))}
          </div>

          {/* Display Total Price in Offcanvas */}
          <div className="cart-total" style={{ marginTop: '20px', textAlign: 'center' }}>
            <h3>Total Price: ${calculateTotal()}</h3>
            {cart.length !== 0 ? (
  <button
    onClick={() => {
      clearCart();
    }}
    className="btn-location"
    style={{
      width: "20%",
      fontWeight: "600",
      fontSize: "20px",
    }}
  >
    Clear Cart
  </button>
) : (
  <div
    style={{
      textAlign: "center",
      backgroundColor: "#f8d7da", // Light red background color
      color: "#721c24", // Dark red text color
      border: "1px solid #f5c6cb", // Slightly darker border
      padding: "20px",
      borderRadius: "8px", // Rounded corners
      fontSize: "24px",
      fontWeight: "600",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)", // Shadow effect
    }}
  >
    <i
      className="bi bi-cart-x"
      style={{
        fontSize: "40px", // Larger cart icon
        marginBottom: "15px",
        color: "#721c24",
      }}
    ></i>
    <h2>Oops! Your cart is empty.</h2>
    <p style={{ fontSize: "18px", color: "#6c757d" }}>
      It loo  ks like you haven't added anything yet. Start shopping now!
    </p>
  </div>
)}

          </div>
        </div>
      </div>
                      <div style={{ textAlign: 'center', marginTop: '30px' }}>
                        <button
                          className="btn-location cart-checkout-btn"
                          
                          type="button"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasBottom"
                          aria-controls="offcanvasBottom"
                        >
                          Check Total Price
                        </button>
                      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default CartItems;
