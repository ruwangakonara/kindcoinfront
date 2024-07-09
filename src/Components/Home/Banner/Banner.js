import React, { useEffect, useState,useRef } from 'react';
import "./Banner.css";
import { useNavigate} from "react-router-dom";

const images = ["https://cdn.pixabay.com/photo/2017/07/15/19/37/india-2507482__480.jpg","https://cdn.pixabay.com/photo/2016/03/27/19/20/indian-1283789_1280.jpg","https://cdn.pixabay.com/photo/2018/07/19/08/51/old-man-3548098__340.jpg"]
const delay = 3500;
function Banner() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

    useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  const navigate = useNavigate();

    return(
        <header className="banner"
         style={{
             backgroundImage: `linear-gradient(rgb(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url(${images[index]})`,
             transition: `all 0.8s ease-in-out`
         }}>
            <div className="banner__contents">
                <h1 style={{ fontSize : 30}} className="banner__title">
                Donation App
                </h1>
                <p> Login/Signup as</p>
            <div className="banner__buttons">
                <button style={{ fontSize : 30}} className="banner__button" onClick={()=>navigate("/beneficiary_registration")}>Register To Ask For Help</button>
                <button style={{ fontSize : 30}} className="banner__button"  onClick={()=>navigate("/login/login")}>Sign In</button>
            </div>
            <h1 className="banner__description">
            Welcome to Our Donation App
            </h1>
            </div>
            {/* <div className="banner--fadeBottom"/> */}
        </header>
  
    );
}

export default Banner