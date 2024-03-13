import React, { useEffect, useState } from "react";
import Image from "../assets/image.png";
import Logo from "../assets/metafiser.png";
// import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [ token, setToken ] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const navigate = useNavigate();


  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    let cid = e.target.cid.value;
  
    // Check if either email/password or CID is provided
    if ((email && password) || cid) {
      const formData = {
        email,
        password,
        cid
      };
      try {
        // If email/password is provided, verify credentials
        if (email && password) {
          const response = await axios.post(
            "http://api.acods.cloud/api/v1/login",
            formData
          );
          localStorage.setItem('auth', JSON.stringify(response.data.token));
          toast.success("Verification successful");
          navigate("/dashboard");
        } else if (cid) { // If CID is provided, check against the certificate database
          const certificateResponse = await axios.get(
            `http://api.acods.cloud/api/v1/certificates/${cid}`
          );
          console.log("Response isss");
          console.log(certificateResponse.data.certificate.certificateURl);
          if (certificateResponse.data) {
            window.location.href = certificateResponse.data.certificate.certificateURl;
          } else {
            toast.error("Certificate not found for the provided CID");
          }
        }
      } catch (err) {
        console.error(err);
        toast.error(err.message);
      }
    } else {
      toast.error("Please fill either email and password or CID");
    }
  };
  
  

  // const handleLoginSubmit = async (e) => {
  //   e.preventDefault();
  //   let email = e.target.email.value;
  //   let password = e.target.password.value;

  //   if (email.length > 0 && password.length > 0) {
  //     const formData = {
  //       email,
  //       password,
  //     };
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:3000/api/v1/login",
  //         formData
  //       );
  //       localStorage.setItem('auth', JSON.stringify(response.data.token));
  //       toast.success("Verification successfull");
  //       navigate("/dashboard");
  //     } catch (err) {
  //       console.log(err);
  //       toast.error(err.message);
  //     }
  //   } else {
  //     toast.error("Please fill all inputs");
  //   }
  // };

  useEffect(() => {
    if(token !== ""){
      toast.success("You already logged in");
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="" />
          </div>
          <div className="login-center">
            <h2>Verify your credentials!</h2>
            <p>Please enter your correct details</p>
            <form onSubmit={handleLoginSubmit}>
              <input type="email" placeholder="Email" name="email" />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                />
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => {
                      setshowPassword(!showPassword);
                    }}
                  />
                ) : (
                  <FaEye
                    onClick={() => {
                      setshowPassword(!showPassword);
                    }}
                  />
                )}
              </div>
              <div>
                <p>OR</p>
                <input
                  type="text"
                  placeholder="CID"
                  name="cid"
                />
              </div>

              <div className="login-center-options">
                <div className="remember-div">
                  <input type="checkbox" id="remember-checkbox" />
                  <label htmlFor="remember-checkbox">
                    Save info
                  </label>
                </div>
                <a href="#" className="forgot-pass-link">
                  Forgot password?
                </a>
              </div>
              <div className="login-center-buttons">
                <button type="submit">Log In</button>
                {/* <button type="submit">
                  <img src={GoogleSvg} alt="" />
                  Log In with Google
                </button> */}
              </div>
            </form>
          </div>

          {/* <p className="login-bottom-p">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
