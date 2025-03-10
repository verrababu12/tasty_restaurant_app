import React, { useState, useContext } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import CartContext from "../../context/CartContext";
import { IoMdMenu } from "react-icons/io";
import { MdClose } from "react-icons/md";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cartList } = useContext(CartContext) || { cartList: [] };

  const onHandleLogout = () => {
    localStorage.removeItem("jwt_token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img
          src="https://res.cloudinary.com/daehuqvdc/image/upload/v1706255502/lzobc0ww5uesw4wxregm.png"
          alt="logo"
        />
        <h1 className="heading-tasty">Tasty Kitchens</h1>
      </div>
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? (
          <MdClose size={30} color="white" />
        ) : (
          <IoMdMenu size={30} color="white" />
        )}
      </div>
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/cart">
            Cart
            {cartList.length > 0 && (
              <span className="cart-count-badge">{cartList.length}</span>
            )}
          </Link>
        </li>
        <button type="button" onClick={onHandleLogout} className="logout-btn">
          Logout
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;

// import React, { useState, useContext } from "react";
// import "./index.css";
// import { useHistory } from "react-router-dom";
// import CartContext from "../../context/CartContext";
// import { IoMdMenu } from "react-icons/io";
// import { MdClose } from "react-icons/md";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const history = useHistory();
//   const { cartList } = useContext(CartContext);

//   const onHandleLogout = () => {
//     localStorage.removeItem("jwt_token");
//     history.push("/");
//   };

//   return (
//     <nav className="navbar">
//       <div className="logo-container">
//         <img
//           src="https://res.cloudinary.com/daehuqvdc/image/upload/v1706255502/lzobc0ww5uesw4wxregm.png"
//           alt="logo"
//         />
//         <h1 className="heading-tasty">Tasty Kitchens</h1>
//       </div>
//       <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
//         {menuOpen ? (
//           <MdClose size={30} color="white" />
//         ) : (
//           <IoMdMenu size={30} color="white" />
//         )}
//       </div>
//       <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
//         <li>
//           <a href="/home">Home</a>
//         </li>
//         <li>
//           <a href="/cart">
//             Cart
//             {cartList.length > 0 && (
//               <span className="cart-count-badge">{cartList.length}</span>
//             )}
//           </a>
//         </li>
//         <button type="button" onClick={onHandleLogout} className="logout-btn">
//           Logout
//         </button>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
