import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../context/CartContext";
import "./index.css";

const Payment = () => {
  const { removeAllCartItems } = useContext(CartContext);

  return (
    <div className="payment-container">
      <div className="payment-card">
        <img
          src="https://res.cloudinary.com/daehuqvdc/image/upload/v1713173212/Vector_zaaguy.png"
          alt="success"
          className="payment-image"
        />
        <h1 className="payment-heading">Payment Successful</h1>
        <p className="payment-text">
          Thank you for ordering! Your payment was successfully completed.
        </p>
        <Link to="/home">
          <button
            type="button"
            className="home-btn"
            onClick={removeAllCartItems}
          >
            Go To Home Page
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Payment;
