import { useEffect, useState } from "react";
import "./index.css";

const Profile = () => {
  const [recentOrder, setRecentOrder] = useState({
    items: [],
    timestamp: "",
  });
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserName(storedUser);
    }
    const storedOrder = JSON.parse(localStorage.getItem("recentOrder")) || {
      items: [],
      timestamp: "",
    };
    setRecentOrder(storedOrder);
  }, []);

  const handleClearAll = () => {
    const clearedOrder = { items: [], timestamp: "" };
    setRecentOrder(clearedOrder);
    localStorage.setItem("recentOrder", JSON.stringify(clearedOrder));
  };

  const calculateTotal = () => {
    return recentOrder.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="profile-container">
      <h2 className="profile-heading">Your Profile</h2>
      <h2 className="user">Welcome {userName}</h2>
      <h3 className="section-heading">Recently Ordered Items</h3>

      {recentOrder.items.length === 0 ? (
        <p className="no-orders">No recent orders.</p>
      ) : (
        <>
          <p className="order-time">
            <strong>Order Date:</strong> {recentOrder.timestamp}
          </p>

          <div className="order-list">
            {recentOrder.items.map((item, index) => (
              <div key={index} className="order-card">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="order-image"
                />
                <div className="order-info">
                  <h4 className="order-item-name">{item.name}</h4>
                  <p>
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="order-summary">
            <p className="total-amount">
              <strong>Total:</strong> ₹{calculateTotal()}
            </p>
            <button className="clear-all-button" onClick={handleClearAll}>
              Clear All Orders
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;

// import { useEffect, useState } from "react";
// import "./index.css";

// const Profile = () => {
//   const [recentOrder, setRecentOrder] = useState({
//     items: [],
//     timestamp: "",
//   });

//   useEffect(() => {
//     const storedOrder = JSON.parse(localStorage.getItem("recentOrder")) || {
//       items: [],
//       timestamp: "",
//     };
//     setRecentOrder(storedOrder);
//   }, []);

//   return (
//     <div className="profile-container">
//       <h2 className="profile-heading">Your Profile</h2>
//       <h3 className="section-heading">Recently Ordered Items</h3>

//       {recentOrder.items.length === 0 ? (
//         <p className="no-orders">No recent orders.</p>
//       ) : (
//         <>
//           <p className="order-time">
//             <strong>Order Date:</strong> {recentOrder.timestamp}
//           </p>
//           <div className="order-list">
//             {recentOrder.items.map((item, index) => (
//               <div key={index} className="order-card">
//                 <img
//                   src={item.image_url}
//                   alt={item.name}
//                   className="order-image"
//                 />
//                 <div className="order-info">
//                   <h4 className="order-item-name">{item.name}</h4>
//                   <p>
//                     ₹{item.price} × {item.quantity}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Profile;
