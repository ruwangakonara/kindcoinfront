import React from "react";
import HeaderCrew from "../../../Components/CrewMember/Header/HeaderCrew";
import SidebarCrew from "../../../Components/CrewMember/Sidebar/SidebarCrew";
import DashboardCard from "../../../Components/CrewMember/DashboardCard/DashboardCard";
import './CrewMemberDashboard.css';

const CrewMemberDashboard = () => {
    return (
        <div className="app-container">
            <HeaderCrew />
            <div className="main-container">
                <SidebarCrew />
                <div className="dashboard-content">
                    <div className="dashboard-grid">
                        <DashboardCard title="Verify Recipient" description="Some Text" />
                        <DashboardCard title="Verify Requests" description="Some Text" />
                        <DashboardCard title="Verify Donation Proofs" description="Some Text" />
                        <DashboardCard title="Token Transfer" description="Some Text" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CrewMemberDashboard;