import classes from "./RaisedTicketsTableCmp.module.css";
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
  Input,
  Image,
  Button,
} from "semantic-ui-react";

const RaisedTicketsTableCmp = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  // const [activeRows, setActiveRows] = useState({});

  // const [selectedUser, setSelectedUser] = useState(null);

  /**
   * Fields to be included
   *
   * userId
   * Name
   * UserName
   * Address
   * Images
   * ProfileImage
   * Description
   * Type
   * DateOfBirth
   * StellarAddress
   * District
   * CreatedAt
   * PhoneNo
   */

  // Fetch tickets from the backend
  useEffect(() => {
    axios
      .get("http://localhost:9013/admin/tickets")
      .then((response) => {
        setTickets(response.data); // Assuming the response contains the tickets array
        console.log(response.data);
        console.log(tickets);
      })
      .catch((error) => {
        console.error("Error fetching tickets:", error);
      });
  }, []);

  // const rows = [
  //   {
  //     userId: "1",
  //     userName: "michael_scott",
  //     name: "Michael Scott",
  //     image: "https://via.placeholder.com/150",
  //     district: "Kegalle",
  //     stellarAddress: "stellar123abc1",
  //     address: "No: 18 Forest Avenue, Kegalle",
  //     contact: "0771122334",
  //     beneficiaryType: "Individual",
  //   },
  //   {
  //     userId: "2",
  //     userName: "abc_children_home",
  //     name: "ABC Children's Home",
  //     image: "https://via.placeholder.com/150",
  //     district: "Puttalam",
  //     stellarAddress: "stellar456def2",
  //     address: "No: 2 Lake View Road, Puttalam",
  //     contact: "0772233445",
  //     beneficiaryType: "Organization",
  //   },
  //   {
  //     userId: "3",
  //     userName: "linda_smith",
  //     name: "Linda Smith",
  //     image: "https://via.placeholder.com/150",
  //     district: "Hambantota",
  //     stellarAddress: "stellar789ghi3",
  //     address: "No: 8 Harbor Lane, Hambantota",
  //     contact: "0773344556",
  //     beneficiaryType: "Individual",
  //   },
  //   {
  //     userId: "4",
  //     userName: "wildlife_org",
  //     name: "Wildlife Conservation",
  //     image: "https://via.placeholder.com/150",
  //     district: "Polonnaruwa",
  //     stellarAddress: "stellar012jkl4",
  //     address: "No: 19 Jungle Road, Polonnaruwa",
  //     contact: "0774455667",
  //     beneficiaryType: "Organization",
  //   },
  //   {
  //     userId: "5",
  //     userName: "daniel_james",
  //     name: "Daniel James",
  //     image: "https://via.placeholder.com/150",
  //     district: "Kandy",
  //     stellarAddress: "stellar345mno5",
  //     address: "No: 6 Temple Street, Kandy",
  //     contact: "0775566778",
  //     beneficiaryType: "Individual",
  //   },
  //   {
  //     userId: "6",
  //     userName: "bright_future",
  //     name: "Bright Future Foundation",
  //     image: "https://via.placeholder.com/150",
  //     district: "Kurunegala",
  //     stellarAddress: "stellar678pqr6",
  //     address: "No: 10 Hope Avenue, Kurunegala",
  //     contact: "0776677889",
  //     beneficiaryType: "Organization",
  //   },
  //   {
  //     userId: "7",
  //     userName: "jane_doe",
  //     name: "Jane Doe",
  //     image: "https://via.placeholder.com/150",
  //     district: "Ampara",
  //     stellarAddress: "stellar901stu7",
  //     address: "No: 22 Peace Street, Ampara",
  //     contact: "0777788990",
  //     beneficiaryType: "Individual",
  //   },
  //   {
  //     userId: "8",
  //     userName: "save_earth",
  //     name: "Save the Earth",
  //     image: "https://via.placeholder.com/150",
  //     district: "Batticaloa",
  //     stellarAddress: "stellar234vwx8",
  //     address: "No: 3 Lagoon View, Batticaloa",
  //     contact: "0778899001",
  //     beneficiaryType: "Organization",
  //   },
  //   {
  //     userId: "9",
  //     userName: "mark_evans",
  //     name: "Mark Evans",
  //     image: "https://via.placeholder.com/150",
  //     district: "Mannar",
  //     stellarAddress: "stellar567yz9",
  //     address: "No: 5 Sea Breeze Lane, Mannar",
  //     contact: "0779900112",
  //     beneficiaryType: "Individual",
  //   },
  //   {
  //     userId: "10",
  //     userName: "forest_guardians",
  //     name: "Forest Guardians",
  //     image: "https://via.placeholder.com/150",
  //     district: "Monaragala",
  //     stellarAddress: "stellar890abc10",
  //     address: "No: 7 Green Street, Monaragala",
  //     contact: "0770011223",
  //     beneficiaryType: "Organization",
  //   },
  // ];

  // const InputExampleIconPosition = () => (
  //   <Input icon="" iconPosition="left" placeholder="Search Tickets..." focus />
  // );

  const handleTicketDiscussion = (ticketId) => {
    navigate(`/admin/view/tickets/${ticketId}`);
  };

  const handleEditClick = (e, userId) => {
    e.stopPropagation(); // Prevent the row click event
    // navigate(`/admin/Donor_List/Donors/${userId}/edit`);
  };

  const toggleActivation = (index) => {
    setTickets((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <>
      {/* <div className={classes.admin_mainContainer}> */}
      <div className={classes.admin_formContainer}>
        <div className={classes.formContent}>
          {/* <div className={classes.mainContainer}> */}
          {/* <InputExampleIconPosition /> */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell className={classes.customFont}>
                  TicketId
                </TableHeaderCell>
                <TableHeaderCell className={classes.customFont}>
                  UserId
                </TableHeaderCell>
                <TableHeaderCell className={classes.customFont}>
                  Title
                </TableHeaderCell>
                <TableHeaderCell className={classes.customFont}>
                  Description
                </TableHeaderCell>
                <TableHeaderCell className={classes.customFont}>
                  Created At
                </TableHeaderCell>
                <TableHeaderCell className={classes.customFont}>
                  Action
                </TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* {tickets.map((ticket, index) => {
                const isActive = tickets[index] ?? true;
                return (
                  <TableRow
                    key={ticket._id}
                    className={`${classes.dataRow} ${
                      !isActive && classes.deactivatedRow
                    }`}
                    onClick={() => handleRowClick(ticket.user_id)}
                  >
                    <TableCell>{ticket._id}</TableCell>
                    <TableCell>{ticket.user_id}</TableCell>
                    <TableCell>{ticket.title}</TableCell>
                    <TableCell>{ticket.description}</TableCell>
                    <TableCell>
                      {new Date(ticket.created).toLocaleDateString()}
                    </TableCell>
                    <TableCell className={classes.actionStylings}>
                      <div className={classes.actionContainerDiv}>
                        <Button
                          color={isActive ? "red" : "green"}
                          onClick={(e) => {
                            e.stopPropagation();
                            // toggleActivation(index);
                          }}
                        >
                          {isActive ? "Open" : "Resolved"}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })} */}
              {tickets && tickets.length > 0 ? (
                tickets.map((ticket, index) => {
                  const isActive = ticket[index] ?? true;
                  return (
                    <TableRow
                      key={ticket._id}
                      className={`${classes.dataRow} ${
                        !isActive && classes.deactivatedRow
                      }`}
                      // onClick={() => handleRowClick(ticket.user_id)}
                    >
                      <TableCell>{ticket._id}</TableCell>
                      <TableCell>{ticket.user_id}</TableCell>
                      <TableCell>{ticket.title}</TableCell>
                      <TableCell>{ticket.description}</TableCell>
                      <TableCell>
                        {new Date(ticket.created).toLocaleDateString()}
                      </TableCell>
                      <TableCell className={classes.actionStylings}>
                        <Button
                          color={isActive ? "red" : "green"}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTicketDiscussion(ticket._id);
                          }}
                        >
                          {ticket.archive ? "Open" : "Resolved"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan="6">No tickets found</TableCell>
                </TableRow>
              )}
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
      </div>
      {/* </div> */}
    </>
  );
};

export default RaisedTicketsTableCmp;

// {
//   "user_id": "64bd7812f9a5f22a5b123456",
//   "title": "Issue with login",
//   "description": "I am unable to login to my account using my credentials.",
//   "created": "2024-11-30T10:30:00Z",
//   "archived": false
// }
