import React from "react";
import HeaderCrew from "../../../Components/CrewMember/Header/HeaderCrew";
import SidebarCrew from "../../../Components/CrewMember/Sidebar/SidebarCrew";
import VerifyRecipientsTable from "../../../Components/CrewMember/VerifyRecipients/VerifyRecipientsTable";
import SearchBar from "../../../Components/CrewMember/SearchBar/CrewSearchBar";
import './VerifyRecipients.css';


const VerifyRecipients = () => {

    const handleSearch = (query) => {
        console.log('Search query:', query);
      };

    return (
        <div className="app-container">
            <HeaderCrew />
            <div className="main-container">
                <SidebarCrew />
                <div className="verify-recipients-container">
                    <SearchBar onSearch={handleSearch} />
                    <VerifyRecipientsTable />
                </div>
            </div>
        </div>
    );
}

export default VerifyRecipients;