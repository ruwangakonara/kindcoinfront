import classes from "./AdminBeneficiaryListCmp.module.css";
import { useState, useEffect } from "react";
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
  Menu,
  Table,
  Image,
  Input,
  Button,
  IconGroup,
} from "semantic-ui-react";

const AdminBeneficiaryListCmp = () => {
  const navigate = useNavigate();
  const [beneficiaries, setBeneficiaries] = useState([]); // Store the fetched beneficiaries here
  const [activeRows, setActiveRows] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Number of rows per page

  // Calculate total pages
  const totalPages = Math.ceil(beneficiaries.length / rowsPerPage);

  // Determine the rows to display on the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = beneficiaries.slice(indexOfFirstRow, indexOfLastRow);

  /**
   * Fields to be included
   *
   * userId
   * Name
   * UserName
   * Address
   * Images
   * ProfileImage
   * CertificateImage
   * Description
   * Type
   * DateOfBirth
   * District
   * CreatedAt
   * PhoneNo
   */

  // Fetch data from the backend
  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Retrieve token (if stored in localStorage)
        console.log(token);
        const response = await axios.get(
          "http://localhost:9013/admin/Beneficiary_List/Beneficiaries",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          }
        ); // Make the API request
        setBeneficiaries(response.data); // Set the fetched donors
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching donor data:", error);
      }
    };

    fetchBeneficiaries(); // Call the function when the component is mounted
  }, []); // Empty dependency array means this runs once on component mount

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const InputExampleIconPosition = () => (
    <Input
      icon=""
      iconPosition="left"
      placeholder="Search Beneficiaries..."
      focus
    />
  );

  const handleRowClick = (userId) => {
    navigate(`/admin/Beneficiary_List/Beneficiaries/${userId}`);
  };

  const handleEditClick = (e, userId) => {
    e.stopPropagation(); // Prevent the row click event
    navigate(`/admin/Beneficiary_List/Beneficiaries/edit/${userId}`);
  };

  const handleDeleteClick = async (e, user_id) => {
    e.stopPropagation(); // Prevent the row click event
    if (window.confirm("Are you sure you want to delete this donor?")) {
      try {
        const response = await axios.delete(
          `http://localhost:9013/admin/Beneficiary_List/Beneficiaries/${user_id}`
        );
        console.log("Response for delete:", response);
        if (response.status === 200 || response.status === 204) {
          console.log("User deleted successfully:", response);
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
      <InputExampleIconPosition />
      <Table celled>
        <TableHeader>
          <TableRow>
            <TableHeaderCell className={classes.admin_customFont}>
              UserId
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
              Date Of Birth
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
          {beneficiaries.map((row, index) => {
            const isActive = activeRows[index] ?? true;
            const userId = row.user_id?._id || "N/A"; // Safe access for user_id._id
            return (
              <TableRow
                key={index}
                className={`${classes.admin_dataRow} ${
                  !isActive && classes.admin_deactivatedRow
                }`}
                onClick={() => handleRowClick(row.userId)}
              >
                <TableCell>{userId}</TableCell>

                <TableCell>
                  <div className={classes.admin_userNameContainer}>
                    <Image
                      src={row.image}
                      circular
                      className={classes.admin_imageStylings}
                    ></Image>
                    <span className={classes.admin_truncatedText}>
                      {row.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.district}</TableCell>
                <TableCell>{row.date_of_birth}</TableCell>
                <TableCell>{row.phoneNo}</TableCell>
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
                    <IconGroup size="large" className={classes.iconContainer}>
                      <Icon
                        name="edit"
                        onClick={(e) => handleEditClick(e, row.user_id)}
                        style={{ cursor: "pointer" }}
                      />
                      <Icon
                        name="user delete"
                        onClick={(e) => handleDeleteClick(e, row.user_id)}
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

export default AdminBeneficiaryListCmp;
