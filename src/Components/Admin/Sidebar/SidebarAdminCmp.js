import classes from "./SidebarAdminCmp.module.css";
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
  Header,
  Image,
  Segment,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const SidebarAdminCmp = ({ visible }) => {
  const [visibility, setVisiblity] = useState(false);

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
    { name: "Settings", path: "/admin/settings", icon: "settings" },
  ];

  return (
    <>
      {/** needed to change  the styles of this side bar due to changes from others. */}
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        vertical
        visible={visible}
        width="thin"
        className={classes.sideBarStyles}
      >
        {items.map((item, index) => (
          <MenuItem as={Link} to={item.path} key={index}>
            <Icon name={item.icon} />
            {item.name}
          </MenuItem>
        ))}
      </Sidebar>

      {/* <Grid columns={1}>
      <GridColumn>
        <Checkbox
          checked={visible}
          label={{ children: <code>visible</code> }}
          onChange={(e, data) => setVisible(data.checked)}
        />
      </GridColumn> */}

      {/* <Grid columns={1}>
        <GridColumn>
          <Checkbox
            checked={visible}
            label={{ children: <code>Toggle Sidebar</code> }}
            onChange={(e, data) => setVisiblity(data.checked)}
          />
        </GridColumn>
        <GridColumn>
          <SidebarPushable as={Segment}>
            <Sidebar
              as={Menu}
              animation="overlay"
              icon="labeled"
              inverted
              onHide={() => setVisiblity(false)}
              vertical
              visible={visible}
              width="thin"
              className={classes.sideBarStyles}
            >
              <MenuItem as="a">
                <Icon name="home" />
                Home
              </MenuItem>
              <MenuItem as="a">
                <Icon name="gamepad" />
                Games
              </MenuItem>
              <MenuItem as="a">
                <Icon name="camera" />
                Channels
              </MenuItem>
              {items.map((item, index) => (
                <MenuItem as={Link} to={item.path} key={index}>
                  <Icon name={item.icon} />
                  {item.name}
                </MenuItem>
              ))}
            </Sidebar>

            <SidebarPusher>
              <Segment basic>
                <Header as="h3">Application Content</Header>
                <Image src="/images/wireframe/paragraph.png" />
              </Segment>
            </SidebarPusher>
          </SidebarPushable>
        </GridColumn>
      </Grid> */}
    </>
  );
};

export default SidebarAdminCmp;
