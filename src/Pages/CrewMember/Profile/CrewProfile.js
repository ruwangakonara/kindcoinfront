import React from "react";
import HeaderCrew from "../../../Components/CrewMember/Header/HeaderCrew";
import SidebarCrew from "../../../Components/CrewMember/Sidebar/SidebarCrew";
import CrewMemberForm from "../../../Components/CrewMember/Profile/CrewProfileForm";


const CrewProfile = () => {
    return ( 
        <div className="app-container">
            <HeaderCrew />
            <div className="main-container">
                <SidebarCrew />
                <div className="verify-recipients-container">
                    <CrewMemberForm />
                </div>
            </div>
        </div>
     );
}
 
export default CrewProfile;