import React from "react";
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Kindcoin</h2>
            <ul>
                <li><a href="#verify-recipients">Verify Recipients</a></li>
                <li><a href="#verify-requests">Verify Requests</a></li>
                <li><a href="#verify-donation-proofs">Verify Donation Proofs</a></li>
                <li><a href="#token-transfer">Token Transfer</a></li>
                <li><a href="#settings">Settings</a></li>
            </ul>
        </div>
    );
}

export default Sidebar;