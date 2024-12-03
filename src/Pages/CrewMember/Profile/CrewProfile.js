import React from "react";
import HeaderCrew from "../../../Components/CrewMember/Header/HeaderCrew";
import SidebarCrew from "../../../Components/CrewMember/Sidebar/SidebarCrew";
import CrewMemberForm from "../../../Components/CrewMember/Profile/CrewProfileForm";
import { useAuthCheck } from '../../../hooks/useAuthHook';


const CrewProfile = () => {
    // useAuthCheck();
    return ( 
        <div className="app-container">
            <HeaderCrew />
            <div className="main-container">
                <SidebarCrew />
                <div className="crew-verify-recipients-container">
                    <CrewMemberForm />
                </div>
            </div>
        </div>
     );
}
 
export default CrewProfile;