import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";
import { ClipLoader } from "react-spinners";
import Navbar from "../Navbar";
import Footer from "../Footer";
import CartContext from "../../context/CartContext";

import "./index.css";

const RestaurantDetails = () => {
  const { id } = useParams(); // Get restaurant ID from URL
  const [restaurant, setRestaurant] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  const { addCartItem } = useContext(CartContext);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await fetch(
          `https://restaurant-mern-backend.onrender.com/api/products/${id}`
        );
        const data = await response.json();

        if (data.success) {
          setRestaurant(data.restaurant);
          setFoodItems(data.restaurant.food_items || []);
        }
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  const onIncrementQuantity = (itemId) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 1) + 1,
    }));
  };

  const onDecrementQuantity = (itemId) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: prev[itemId] > 1 ? prev[itemId] - 1 : 1,
    }));
  };

  return (
    <div>
      <Navbar />
      {restaurant ? (
        <div className="restaurant-details">
          <div className="restaurant-header">
            <div className="restaurant-below-card">
              <img
                src={restaurant.image_url}
                alt="restaurant"
                className="restaurant-image"
              />
              <h2 className="restaurant-category">{restaurant.category}</h2>
              <p className="restaurant-location">
                Location: {restaurant.location}
              </p>
              <p className="restaurant-rating">
                Rating: {restaurant.rating} ⭐
              </p>
            </div>
          </div>
          <h3>Food Items:</h3>
          <div className="food-container">
            {foodItems.length > 0 ? (
              foodItems.map((item) => (
                <div key={item._id} className="food-card">
                  <img src={item.image_url} alt={item.name} />
                  <h4>{item.name}</h4>
                  <p>Price: ₹{item.price}</p>
                  <hr className="horizontal-line" />

                  <div className="quantity-container">
                    <button
                      type="button"
                      className="quantity-controller-button"
                      onClick={() => onDecrementQuantity(item._id)}
                    >
                      <BsDashSquare className="quantity-controller-icon" />
                    </button>
                    <p className="quantity">{quantities[item._id] || 1}</p>
                    <button
                      type="button"
                      className="quantity-controller-button"
                      onClick={() => onIncrementQuantity(item._id)}
                    >
                      <BsPlusSquare className="quantity-controller-icon" />
                    </button>
                  </div>

                  <button
                    type="button"
                    className="add-to-cart-btn"
                    onClick={() =>
                      addCartItem({
                        id: item._id,
                        name: item.name,
                        price: item.price,
                        image_url: item.image_url,
                        quantity: quantities[item._id] || 1,
                      })
                    }
                  >
                    ADD TO CART
                  </button>
                </div>
              ))
            ) : (
              <p>No food items available.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="products-details-loader-container">
          <ClipLoader color="#0b69ff" height="50" width="50" />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default RestaurantDetails;
