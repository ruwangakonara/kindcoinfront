import React, { useContext, useState, useEffect } from "react";
import { Grid, Menu, Icon, MenuItem } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminSideBarCmp.css";
import axios from "axios";
// import { UserContext } from "../../Home/UserConext/UserContext"; // Adjust the import path if necessary

export default function AdminSideBarCmp() {
  const [activeItem, setActiveItem] = useState("Home");
  const [visible, setVisible] = useState(true);
  const [icon, setIcon] = useState("angle right");
  //   const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const items = [
    { name: "Dashboard", path: "/admin/home", icon: "home" },
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
    { name: "Tickets", path: "/admin/view/tickets", icon: "compose" },
    { name: "Statistics", path: "/admin/overall_stats", icon: "chart line" },
    { name: "Settings", path: "/admin/settings", icon: "settings" },
    {
      name: "Notices",
      path: "/admin/handle/announcements",
      icon: "announcement",
    },
  ];

  const axiosInstance = axios.create({
    baseURL: "http://localhost:9013",
    withCredentials: true,
  });

  // const handleItemClick = (e, { name }) => setActiveItem(name);

  // Toggle sidebar visibility and icon state
  const handleIconClick = () => {
    setVisible(!visible);
    setIcon(icon === "angle right" ? "angle left" : "angle right");
  };

  // Adjust the margin of the content based on sidebar visibility
  useEffect(() => {
    const mainContainer = document.querySelector(".mainContainer");

    // Check if the element exists before modifying its style
    if (mainContainer) {
      if (visible) {
        mainContainer.style.marginLeft = "250px"; // Sidebar width
      } else {
        mainContainer.style.marginLeft = "0";
      }
    }
  }, [visible]);

  const handleLogout = async () => {
    try {
      await axiosInstance.get("/signout");
      // setUser(null);
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Grid style={{ height: "100vh", top: "100px", width: "fit-content" }}>
      <Grid.Column width={5} style={{ height: "100vh" }}>
        <Menu
          vertical
          tabular
          style={{
            fontSize: "20px",
            top: "70px",
            position: "fixed",
            zIndex: "1",
            backgroundColor: "#fff",
            height: "100%",
          }}
          className={visible ? "visibles" : "hiddens"}
          direction="left"
        >
          {items.map((item, index) => (
            <MenuItem as={Link} to={item.path} key={index}>
              <Icon name={item.icon} />
              {item.name}
            </MenuItem>
          ))}
          <Menu.Item
            name="Logout"
            active={activeItem === "Logout"}
            onClick={handleLogout}
            className="logout"
          >
            <Icon name="sign-out" />
            Logout
          </Menu.Item>
        </Menu>
      </Grid.Column>
      <Icon
        name={icon}
        className={`lefticons ${visible ? "lefts" : ""}`} // Adjust icon position
        onClick={handleIconClick}
      />
    </Grid>
  );
}
