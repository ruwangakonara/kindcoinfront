import React from "react";
import { Grid } from "semantic-ui-react";
import HeaderCrew from "../../../Components/CrewMember/Header/HeaderCrew";
import SidebarCrew from "../../../Components/CrewMember/Sidebar/SidebarCrew";
import DashboardCard from "../../../Components/CrewMember/DashboardCard/DashboardCard";
import './CrewMemberDashboard.css';

import tokenTransferImage from "../../../assets/token_transfer.jpg";
import proofsImage from "../../../assets/proofs.jpg";
import recVerImage from "../../../assets/recipientVerification.jpg";
import docVerify from "../../../assets/doc_verify.jpg";

const CrewMemberDashboard = () => {

    const cardData = [
        {
            title: "Verify Requests",
            description: "Requests for donations should be approved by the crew members. It is important to verify the requests before they are approved.",
            imageSrc: docVerify,
            buttonLabel: "View Requests",
            buttonPath: "/crew/requests"
        },
        {
            title: "Verify Recipients",
            description: "New Registrations of recipients should be approved Should go through a rigorous verification process before approving.",
            imageSrc: recVerImage,
            buttonLabel: "View New Recipients",
            buttonPath: "/crew/recipients"
        },
        {
            title: "Verify Donation Proofs",
            description: "Donors submit the proof related to donation should be approved by the crew members. Before token transfer should be approved.",
            imageSrc: proofsImage,
            buttonLabel: "View Proofs",
            buttonPath: "/crew/proofs"
        },
        {
            title: "Token Transfer",
            description: "After approving the donation transfer the token trnasfer process should be approved with current market value.",
            imageSrc: tokenTransferImage,
            buttonLabel: "Transfer",
            buttonPath: "/crew/token_transfer"
        }
    ]

    return (
        <div className="app-container">
            <HeaderCrew />
            <div className="main-container">
                <SidebarCrew />

                <div className="dashboard-grid-container">
                    <Grid columns={2} doubling className="grid">
                        {cardData.map((card, index) => (
                            <Grid.Column key={index}>
                                <DashboardCard
                                    title={card.title}
                                    description={card.description}
                                    imageSrc={card.imageSrc}
                                    buttonLabel={card.buttonLabel}
                                    buttonPath={card.buttonPath}
                                />
                            </Grid.Column>
                        ))}
                    </Grid>
                </div>
            </div>
        </div>
    );

}

export default CrewMemberDashboard;