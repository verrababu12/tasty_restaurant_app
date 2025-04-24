import { Link } from "react-router-dom";

import "./index.css";

const NotFound = () => (
  <>
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/daehuqvdc/image/upload/v1713173243/Group_gnrbgs.png"
        alt="not found"
        className="not-found-image"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-text">
        we are sorry, the page you requested could not be found <br /> Please go
        back to the homepage
      </p>
      <Link to="/">
        <button type="button" className="home-btn">
          Home Page
        </button>
      </Link>
    </div>
  </>
);

export default NotFound;
