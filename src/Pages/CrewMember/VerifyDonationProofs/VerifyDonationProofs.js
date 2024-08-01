import React from "react";
import HeaderCrew from "../../../Components/CrewMember/Header/HeaderCrew";
import SidebarCrew from "../../../Components/CrewMember/Sidebar/SidebarCrew";
import VerifyDonationProofsTable from "../../../Components/CrewMember/VerifyDonationProofs/VerifyDonationProofsTable";
import SearchBar from "../../../Components/CrewMember/SearchBar/CrewSearchBar";
import Filter from "../../../Components/CrewMember/VerifyDonationProofs/Filter";
import './VerifyDonationProofs.css';

const VerifyDonationProofs = () => {

    const handleSearch = (query) => {
        console.log('Search query:', query);
    };


    const handleFilterChange = (status) => {
        console.log('Selected status:', status);
    };

    return (
        <div className="app-container">
            <HeaderCrew />
            <div className="main-container">
                <SidebarCrew />
                <div className="donation-proofs-header">
                    <Filter onFilterChange={handleFilterChange} />
                    <SearchBar onSearch={handleSearch} />
                </div>
                <div className="donation-proofs-table-container">
                    <VerifyDonationProofsTable />
                </div>
            </div>
        </div>
    );
}

export default VerifyDonationProofs;