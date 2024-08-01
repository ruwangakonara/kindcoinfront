import React from "react";
import { Grid } from "semantic-ui-react";
import HeaderCrew from "../../../Components/CrewMember/Header/HeaderCrew";
import SidebarCrew from "../../../Components/CrewMember/Sidebar/SidebarCrew";
import DashboardCard from "../../../Components/CrewMember/DashboardCard/DashboardCard";
import './CrewMemberDashboard.css';

const CrewMemberDashboard = () => {

    const cardData = [
        {
            title: "Verify Requests",
            description: "Total amount donated",
            imageSrc: "https://via.placeholder.com/150",
            buttonLabel: "View Requests",
            buttonPath: "/crew/requests"
        },
        {
            title: "Verify Recipients",
            description: "Total amount donated",
            imageSrc: "https://via.placeholder.com/150",
            buttonLabel: "View Requests",
            buttonPath: "/crew/recipients"
        },
        {
            title: "Verify Donation Proofs",
            description: "Total amount donated",
            imageSrc: "https://via.placeholder.com/150",
            buttonLabel: "View Requests",
            buttonPath: "/crew/requests"
        },
        {
            title: "Token Transfer",
            description: "Total amount donated",
            imageSrc: "https://via.placeholder.com/150",
            buttonLabel: "View Requests",
            buttonPath: "/crew/requests"
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