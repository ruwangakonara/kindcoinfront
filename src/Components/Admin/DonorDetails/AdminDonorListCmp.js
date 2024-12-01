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
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Number of rows per page
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

  // Calculate total pages
  const totalPages = Math.ceil(donors.length / rowsPerPage);

  // Determine the rows to display on the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = donors.slice(indexOfFirstRow, indexOfLastRow);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const InputExampleIconPosition = () => (
    <Input
      icon="users"
      iconPosition="left"
      placeholder="Search Donors..."
      focus
    />
  );

  const handleRowClick = (e, user_id) => {
    console.log(user_id);
    e.stopPropagation(); // Prevent the row click event
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
    <div className={classes.admin_mainContainer}>
      {/* <InputExampleIconPosition /> */}
      <Table celled>
        <TableHeader>
          <TableRow>
            <TableHeaderCell className={classes.admin_customFont}>
              user_id
            </TableHeaderCell>
            <TableHeaderCell className={classes.admin_customFont}>
              Name
            </TableHeaderCell>
            <TableHeaderCell className={classes.admin_customFont}>
              UserName
            </TableHeaderCell>
            <TableHeaderCell className={classes.admin_customFont}>
              District
            </TableHeaderCell>
            <TableHeaderCell className={classes.admin_customFont}>
              Address
            </TableHeaderCell>
            <TableHeaderCell className={classes.admin_customFont}>
              Contact No.
            </TableHeaderCell>
            <TableHeaderCell className={classes.admin_customFont}>
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
                className={`${classes.admin_dataRow} ${
                  !isActive && classes.admin_deactivatedRow
                }`}
                onClick={(e) => {
                  console.log(donor.user_id);
                  // handleRowClick(donor.user_id);
                  handleRowClick(e, donor.user_id);
                }}
              >
                <TableCell>{userId}</TableCell>
                <TableCell>
                  <div className={classes.admin_userNameContainer}>
                    <Image
                      src={donor.profile_image}
                      circular
                      className={classes.admin_imageStylings}
                    ></Image>
                    <span className={classes.admin_truncatedText}>
                      {donor.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{donor.username}</TableCell>
                <TableCell>{donor.district}</TableCell>
                <TableCell>{donor.stellar_address}</TableCell>
                <TableCell>{donor.phoneNo}</TableCell>
                <TableCell className={classes.admin_actionStylings}>
                  <div className={classes.admin_actionContainerDiv}>
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
                    <IconGroup
                      size="large"
                      style={{
                        display: "flex",
                        alignItems: "space-between",
                        gap: "40px",
                      }}
                    >
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
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        {/* <TableFooter>
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
        </TableFooter> */}

        <TableFooter>
          <TableRow>
            <TableHeaderCell colSpan="7">
              <Menu floated="right" pagination>
                <MenuItem
                  as="a"
                  icon
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <Icon name="chevron left" />
                </MenuItem>
                {Array.from({ length: totalPages }, (_, i) => (
                  <MenuItem
                    key={i + 1}
                    as="a"
                    active={currentPage === i + 1}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </MenuItem>
                ))}
                <MenuItem
                  as="a"
                  icon
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
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
