import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { ImStarFull } from "react-icons/im";
import CarouselPage from "../CarouselPage";

import { ClipLoader } from "react-spinners";
import "./index.css";

const UserDashboard = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // State to store sorting option

  // Function to fetch restaurants
  const fetchRestaurants = async (sort = "") => {
    try {
      const response = await fetch(
        `https://restaurant-mern-backend.onrender.com/api/products?sort=${sort}`
      );
      const data = await response.json();
      console.log("Fetched Data:", data);

      if (data.success && Array.isArray(data.restaurants)) {
        setRestaurants(data.restaurants);
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  // Fetch data when component mounts and when sortOrder changes
  useEffect(() => {
    fetchRestaurants(sortOrder);
  }, [sortOrder]);

  // Search Filtering Logic
  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="user-bg-container">
      <Navbar />
      <CarouselPage />
      <h2 className="restaurants-heading">Popular Restaurants</h2>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search Restaurant..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Sorting Dropdown */}
      <div className="sort-container">
        <label htmlFor="sort">Sort by Rating:</label>
        <select
          id="sort"
          className="sort-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Default</option>
          <option value="asc">Ascending (Low to High)</option>
          <option value="desc">Descending (High to Low)</option>
        </select>
      </div>

      {/* Restaurants Grid */}
      <div className="restaurants-grid">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <Link
              to={`/restaurant/${restaurant._id}`}
              key={restaurant._id}
              className="restaurant-link"
            >
              <div className="restaurant-card">
                <img
                  src={restaurant.image_url}
                  alt="restaurant"
                  className="restaurant-image"
                />
                <h3 className="restaurant-category">{restaurant.category}</h3>
                <p>{restaurant.location}</p>
                <p>
                  Rating: {restaurant.rating}{" "}
                  <ImStarFull size={16} color="#ffcc00" />
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div
            className="products-details-loader-container"
            data-testid="loader"
          >
            <ClipLoader color="#0b69ff" height="50" width="50" />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
