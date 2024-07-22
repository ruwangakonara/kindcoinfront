import { useState } from "react";
import Header from "../../../Components/Admin/Header/Header";
import SidebarAdmin from "../../../Components/Admin/Sidebar/SidebarAdmin";
import Card from "../../../Components/Admin/NavigationCard/Card"
import "./AdminDashBoard.css"

const AdminDashBoard = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };


    return ( 
        <>
            <button className="toggle-button" onClick={toggleSidebar}>
                <span className="toggle-icon">☰</span>
            </button>
            <SidebarAdmin visible={sidebarVisible} />
            <div className={`main-content ${sidebarVisible ? 'shifted' : ''}`}>
            {/* <Switch>
                <Route path="/" exact component={Dashboard} />
            </Switch> */}
            </div>
            <Header/>
            {/* <h1>AdminDashBoard</h1> */}
            {/* <SidebarAdmin/> */}
            {/* <Card/> */}

            <div className="dashboard">
                <Card title="Donor" />
                <Card title="Donee" />
                <Card title="Statistics" />
                <Card title="Register" />
                <Card title="Complaints" />
            </div>
        </>
     );
}
 
export default AdminDashBoard;