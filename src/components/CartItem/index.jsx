import { useContext } from "react";
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";
import { FaRupeeSign } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import CartContext from "../../context/CartContext";
import "./index.css";

const CartItem = ({ cartItem }) => {
  const {
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeCartItem,
  } = useContext(CartContext);
  const { id, name, quantity, price, image_url } = cartItem;

  const decreaseQuantity = () => {
    decrementCartItemQuantity(id);
  };

  const increaseQuantity = () => {
    incrementCartItemQuantity(id);
  };

  const onClickRemoveCartItem = () => {
    removeCartItem(id);
  };

  return (
    <li className="cart-item" data-testid="cartItem">
      <img className="cart-product-image" src={image_url} alt={name} />
      <div className="cart-items-details">
        <h1 className="cart-product-title">{name}</h1>
        <div className="cart-quantity-container">
          <button
            type="button"
            className="quantity-controller-button"
            data-testid="decrement-quantity"
            aria-label="Decrease quantity"
            onClick={decreaseQuantity}
          >
            <BsDashSquare color="#52606D" size={12} />
          </button>
          <p className="cart-quantity" data-testid="item-quantity">
            {quantity}
          </p>
          <button
            aria-label="Increase quantity"
            type="button"
            className="quantity-controller-button"
            data-testid="increment-quantity"
            onClick={increaseQuantity}
          >
            <BsPlusSquare color="#52606D" size={12} />
          </button>
        </div>
        <div className="cart-price-remove-container">
          <p className="cart-total-price">
            <FaRupeeSign color="#616E7C" size={12} /> {price * quantity}/-
          </p>
        </div>
        <div className="button-container">
          <button
            className="delete-button"
            aria-label="Remove item"
            type="button"
            onClick={onClickRemoveCartItem}
            data-testid="remove"
          >
            <AiFillCloseCircle color="#616E7C" size={20} />
          </button>
          <button
            className="remove-button remove-btn-1"
            type="button"
            onClick={onClickRemoveCartItem}
          >
            Remove
          </button>
        </div>
      </div>
      <button
        className="remove-button remove-btn-2"
        type="button"
        onClick={onClickRemoveCartItem}
      >
        Remove
      </button>
    </li>
  );
};

export default CartItem;
