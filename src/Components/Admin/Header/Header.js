// import classes from "./Header.module.css";
import { Icon, Dropdown, Menu,Image } from "semantic-ui-react";
import React, { useRef } from "react";
import { useLocation } from 'react-router-dom';
// import ProfilePic from "../Profile/ProfilePic";

const Header = () => {

    const navbar = useRef(null);
    const sidebar = useRef(null);
    let i = 0, f = 0;

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
    }

    const click = () => {
        if (f === 1) {
            console.log(f);
            navbar.current.style.display = "none";
            f = 0;
            i = 0;
        }
    }

    const location = useLocation();

    return (

      <header className="top">
        <a href="/donor/home">
            <div id="brand" className="brand">
                <img src="/charitylogo.png" alt="charity"/>
            </div>
        </a>

        {
          location.pathname === "/" ?
            (<div className="temp">
            <nav className="navbar" id="navbar" ref={navbar}>
                    <a href="/donor/announcements" onClick={click}>Announcements</a>
                    <a href="#about" onClick={click}>About</a>
                    <a href="#projects" onClick={click}>Projects</a>
                    <a href="#skills" onClick={click}>Skills</a>
                    <a href="#contact" onClick={click}>Contact</a>
                </nav>
                <div className="sidebar" id="sidebar" ref={sidebar} onClick={show}>
                    <Icon name="ellipsis vertical" />
                </div>
            </div>
            )
              : 
            (
            <div className="temp">
                <nav className="navbar" id="navbar" ref={navbar}>
                    <a style={{width: "fit-content", background: "lightcyan", borderRadius: "15px"}} href="/donor/maintenance" onClick={click}>Maintenance</a>

                    <a style={{width: "fit-content"}} href="/donor/announcements"
                        onClick={click}>Announcements</a>
                    <a href="/donor/tickets" onClick={click}>Tickets</a>
                </nav>
                <div className="brandlogin">
                    <a href="/admin/account"><Icon name="user" /></a>
                </div>
            </div>
          )
        }
      </header>
    );
  };

export default Header


// export default function Navbar2() {


//     return (

//     );
// }
