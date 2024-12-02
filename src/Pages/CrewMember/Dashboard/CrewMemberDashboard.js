import React from "react";
import { Grid } from "semantic-ui-react";
import HeaderCrew from "../../../Components/CrewMember/Header/HeaderCrew";
import Sidebar from "../../../Components/CrewMember/Sidebar/Sidebar";
import DashboardCard from "../../../Components/CrewMember/DashboardCard/DashboardCard";
import './CrewMemberDashboard.css';

import tokenTransferImage from "../../../assets/token_transfer.jpg";
import proofsImage from "../../../assets/proofs.jpg";
import recVerImage from "../../../assets/recipientVerification.jpg";
import docVerify from "../../../assets/doc_verify.jpg";
import goodsDonation from "../../../assets/goods_donation.jpg";
import attestationFee from "../../../assets/attestation_fee.jpg";
import batchTransfer from "../../../assets/batch_transfer.jpg";

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
      title: "Assigned Goods Donation",
      description: "Assigned Goods Donations should be approved by the crew member. This can't be viewed by other crew members.",
      imageSrc: goodsDonation,
      buttonLabel: "View Assignments",
      buttonPath: "/crew/goods_donations"
    },
    {
      title: "Token Transfer",
      description: "After approving the donation transfer the token transfer process should be approved with current market value.",
      imageSrc: tokenTransferImage,
      buttonLabel: "Transfer",
      buttonPath: "/crew/token_transfer"
    },
    {
      title: "Attestation Fee",
      description: "Attestation Fee for tax relief documents can be viewed here.",
      imageSrc: attestationFee,
      buttonLabel: "View Attestation",
      buttonPath: "/crew/doc_verify"
    },
    {
      title: "Token Batch Transfer",
      description: "Token Batch Transfer can be done here. Dispatch tokens to the recipients by the crew member and kindcoin balance will be updated.",
      imageSrc: batchTransfer,
      buttonLabel: "Dispatch Tokens",
      buttonPath: "/crew/dispatch"
    }
  ]

    return (
        <div className="app-container">
          <HeaderCrew />
          <div className="main-container">
            <Sidebar />
    
            <div className="crew-dashboard-grid-container">
              <Grid columns={3} doubling className="grid">
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