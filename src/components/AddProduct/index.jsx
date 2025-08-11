import { useState } from "react";
import "./index.css";

const AddProduct = () => {
  const [restaurant, setRestaurant] = useState({
    title: "",
    description: "",
    image_url: "",
    rating: "",
    category: "",
    location: "",
    tags: [],
    food_items: [],
  });

  const [foodItem, setFoodItem] = useState({
    name: "",
    description: "",
    image_url: "",
    price: "",
  });

  const handleChange = (e) => {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
  };

  const handleTagChange = (e) => {
    setRestaurant({ ...restaurant, tags: e.target.value.split(",") });
  };

  const handleFoodChange = (e) => {
    setFoodItem({ ...foodItem, [e.target.name]: e.target.value });
  };

  const addFoodItem = () => {
    if (foodItem.name && foodItem.price) {
      setRestaurant({
        ...restaurant,
        food_items: [...restaurant.food_items, foodItem],
      });
      setFoodItem({ name: "", description: "", image_url: "", price: "" });
    } else {
      alert("Food name and price are required!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://my-restaurant-project-backend.onrender.com/api/products/add-products",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(restaurant),
        }
      );

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("Restaurant added successfully!");
        setRestaurant({
          title: "",
          description: "",
          image_url: "",
          rating: "",
          category: "",
          location: "",
          tags: [],
          food_items: [],
        });
      } else {
        alert("Failed to add restaurant: " + data.message);
      }
    } catch (error) {
      console.error("Error adding restaurant:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Add New Restaurant</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={restaurant.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={restaurant.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={restaurant.image_url}
          onChange={handleChange}
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={restaurant.rating}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={restaurant.category}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={restaurant.location}
          onChange={handleChange}
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={restaurant.tags.join(",")}
          onChange={handleTagChange}
        />

        <h3>Add Food Items</h3>
        <input
          type="text"
          name="name"
          placeholder="Food Name"
          value={foodItem.name}
          onChange={handleFoodChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Food Description"
          value={foodItem.description}
          onChange={handleFoodChange}
        />
        <input
          type="text"
          name="image_url"
          placeholder="Food Image URL"
          value={foodItem.image_url}
          onChange={handleFoodChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Food Price"
          value={foodItem.price}
          onChange={handleFoodChange}
        />
        <button type="button" onClick={addFoodItem} className="add-button">
          + Add Food Item
        </button>

        <h4>Added Food Items:</h4>
        <ul className="food-list">
          {restaurant.food_items.map((item, index) => (
            <li key={index}>
              {item.name} - ₹{item.price}
            </li>
          ))}
        </ul>
        <button type="submit" className="submit-button">
          Add Restaurant
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

// import { useState } from "react";

// const AdminAddRestaurant = () => {
//   const [restaurant, setRestaurant] = useState({
//     title: "",
//     description: "",
//     image_url: "",
//     rating: "",
//     category: "",
//     location: "",
//     tags: [],
//     food_items: [],
//   });

//   const [foodItem, setFoodItem] = useState({
//     name: "",
//     description: "",
//     image_url: "",
//     price: "",
//   });

//   const handleChange = (e) => {
//     setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
//   };

//   const handleTagChange = (e) => {
//     setRestaurant({ ...restaurant, tags: e.target.value.split(",") });
//   };

//   const handleFoodChange = (e) => {
//     setFoodItem({ ...foodItem, [e.target.name]: e.target.value });
//   };

//   const addFoodItem = () => {
//     if (foodItem.name && foodItem.price) {
//       setRestaurant({
//         ...restaurant,
//         food_items: [...restaurant.food_items, foodItem],
//       });
//       setFoodItem({ name: "", description: "", image_url: "", price: "" });
//     } else {
//       alert("Food name and price are required!");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // const token = localStorage.getItem("jwt_token");
//     // if (!token) {
//     //   alert("Unauthorized: Please log in first.");
//     //   return;
//     // }

//     try {
//       const response = await fetch(
//         "https://restaurant-mern-backend.onrender.com/api/add-products",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(restaurant),
//         }
//       );

//       const data = await response.json();
//       console.log(data);

//       if (response.ok) {
//         alert("Restaurant added successfully!");
//         setRestaurant({
//           title: "",
//           description: "",
//           image_url: "",
//           rating: "",
//           category: "",
//           location: "",
//           tags: [],
//           food_items: [],
//         });
//       } else {
//         alert("Failed to add restaurant: " + data.message);
//       }
//     } catch (error) {
//       console.error("Error adding restaurant:", error);
//     }
//   };

//   return (
//     <div>
//       <h2 style={{ textAlign: "center", marginTop: "20px" }}>
//         Add New Restaurant
//       </h2>
//       <form onSubmit={handleSubmit} style={styles.container}>
//         <input
//           type="text"
//           name="title"
//           placeholder="Title"
//           value={restaurant.title}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="description"
//           placeholder="Description"
//           value={restaurant.description}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="image_url"
//           placeholder="Image URL"
//           value={restaurant.image_url}
//           onChange={handleChange}
//         />
//         <input
//           type="number"
//           name="rating"
//           placeholder="Rating"
//           value={restaurant.rating}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="category"
//           placeholder="Category"
//           value={restaurant.category}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="location"
//           placeholder="Location"
//           value={restaurant.location}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="tags"
//           placeholder="Tags (comma separated)"
//           value={restaurant.tags.join(",")}
//           onChange={handleTagChange}
//         />

//         <h3>Add Food Items</h3>
//         <input
//           type="text"
//           name="name"
//           placeholder="Food Name"
//           value={foodItem.name}
//           onChange={handleFoodChange}
//         />
//         <input
//           type="text"
//           name="description"
//           placeholder="Food Description"
//           value={foodItem.description}
//           onChange={handleFoodChange}
//         />
//         <input
//           type="text"
//           name="image_url"
//           placeholder="Food Image URL"
//           value={foodItem.image_url}
//           onChange={handleFoodChange}
//         />
//         <input
//           type="number"
//           name="price"
//           placeholder="Food Price"
//           value={foodItem.price}
//           onChange={handleFoodChange}
//         />
//         <button type="button" onClick={addFoodItem} style={styles.addButton}>
//           + Add Food Item
//         </button>

//         <h4>Added Food Items:</h4>
//         <ul>
//           {restaurant.food_items.map((item, index) => (
//             <li key={index}>
//               {item.name} - ₹{item.price}
//             </li>
//           ))}
//         </ul>
//         <button type="submit" style={styles.submitButton}>
//           Add Restaurant
//         </button>
//       </form>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "10px",
//     width: "50%",
//     margin: "auto",
//   },
//   addButton: {
//     backgroundColor: "#28a745",
//     color: "white",
//     padding: "10px",
//     border: "none",
//     cursor: "pointer",
//   },
//   submitButton: {
//     backgroundColor: "#007bff",
//     color: "white",
//     padding: "10px",
//     border: "none",
//     cursor: "pointer",
//   },
// };

// export default AdminAddRestaurant;
