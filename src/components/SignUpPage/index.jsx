import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "./index.css";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitError, showSubmitError] = useState(false);
  const [nameError, setNameError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const onChangingName = (event) => {
    setName(event.target.value);
  };

  const onChangingEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangingPassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeBlur = () => {
    if (name.trim() === "") {
      setNameError("*Name is required");
    } else {
      setNameError("");
    }
  };

  const onChangeEmailBlur = () => {
    if (email.trim() === "") {
      setEmailError("*Email is required");
    } else if (!validateEmail(email)) {
      setEmailError("*Enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const onChangePasswordBlur = () => {
    if (password.trim() === "") {
      setPasswordError("*Password is required");
    } else if (!validatePassword(password)) {
      setPasswordError(
        "*Password must be at least 8 characters with an uppercase letter, lowercase letter, number, and special character."
      );
    } else {
      setPasswordError("");
    }
  };

  const renderNameField = () => (
    <>
      <label htmlFor="name" className="input-label">
        NAME
      </label>
      <input
        className="input-field"
        type="text"
        id="name"
        value={name}
        onChange={onChangingName}
        onBlur={onChangeBlur}
      />
      {nameError && (
        <p className="error-text" style={{ color: "red", textAlign: "left" }}>
          {nameError}
        </p>
      )}
    </>
  );

  const renderEmailField = () => (
    <>
      <label htmlFor="email" className="input-label">
        EMAIL
      </label>
      <input
        id="email"
        className="input-field"
        type="text"
        value={email}
        onChange={onChangingEmail}
        onBlur={onChangeEmailBlur}
      />
      {emailError && (
        <p className="error-text" style={{ color: "red", textAlign: "left" }}>
          {emailError}
        </p>
      )}
    </>
  );

  const renderPasswordField = () => (
    <>
      <label htmlFor="password" className="input-label">
        PASSWORD
      </label>
      <div className="password-input-container">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={onChangingPassword}
          className="input-field"
          onBlur={onChangePasswordBlur}
        />
        <span
          className="toggle-password-icon"
          onClick={() => setShowPassword((prev) => !prev)}
          style={{ cursor: "pointer" }}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      {passwordError && (
        <p className="error-text" style={{ color: "red", textAlign: "left" }}>
          {passwordError}
        </p>
      )}
    </>
  );

  const onSubmitForm = async (event) => {
    event.preventDefault();

    // Validation
    if (name.trim() === "") {
      setNameError("*Name is required");
      return;
    }
    if (email.trim() === "") {
      setEmailError("*Email is required");
      return;
    } else if (!validateEmail(email)) {
      setEmailError("*Enter a valid email address");
      return;
    }
    if (password.trim() === "") {
      setPasswordError("*Password is required");
      return;
    } else if (!validatePassword(password)) {
      setPasswordError("*Password must be at least 8 characters...");
      return;
    }

    setLoading(true);

    try {
      const userDetails = { name, email, password };
      const response = await fetch(
        "https://my-restaurant-project-backend.onrender.com/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userDetails),
        }
      );

      if (response.ok) {
        navigate("/login");
      } else {
        const data = await response.json();
        showSubmitError(data.message || true);
      }
    } catch (error) {
      console.error("Error:", error);
      showSubmitError(true);
    } finally {
      setLoading(false); // ALWAYS runs
    }
  };

  return (
    <div className="background-container">
      <form className="card-container" onSubmit={onSubmitForm}>
        <h1 className="heading">SignUp</h1>
        <div className="input-container">{renderNameField()}</div>
        <br />
        <div className="input-container">{renderEmailField()}</div>
        <br />
        <div className="input-container">{renderPasswordField()}</div>
        <br />
        <button type="submit" className="signup-btn" disabled={loading}>
          {loading ? "Signing up..." : "SignUp"}
        </button>
        {submitError && <p className="error-text">*Bad Request</p>}
        <p>Already have an account?</p>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <button type="button" className="login-btn">
            Login
          </button>
        </Link>
        {loading && (
          <div className="loader-overlay">
            <div className="loader"></div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SignUpPage;
