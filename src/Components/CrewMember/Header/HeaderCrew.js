import { Icon, Dropdown, Menu } from "semantic-ui-react";
import React, { useRef } from "react";
import "./HeaderCrew.css";
import { Link, useLocation } from 'react-router-dom';

export default function HeaderCrew() {
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

    return (
        <header className="top">
            <a href="/crew/home">
                <div id="brand" className="brand">
                    <img src="/charitylogo.png" alt="charity" />
                </div>
            </a>

            <div className="temp">
                <Dropdown
                    className="brandlogin"
                    trigger={<Icon name="user" />}
                    pointing="top right"
                    icon={null}
                >
                    <Dropdown.Menu>
                        <Dropdown.Item text="Profile" icon="user" as={Link} to="/crew/profile"/>
                        <Dropdown.Item text="Logout" icon="sign-out" as={Link} to="/" onClick={click} />
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </header>
    );
}
