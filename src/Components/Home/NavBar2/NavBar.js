import { Icon } from "semantic-ui-react";
import React, { useRef } from "react";
import "./NavBar.css";
import { useLocation } from 'react-router-dom';

export default function Navbar() {
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
    };

    const click = (e, targetId) => {
        if (f === 1) {
            console.log(f);
            navbar.current.style.display = "none";
            f = 0;
            i = 0;
        }

        // Prevent default anchor behavior and scroll to target
        if (targetId) {
            e.preventDefault();
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const location = useLocation();

    return (
        <header className="top">
            <div id="brand" className="brand">
                <img src="/charitylogo.png" alt="charity" />
            </div>

            {/*{
              location.pathname === "/" ?
              (
            */}
            <div className="temp">
                <nav className="navbar" id="navbar" ref={navbar}>
                    <a href="/" onClick={(e) => click(e)}>Home</a>
                    {/*<a href="#about" onClick={(e) => click(e, 'about')}>About</a>*/}
                    <a href="/leaderboards" onClick={(e) => click(e)}>Leaders</a>
                    {/*<a href="#skills" onClick={click}>Skills</a>*/}
                    {/*<a href="#contact" onClick={(e) => click(e, "footer")}>Contact</a>*/}
                    <a href="/contact" >Contact</a>
                </nav>
                <div className="sidebar" id="sidebar" ref={sidebar} onClick={show}>
                <Icon name="ellipsis vertical" />
                </div>
            </div>
            {/*//  ):(*/}
            {/*//      <div  className="brandlogin">*/}
            {/*//         <Icon name="user"/>*/}
            {/*//         </div>*/}
            {/*//     )*/}
            {/*// }*/}
        </header>
    );
}
