import classes from "./AdminDonorListCmp.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableFooter,
  TableCell,
  TableBody,
  MenuItem,
  Icon,
  IconGroup,
  Menu,
  Table,
  Image,
  Input,
  Button,
} from "semantic-ui-react";

const AdminDonorListCmp = () => {
  const [donors, setDonors] = useState([]); // Store the fetched donors here
  const [activeRows, setActiveRows] = useState({});
  const navigate = useNavigate();

  // Fetch data from the backend
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Retrieve token (if stored in localStorage)
        console.log(token);
        const response = await axios.get(
          "http://localhost:9013/admin/Donor_List/Donors",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          }
        ); // Make the API request
        setDonors(response.data); // Set the fetched donors
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching donor data:", error);
      }
    };

    fetchDonors(); // Call the function when the component is mounted
  }, []); // Empty dependency array means this runs once on component mount

  const InputExampleIconPosition = () => (
    <Input
      icon="users"
      iconPosition="left"
      placeholder="Search Donors..."
      focus
    />
  );

  const handleRowClick = (user_id) => {
    navigate(`/admin/Donor_List/Donors/${user_id._id}`);
  };

  const handleEditClick = (e, user_id) => {
    console.log(user_id);
    e.stopPropagation(); // Prevent the row click event
    navigate(`/admin/Donor_List/Donors/edit/${user_id._id}`);
  };

  const handleDeleteClick = async (e, user_id) => {
    e.stopPropagation(); // Prevent the row click event

    if (window.confirm("Are you sure you want to delete this donor?")) {
      try {
        // Send DELETE request to the server
        const response = await axios.delete(
          `http://localhost:9013/admin/Donor_List/Donors/${user_id}`
        );
        console.log("Response for delete:", response);

        // Check if the response is successful (status code 200 or 204)
        if (response.status === 200 || response.status === 204) {
          console.log("User deleted successfully:", response);
          // Redirect to the Donors List after a successful deletion
          navigate("/admin/Donor_List/Donors");
        }
      } catch (error) {
        console.error("Error deleting donor:", error);
        alert("There was an issue deleting the donor.");
      }
    }
  };

  const toggleActivation = (index) => {
    setActiveRows((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className={classes.mainContainer}>
      <InputExampleIconPosition />
      <Table celled>
        <TableHeader>
          <TableRow>
            <TableHeaderCell className={classes.customFont}>
              user_id
            </TableHeaderCell>
            <TableHeaderCell className={classes.customFont}>
              Name
            </TableHeaderCell>
            <TableHeaderCell className={classes.customFont}>
              UserName
            </TableHeaderCell>
            <TableHeaderCell className={classes.customFont}>
              District
            </TableHeaderCell>
            <TableHeaderCell className={classes.customFont}>
              Address
            </TableHeaderCell>
            <TableHeaderCell className={classes.customFont}>
              Contact No.
            </TableHeaderCell>
            <TableHeaderCell className={classes.customFont}>
              Action
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {donors.map((donor, index) => {
            const isActive = activeRows[index] ?? true;
            const userId = donor.user_id?._id || "N/A"; // Safe access for user_id._id

            return (
              <TableRow
                key={userId}
                className={`${classes.dataRow} ${
                  !isActive && classes.deactivatedRow
                }`}
                onClick={() => {
                  console.log(donor.user_id);
                  handleRowClick(donor.user_id);
                }}
              >
                <TableCell>{userId}</TableCell>
                <TableCell>
                  <div className={classes.userNameContainer}>
                    <Image
                      src={donor.profile_image}
                      circular
                      className={classes.imageStylings}
                    ></Image>
                    <span className={classes.truncatedText}>{donor.name}</span>
                  </div>
                </TableCell>
                <TableCell>{donor.username}</TableCell>
                <TableCell>{donor.district}</TableCell>
                <TableCell>{donor.stellar_address}</TableCell>
                <TableCell>{donor.phoneNo}</TableCell>
                <TableCell className={classes.actionStylings}>
                  <div className={classes.actionContainerDiv}>
                    <Button
                      color={isActive ? "red" : "green"}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleActivation(index);
                        // have to include the logic in order to change the user_id.isEthical to be false.
                      }}
                    >
                      {isActive ? "Deactivate" : "Activate"}
                    </Button>
                    {/* <div className={classes.iconContainer}> */}
                    {/* <Button
                        color="primary"
                        onClick={(e) => handleEditClick(e, donor.user_id)}
                      >
                        Edit
                      </Button> */}
                    {/* <Button
                        color="primary"
                        onClick={(e) => handleEditClick(e, donor.user_id)}
                      >
                        Edit
                      </Button> */}
                    <IconGroup size="large" className={classes.iconContainer}>
                      <Icon
                        name="edit"
                        onClick={(e) => handleEditClick(e, donor.user_id)}
                        style={{ cursor: "pointer" }}
                      />
                      <Icon
                        name="user delete"
                        onClick={(e) => handleDeleteClick(e, donor.user_id)}
                        style={{ cursor: "pointer" }}
                      />
                    </IconGroup>
                    {/* </div> */}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableHeaderCell colSpan="7">
              <Menu floated="right" pagination>
                <MenuItem as="a" icon>
                  <Icon name="chevron left" />
                </MenuItem>
                <MenuItem as="a">1</MenuItem>
                <MenuItem as="a">2</MenuItem>
                <MenuItem as="a">3</MenuItem>
                <MenuItem as="a">4</MenuItem>
                <MenuItem as="a" icon>
                  <Icon name="chevron right" />
                </MenuItem>
              </Menu>
            </TableHeaderCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default AdminDonorListCmp;
