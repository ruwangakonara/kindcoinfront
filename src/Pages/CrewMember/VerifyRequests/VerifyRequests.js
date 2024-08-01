import React from "react";
import HeaderCrew from "../../../Components/CrewMember/Header/HeaderCrew";
import SidebarCrew from "../../../Components/CrewMember/Sidebar/SidebarCrew";
import VerifyRequestsTable from "../../../Components/CrewMember/VerifyRequests/VerifyRequestsTable";
import SearchBar from "../../../Components/CrewMember/SearchBar/CrewSearchBar";
import './VerifyRequests.css';

const VerifyRequests = () => {
    return (
        <div className="app-container">
            <HeaderCrew />
            <div className="main-container">
                <SidebarCrew />
                <div className="verify-requests-container">
                    <SearchBar />
                    <VerifyRequestsTable />
                </div>
            </div>
        </div>
    );
}

export default VerifyRequests;