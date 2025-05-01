import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { ImStarFull } from "react-icons/im";
import CarouselPage from "../CarouselPage";
import { ClipLoader } from "react-spinners";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./index.css";

const UserDashboard = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0); // Store total item count
  const [totalPages, setTotalPages] = useState(1); // Store total page count

  const fetchRestaurants = useCallback(async () => {
    try {
      const response = await fetch(
        `https://restaurant-mern-backend.onrender.com/api/products?page=${currentPage}&limit=6&sort=${sortOrder}`
      );
      const data = await response.json();
      console.log(data);

      if (data.success && Array.isArray(data.restaurants)) {
        setRestaurants(data.restaurants);
        setTotalItems(data.totalCount); // Assuming API returns totalCount
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  }, [currentPage, sortOrder]);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  useEffect(() => {
    if (totalItems > 0) {
      const pages = Math.ceil(totalItems / 6); // 6 is the limit per page
      setTotalPages(pages);
    }
  }, [totalItems]);

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="user-bg-container">
      <Navbar />
      <CarouselPage />
      <h2 className="restaurants-heading">Popular Restaurants</h2>

      {/* Search */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search Restaurant..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Sorting */}
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

      {/* Grid */}
      <div className="restaurants-grid">
        {restaurants.length === 0 ? (
          <div
            className="products-details-loader-container"
            data-testid="loader"
          >
            <ClipLoader color="#0b69ff" height={50} width={50} />
          </div>
        ) : filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <Link
              to={`/restaurant/${restaurant._id}`}
              key={restaurant._id}
              className="restaurant-link"
            >
              <div className="restaurant-card-user">
                <img
                  src={restaurant.image_url}
                  alt="restaurant"
                  className="restaurant-image-users"
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
          <div className="no-results-container">
            <p className="no-results-text">No results found.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination-buttons">
        {currentPage > 1 && (
          <button onClick={() => goToPage(currentPage - 1)}>
            <FiChevronLeft />
          </button>
        )}
        <span>
          Page {currentPage} of {totalPages}
        </span>
        {currentPage < totalPages && (
          <button onClick={() => goToPage(currentPage + 1)}>
            <FiChevronRight />
          </button>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboard;
