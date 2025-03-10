import { useContext, useState } from "react";
import Payment from "../Payment";
import CartItem from "../CartItem";
import CartTotal from "../CartTotal";
import CartContext from "../../context/CartContext";
import "./index.css";

const CartListView = () => {
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const { cartList, removeAllCartItems } = useContext(CartContext);

  const orderPlaced = () => {
    setIsOrderPlaced((prevState) => !prevState);
  };

  const onClickRemoveAllBtn = () => {
    removeAllCartItems();
  };

  return isOrderPlaced ? (
    <Payment />
  ) : (
    <div className="cart-content-container">
      <div className="cart-card-details">
        <div className="cart-heading-remove-all-btn">
          <h1 className="my-cart-heading">My Cart</h1>
          <button
            type="button"
            className="remove-all-btn"
            onClick={onClickRemoveAllBtn}
          >
            Remove All
          </button>
        </div>
        <div className="desktop-cart-header">
          <h1 className="cart-header-item">Item</h1>
          <h1 className="cart-header-quantity">Quantity</h1>
          <h1 className="cart-header-price">Price</h1>
          <h1 className="cart-header-remove">Remove</h1>
        </div>
        <ul className="cart-list">
          {cartList.map((eachItem) => (
            <CartItem key={eachItem.id} cartItem={eachItem} />
          ))}
        </ul>
      </div>
      <CartTotal orderPlaced={orderPlaced} />
    </div>
  );
};

export default CartListView;
