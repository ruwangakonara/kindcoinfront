import React from "react";
import Sidebar from "../../../Components/CrewMember/Sidebar/Sidebar";
import DashboardCard from "../../../Components/CrewMember/DashboardCard/DashboardCard";
import './CrewMemberDashboard.css';

const CrewMemberDashboard = () => {
    return (
        <div className="crew-member-dasboard">
            <Sidebar />
            <div className="dasboard-content">
                <h1>Crew Member Default View</h1>
                <div className="dashboard-grid">
                    <DashboardCard title="Verify Recipient" description="Some Text" />
                    <DashboardCard title="Verify Requests" description="Some Text" />
                    <DashboardCard title="Verify Donation Proofs" description="Some Text" />
                    <DashboardCard title="Token Transfer" description="Some Text" />
                </div>
            </div>
        </div>
    );
}

export default CrewMemberDashboard;