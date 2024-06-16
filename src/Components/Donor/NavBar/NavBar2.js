import { Icon, Dropdown, Menu } from "semantic-ui-react";
import React, { useRef } from "react";
import "./NavBar.css";
import { useLocation } from 'react-router-dom';

export default function Navbar2() {
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
            <div id="brand" className="brand">
                <img src="../../../../public/charitylogo.png" alt="charity" />
            </div>

            {
                location.pathname === "/" ?
                    (<div className="temp">
                        <nav className="navbar" id="navbar" ref={navbar}>
                            <a href="#home" onClick={click}>Home</a>
                            <a href="#about" onClick={click}>About</a>
                            <Dropdown text='More' pointing className='link item'>
                                <Dropdown.Menu>
                                    <Dropdown.Item as='a' href="#tickets" onClick={click}>Tickets</Dropdown.Item>
                                    <Dropdown.Item as='a' href="#announcement" onClick={click}>Announcement</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <a href="#projects" onClick={click}>Projects</a>
                            <a href="#skills" onClick={click}>Skills</a>
                            <a href="#contact" onClick={click}>Contact</a>
                        </nav>
                        <div className="sidebar" id="sidebar" ref={sidebar} onClick={show}>
                            <Icon name="ellipsis vertical" />
                        </div>
                    </div>) : (
                        <div className="temp">
                            <nav className="navbar" id="navbar" ref={navbar}>
                                <a href="#home" onClick={click}>Home</a>
                                <a href="#about" onClick={click}>About</a>
                                <Dropdown  text='More' pointing className='link item'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as='a' href="#tickets" onClick={click}>Tickets</Dropdown.Item>
                                        <Dropdown.Item as='a' href="#announcement" onClick={click}>Announcement</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </nav>
                            <div className="brandlogin">
                                <Icon name="user" />
                            </div>
                        </div>
                    )
            }
        </header>
    );
}
