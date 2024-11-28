import React from "react";
import HeaderCrew from "../../../Components/CrewMember/Header/HeaderCrew";
import SidebarCrew from "../../../Components/CrewMember/Sidebar/SidebarCrew";
import './CrewSettings.css';

const CrewSettings = () => {
    return ( 
        <div className="app-container">
            <HeaderCrew />
            <div className="main-container">
                <SidebarCrew />
            </div>
        </div>
     );
}
 
export default CrewSettings;