import "./HeaderCmp.css";
import { Icon, Dropdown, Menu, Image, Button } from "semantic-ui-react";
import React, { useRef, useContext, useState } from "react";
import { UserContext } from "../../../Components/Home/UserConext/UserContext.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ButtonToggle = ({ children }) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive((prevActive) => !prevActive);
  };

  return (
    <Button toggle active={active} onClick={handleClick}>
      {children}
    </Button>
  );
};

// export default ButtonToggle

const HeaderCmp = () => {
  const navbar = useRef(null);
  const sidebar = useRef(null);
  let i = 0,
    f = 0;

  const show = () => {
    if (i === 0) {
      navbar.current.style.display = "flex";
      i = 1;
      f = 1;
    } else {
      navbar.current.style.display = "none";
      i = 0;
      f = 0;
    }
  };

  const click = () => {
    if (f === 1) {
      console.log(f);
      navbar.current.style.display = "none";
      f = 0;
      i = 0;
    }
  };

  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { user, userDetails } = useContext(UserContext);
  const admin = userDetails;

  const axiosInstance = axios.create({
    baseURL: "http://localhost:9013",
    withCredentials: true,
  });

  const LogoutButton = ({ children }) => (
    <div>
      <Button negative onClick={handleLogout}>
        {children}
      </Button>
    </div>
  );

  const handleLogout = async () => {
    try {
      console.log("handlelogout in");
      await axiosInstance.get("/signout");
      setUser(null);
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="top">
      <Link to={"/admin/home"}>
        <div id="brand" className="brand">
          <img src="/charitylogo.png" alt="charity" />
        </div>
      </Link>

      {location.pathname === "/" ? (
        <div className="temp">
          <nav className="navbar" id="navbar" ref={navbar}>
            {/* <a href="/donor/announcements" onClick={click}>Announcements</a> */}
            <a href="#about" onClick={click}>
              About
            </a>
            <a href="#projects" onClick={click}>
              Projects
            </a>
            <a href="#skills" onClick={click}>
              Skills
            </a>
            <a href="#contact" onClick={click}>
              Contact
            </a>
          </nav>
          <div className="sidebar" id="sidebar" ref={sidebar} onClick={show}>
            <Icon name="ellipsis vertical" />
          </div>
        </div>
      ) : (
        <div className="loggedGroup">
          <Link to={"/admin/account"}>
            <Icon name="user" size="large" />
          </Link>
          <ButtonToggle children={"Announcements"} />
          <ButtonToggle children={"Tickets"} />
          <LogoutButton children={"Logout"} />
        </div>
      )}
    </header>
  );
};

export default HeaderCmp;
