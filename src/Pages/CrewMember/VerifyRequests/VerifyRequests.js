import React from "react";
import HeaderCrew from "../../../Components/CrewMember/Header/HeaderCrew";
import Sidebar from "../../../Components/CrewMember/Sidebar/Sidebar";
import VerifyRequestsTable from "../../../Components/CrewMember/VerifyRequests/VerifyRequestsTable";
import SearchBar from "../../../Components/CrewMember/SearchBar/Searchbar";
import './VerifyRequests.css';

const VerifyRequests = () => {

    const handleSearch = (query) => {
        console.log('Search query:', query);
      };

    return (
        <div className="app-container">
            <HeaderCrew />
            <div className="main-container">
                <Sidebar />
                <div className="crew-verify-requests-container">
                    <SearchBar onSearch={handleSearch} />
                    <VerifyRequestsTable />
                </div>
            </div>
        </div>
    );
}

export default VerifyRequests;