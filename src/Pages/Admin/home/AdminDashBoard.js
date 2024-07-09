// import React from "react";
import NavBar_Admin from "../../../Components/Admin/Navbar/NavBar_Admin";
import Sidebar_Admin from "../../../Components/Admin/Sidebar/Sidebar_Admin";
import Card from "../../../Components/Admin/NavigationCard/Card"
import "./AdminDashBoard.css"

const AdminDashBoard = () => {
    return ( 
        <div>
            <NavBar_Admin/>
            <h1>AdminDashBoard</h1>
            {/* <Card/> */}
        </div>
     );
}
 
export default AdminDashBoard;