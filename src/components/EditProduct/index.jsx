import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./index.css";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    category: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoized fetch function
  const fetchProductDetails = useCallback(async () => {
    try {
      const response = await fetch(
        `https://restaurant-mern-backend.onrender.com/api/products/${id}`
      );
      const data = await response.json();

      console.log("Fetched Product Data:", data); // Debugging log

      if (response.ok) {
        setProduct(data.restaurant);
      } else {
        setError("Product data not found.");
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      setError("Failed to fetch product details.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  const handleChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("jwt_token"); // Get token from localStorage

    if (!token) {
      alert("Unauthorized: Please log in first.");
      return;
    }

    try {
      const response = await fetch(
        `https://restaurant-mern-backend.onrender.com/api/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token
          },
          body: JSON.stringify(product),
        }
      );

      if (response.ok) {
        alert("Product updated successfully!");
        navigate("/admin-dashboard");
      } else {
        alert("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("An error occurred while updating the product.");
    }
  };

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="edit-product-container">
      <h2>Edit Product</h2>
      <form onSubmit={handleUpdate}>
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={product?.category ?? ""}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={product?.description ?? ""}
          onChange={handleChange}
          required
        />

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;

// import { useEffect, useState, useCallback } from "react";
// import { useParams, useHistory } from "react-router-dom";

// const EditProduct = () => {
//   const { id } = useParams();
//   const history = useHistory();

//   const [product, setProduct] = useState({
//     category: "",
//     description: "",
//     price: "",
//   });

//   // Memoized fetch function
//   const fetchProductDetails = useCallback(async () => {
//     try {
//       const response = await fetch(
//         `https://restaurant-mern-backend.onrender.com/api/products/${id}`
//       );
//       const data = await response.json();

//       if (data.success) {
//         setProduct(data.product);
//       }
//     } catch (error) {
//       console.error("Error fetching product details:", error);
//     }
//   }, [id]); // id is a dependency

//   useEffect(() => {
//     fetchProductDetails();
//   }, [fetchProductDetails]); // Now fetchProductDetails is stable

//   const handleChange = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(
//         `https://restaurant-mern-backend.onrender.com/api/products/${id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(product),
//         }
//       );

//       if (response.ok) {
//         alert("Product updated successfully!");
//         history.push("/admin-dashboard");
//       } else {
//         alert("Failed to update product.");
//       }
//     } catch (error) {
//       console.error("Error updating product:", error);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2>Edit Product</h2>
//       <form onSubmit={handleUpdate}>
//         <label>Category:</label>
//         <input
//           type="text"
//           name="category"
//           value={product.category}
//           onChange={handleChange}
//           required
//         />

//         <label>Description:</label>
//         <input
//           type="text"
//           name="description"
//           value={product.description}
//           onChange={handleChange}
//           required
//         />

//         <label>Price:</label>
//         <input
//           type="number"
//           name="price"
//           value={product.price}
//           onChange={handleChange}
//           required
//         />

//         <button type="submit">Update Product</button>
//       </form>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: "400px",
//     margin: "0 auto",
//     padding: "20px",
//     border: "1px solid #ddd",
//     borderRadius: "5px",
//     backgroundColor: "#f9f9f9",
//   },
// };

// export default EditProduct;
