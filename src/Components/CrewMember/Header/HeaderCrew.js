import React, {useState} from "react";
import { Link } from "react-router-dom";
import './HeaderCrew.css';
// import logo from './logo.png';
// import profilePic from './profile.png';

const HeaderCrew = () =>{
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return(
        <div className="header">
            <div className="logo">
            <img src="https://via.placeholder.com/50" alt="Logo" />
                {/* <img src={logo} alt="Logo" /> */}
            </div>

            <div className="profile">
                {/* <img src={profilePic} alt="Profile" className="profile-pic" onClick={toggleDropdown}/> */}
                <img src="https://via.placeholder.com/50" alt="Profile" className="profile-pic" onClick={toggleDropdown}/>
                {isDropdownOpen && (
                    <div className="dropdown">
                        <Link to="/crew/profile">Profile</Link>
                        <Link to="/crew/login">Logout</Link>
                    </div>
                )}
            </div>
            </div>
    );
}

export default HeaderCrew;
