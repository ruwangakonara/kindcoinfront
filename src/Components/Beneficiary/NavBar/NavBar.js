import { Icon, Dropdown, Menu } from "semantic-ui-react";
import React, {useContext, useEffect, useRef, useState} from "react";
import "./NavBar.css";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import {UserContext} from "../../Home/UserConext/UserContext";
import {useNavigate} from "react-router-dom";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});

export default function Navbar() {
    const { user, userDetails } = useContext(UserContext);

    const navigate = useNavigate()

    useEffect(() => {
        if(user.status !==  "beneficiary"){
            navigate("/login/login")
        }
    }, []);

    const [notificationsa, setNotificationsa] = useState([]);
    const [hasUnread, setHasUnread] = useState(false); // State to track unread notifications

    const fetchNotifications = async () => {
        try {
            const response = await axiosInstance.get('/beneficiary/get_notifications_sidebar');
            const notify = response.data.notifications;
            setNotificationsa(notify);
            console.log(notify)
            // Check if there's any notification with `viewed: false`
            const unreadExists = notify.some(notification => !notification.viewed);
            setHasUnread(unreadExists);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);


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
            <a href="/beneficiary/home">
                <div id="brand" className="brand">
                    <img src="/charitylogo.png" alt="charity"/>
                </div>
            </a>

            {
                location.pathname === "/" ?
                    (<div className="temp">
                    <nav className="navbar" id="navbar" ref={navbar}>
                            <a href="/donor/announcements" onClick={click}>Announcements</a>
                            <a href="/brnrficiary/tickets" onClick={click}>Tickets</a>
                            <Dropdown text='More' pointing className='link item'>
                                <Dropdown.Menu>
                                    <Dropdown.Item as='a' href="#tickets" onClick={click}>Tickets</Dropdown.Item>
                                    <Dropdown.Item as='a' href="announcements" onClick={click}>Announcements</Dropdown.Item>
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
                                <a style={{ width: "fit-content"}} href="/beneficiary/announcements" onClick={click}>Announcements</a>
                                <a style={{ width: "fit-content"}} href="/beneficiary/tickets" onClick={click}>Tickets</a>
                                {/*<Dropdown  text='More' pointing className='link item'>*/}
                                {/*    <Dropdown.Menu>*/}
                                {/*        <Dropdown.Item as='a' href="#tickets" onClick={click}>Tickets</Dropdown.Item>*/}
                                {/*        <Dropdown.Item as='a' href="#announcement" onClick={click}>Announcement</Dropdown.Item>*/}
                                {/*    </Dropdown.Menu>*/}
                                {/*</Dropdown>*/}
                            </nav>
                            <div className="brandlogin">
                                <a style={{ marginRight: "40px" }} href="/beneficiary/account"><Icon name="user"/></a>

                                <a href="/beneficiary/notifications" className="notification-icon">
                                    <Icon name="bell"/>
                                    {hasUnread && <div
                                        className="red-marker"></div>} {/* Add marker if unread notifications exist */}
                                </a>
                            </div>
                        </div>
                    )
            }
        </header>
    );
}
