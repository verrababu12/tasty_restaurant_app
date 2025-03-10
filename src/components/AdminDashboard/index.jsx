import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css"; // Import CSS file

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem("jwt_token");

    if (!token) {
      console.warn("No token found! Please log in.");
      setError("Authorization required to fetch users.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://restaurant-mern-backend.onrender.com/api/users",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users.");
      }

      const data = await response.json();
      setUsers(data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://restaurant-mern-backend.onrender.com/api/products"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products.");
      }

      const data = await response.json();
      console.log(data);
      setProducts(data.restaurants || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (productId) => {
    const token = localStorage.getItem("jwt_token");
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const response = await fetch(
        `https://restaurant-mern-backend.onrender.com/api/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Product deleted successfully!");
        setProducts((prev) =>
          prev.filter((product) => product._id !== productId)
        );
      } else {
        throw new Error("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const makeAdmin = async (userId) => {
    const token = localStorage.getItem("jwt_token");

    if (!token) {
      alert("Authorization required.");
      return;
    }

    try {
      const response = await fetch(
        `https://restaurant-mern-backend.onrender.com/api/users/${userId}/make-admin`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(`${data.message}`);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, role: "admin" } : user
          )
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error making user admin:", error);
      alert("Failed to update user role.");
    }
  };

  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-title">Admin Dashboard</h2>
      <Link to="/add-product" style={{ textDecoration: "none" }}>
        <button className="add-product-btn">Add New Product</button>
      </Link>
      {loading && <p className="loading-text">Loading...</p>}
      {/* Users List */}
      <div className="dashboard-section">
        <h3>Users</h3>
        {error ? (
          <p className="error-text">{error}</p>
        ) : users.length > 0 ? (
          <ul className="user-list">
            {users.map((user) => (
              <li key={user._id} className="user-item">
                {user.name} ({user.email}) - Role: {user.role}
                {user.role !== "admin" && (
                  <button
                    className="make-admin-btn"
                    onClick={() => makeAdmin(user._id)}
                  >
                    Make Admin
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-data-text">No users found.</p>
        )}
      </div>
      {/* Products List */}
      <div className="dashboard-section">
        <h3>Products</h3>
        {products.length > 0 ? (
          <ul>
            {products.map((product) => (
              <li key={product._id} className="product-item">
                <span>
                  {product.category} - {product.description}
                </span>
                <div className="button-container">
                  <Link to={`/edit-product/${product._id}`}>
                    <button className="editButton">Edit</button>
                  </Link>
                  <button
                    className="deleteButton"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-data-text">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchUsers();
//     fetchProducts();
//   }, []);

//   const fetchUsers = async () => {
//     const token = localStorage.getItem("jwt_token");

//     if (!token) {
//       console.warn("No token found! Please log in.");
//       setError("Authorization required to fetch users.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch(
//         "https://restaurant-mern-backend.onrender.com/api/users",
//         {
//           method: "GET",
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch users.");
//       }

//       const data = await response.json();
//       console.log(data);
//       setUsers(data || []);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch(
//         "https://restaurant-mern-backend.onrender.com/api/products"
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch products.");
//       }

//       const data = await response.json();
//       setProducts(data.restaurants || []);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const deleteProduct = async (productId) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) {
//       return;
//     }

//     try {
//       const response = await fetch(
//         `https://restaurant-mern-backend.onrender.com/api/products/${productId}`,
//         { method: "DELETE" }
//       );

//       if (response.ok) {
//         alert("Product deleted successfully!");
//         setProducts((prev) =>
//           prev.filter((product) => product._id !== productId)
//         );
//       } else {
//         throw new Error("Failed to delete product.");
//       }
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   // 🔹 Function to promote user to admin
//   const makeAdmin = async (userId) => {
//     const token = localStorage.getItem("jwt_token");

//     if (!token) {
//       alert("Authorization required.");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `https://restaurant-mern-backend.onrender.com/api/users/${userId}/make-admin`,
//         {
//           method: "PUT",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         alert(`${data.message}`);
//         setUsers((prevUsers) =>
//           prevUsers.map((user) =>
//             user._id === userId ? { ...user, role: "admin" } : user
//           )
//         );
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error("Error making user admin:", error);
//       alert("Failed to update user role.");
//     }
//   };

//   return (
//     <div>
//       <h2 style={{ textAlign: "center", marginTop: "20px" }}>
//         Admin Dashboard
//       </h2>
//       <Link to="/add-product">
//         <button>Add New Product</button>
//       </Link>

//       {loading && <p>Loading...</p>}

//       {/* Users List */}
//       <div style={styles.container}>
//         <h3>Users</h3>
//         {error ? (
//           <p style={{ color: "red" }}>{error}</p>
//         ) : users.length > 0 ? (
//           <ul>
//             {users.map((user) => (
//               <li key={user._id}>
//                 {user.name} ({user.email}) - Role: {user.role}
//                 {user.role !== "admin" && (
//                   <button
//                     style={styles.makeAdminButton}
//                     onClick={() => makeAdmin(user._id)}
//                   >
//                     Make Admin
//                   </button>
//                 )}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No users found.</p>
//         )}
//       </div>

//       {/* Products List */}
//       <div style={styles.container}>
//         <h3>Products</h3>
//         {products.length > 0 ? (
//           <ul>
//             {products.map((product) => (
//               <li key={product._id}>
//                 {product.category} - {product.description}
//                 <Link to={`/edit-product/${product._id}`}>
//                   <button style={styles.editButton}>Edit</button>
//                 </Link>
//                 <button
//                   style={styles.deleteButton}
//                   onClick={() => deleteProduct(product._id)}
//                 >
//                   Delete
//                 </button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No products found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     border: "1px solid #ddd",
//     padding: "10px",
//     margin: "10px",
//     borderRadius: "5px",
//   },
//   makeAdminButton: {
//     marginLeft: "10px",
//     padding: "5px 10px",
//     backgroundColor: "green",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
//   deleteButton: {
//     marginLeft: "10px",
//     padding: "5px 10px",
//     backgroundColor: "red",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
// };

// export default AdminDashboard;

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]); // Default empty array
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchUsers();
//     fetchProducts();
//   }, []);

//   const fetchUsers = async () => {
//     const token = localStorage.getItem("jwt_token");

//     if (!token) {
//       console.warn("No token found! Please log in.");
//       setError("Authorization required to fetch users.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch(
//         "https://restaurant-mern-backend.onrender.com/api/users",
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch users.");
//       }

//       const data = await response.json();
//       console.log(data);
//       setUsers(data || []);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch(
//         "https://restaurant-mern-backend.onrender.com/api/products"
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch products.");
//       }

//       const data = await response.json();
//       console.log(data);
//       setProducts(data.restaurants || []);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const deleteProduct = async (productId) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) {
//       return;
//     }

//     try {
//       const response = await fetch(
//         `https://restaurant-mern-backend.onrender.com/api/products/${productId}`,
//         {
//           method: "DELETE",
//         }
//       );

//       if (response.ok) {
//         alert("Product deleted successfully!");
//         setProducts((prev) =>
//           prev.filter((product) => product._id !== productId)
//         );
//       } else {
//         throw new Error("Failed to delete product.");
//       }
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   return (
//     <div>
//       <h2 style={{ textAlign: "center", marginTop: "20px" }}>
//         Admin Dashboard
//       </h2>
//       <Link to="/add-product">
//         <button>Add New Product</button>
//       </Link>

//       {loading && <p>Loading...</p>}

//       {/* Users List */}
//       <div style={styles.container}>
//         <h3>Users</h3>
//         {error ? (
//           <p style={{ color: "red" }}>{error}</p>
//         ) : users.length > 0 ? (
//           <ul>
//             {users.map((user) => (
//               <li key={user._id}>
//                 {user.name} ({user.email})
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No users found.</p>
//         )}
//       </div>

//       {/* Products List */}
//       <div style={styles.container}>
//         <h3>Products</h3>
//         {products.length > 0 ? (
//           <ul>
//             {products.map((product) => (
//               <li key={product._id}>
//                 {product.category} - {product.description}
//                 {/* Edit Button */}
//                 <Link to={`/edit-product/${product._id}`}>
//                   <button style={styles.editButton}>Edit</button>
//                 </Link>
//                 <button
//                   style={styles.deleteButton}
//                   onClick={() => deleteProduct(product._id)}
//                 >
//                   Delete
//                 </button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No products found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     border: "1px solid #ddd",
//     padding: "10px",
//     margin: "10px",
//     borderRadius: "5px",
//   },
//   deleteButton: {
//     marginLeft: "10px",
//     padding: "5px 10px",
//     backgroundColor: "red",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
// };

// export default AdminDashboard;

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../Navbar";

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetchUsers();
//     fetchProducts();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await fetch(
//         "https://restaurant-mern-backend.onrender.com/api/users"
//       );
//       const data = await response.json();
//       if (data.success) {
//         setUsers(data.users);
//       }
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch(
//         "https://restaurant-mern-backend.onrender.com/api/products"
//       );
//       const data = await response.json();
//       if (data.success) {
//         setProducts(data.products);
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const handleDeleteProduct = async (productId) => {
//     try {
//       await fetch(
//         `https://restaurant-mern-backend.onrender.com/api/products/${productId}`,
//         {
//           method: "DELETE",
//         }
//       );
//       setProducts(products.filter((product) => product._id !== productId));
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <h2>Admin Dashboard</h2>
//       <Link to="/add-product">
//         <button>Add New Product</button>
//       </Link>

//       <h3>Users List</h3>
//       <ul>
//         {users.map((user) => (
//           <li key={user._id}>
//             {user.name} ({user.email})
//           </li>
//         ))}
//       </ul>

//       <h3>Products List</h3>
//       <ul>
//         {products.map((product) => (
//           <li key={product._id}>
//             {product.name} - {product.price}
//             <button onClick={() => handleDeleteProduct(product._id)}>
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AdminDashboard;
