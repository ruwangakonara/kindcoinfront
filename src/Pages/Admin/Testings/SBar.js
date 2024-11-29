import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import { useState } from "react";
import {
  MenuItem,
  Icon,
  Menu,
  Sidebar,
  SidebarPusher,
  SidebarPushable,
  GridColumn,
  Checkbox,
  Grid,
  Segment,
} from "semantic-ui-react";

const SidebarrNew = ({ isOpen }) => {
  const [visible, setVisible] = useState(false); // State to manage sidebar visibility

  const items = [
    // { name: "Dashboard", path: "/admin/home", icon: "home" },
    { name: "Donors", path: "/admin/Donor_List/Donors", icon: "address book" },
    {
      name: "Beneficiaries",
      path: "/admin/Beneficiary_List/Beneficiaries",
      icon: "address card outline",
    },
    {
      name: "Crew Members",
      path: "/admin/view/crew_member",
      icon: "user outline",
    },
    {
      name: "Assign Crew Member",
      path: "/admin/assign/crew_member",
      icon: "gavel",
    },
    { name: "Complaints", path: "/admin/view/complaints", icon: "compose" },
    { name: "Statistics", path: "/admin/overall_stats", icon: "chart line" },
    // { name: "Settings", path: "/admin/settings", icon: "settings" },
  ];
  //   const sidebarItems = [
  //     { name: "Dashboard", path: "/dashboard" },
  //     { name: "Donors", path: "/donors" },
  //     { name: "Beneficiaries", path: "/beneficiaries" },
  //     { name: "Crew Members", path: "/crew-members" },
  //     { name: "Complaints", path: "/complaints" },
  //     { name: "Statistics", path: "/statistics" },
  //     { name: "Settings", path: "/settings" },
  //   ];

  return (
    <>
      {/* <nav className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav> */}

      <Grid>
        {/* <GridColumn>
          <Checkbox
            checked={visible}
            label={{ children: <code>Toggle Sidebar</code> }}
            onChange={(e, data) => setVisible(data.checked)}
          />
        </GridColumn> */}

        {/* Sidebar with content */}
        <GridColumn>
          <SidebarPushable as={Segment}>
            {/* <div style={{ display: "flex", minHeight: "100vh", width: "100%" }}> */}
            <Sidebar
              as={Menu}
              animation="overlay"
              icon="labeled"
              inverted
              onHide={() => setVisible(false)}
              // onHide={() => {}}
              vertical
              visible={isOpen}
            >
              {items.map((item, index) => (
                <MenuItem as={Link} to={item.path} key={index}>
                  <Icon name={item.icon} />
                  {item.name}
                </MenuItem>
              ))}
            </Sidebar>

            <SidebarPusher style={{ flex: 1 }}>
              <Segment basic style={{ minHeight: "100vh", width: "100%" }}>
                <h3>Application Content</h3>
                <h3>Application Content</h3>
                {/* Dynamic content can go here */}
              </Segment>
            </SidebarPusher>
            {/* </div> */}
          </SidebarPushable>
        </GridColumn>
      </Grid>
    </>
  );
};

export default SidebarrNew;
