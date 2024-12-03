import React, { useState, useEffect } from "react";
import axios from 'axios';
import classes from "./CrewMemberTableCmp.module.css";
import { useNavigate } from "react-router-dom";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableFooter,
  TableCell,
  TableBody,
  Button,
  Icon,
  Input,
  Table,
} from "semantic-ui-react";

function exampleReducer(state, action) {
  switch (action.type) {
    case "OPEN_MODAL":
      return { open: true, dimmer: action.dimmer };
    case "CLOSE_MODAL":
      return { open: false };
    default:
      throw new Error();
  }
}

const CrewMemberTableCmp = () => {
  const navigate = useNavigate();

  // State to store the fetched crew member data
  const [rows, setRows] = useState([]);

  // Fetch data from the backend URL when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:9013/admin/view/crew_member")
      .then((response) => {
        // Extract the relevant data from the response
        const crewMembers = response.data.map((member) => ({
          userId: member._id,
          name: member.name,
          registrationDate: new Date(member.created_at).toLocaleDateString(),
          email: member.username,
          town: "Not Provided", // Example: You can update this if the town info is available
        }));
        setRows(crewMembers);
      })
      .catch((error) => {
        console.error("Error fetching crew members:", error);
      });
  }, []); // Empty array ensures this runs once when the component mounts

  // const rows = [
  //   {
  //     userId: "1",
  //     name: "Chamal Fernando",
  //     registrationDate: "2024-05-29",
  //     email: "chamaldesh2020@gmail.com",
  //     NoOfOps: "5",
  //     town: "Colombo",
  //   },
  //   {
  //     userId: "2",
  //     name: "Nimal Fernando",
  //     registrationDate: "2024-05-29",
  //     email: "nimal1.fidao@hotmail.com",
  //     NoOfOps: "0",
  //     town: "Gampaha",
  //   },
  //   {
  //     userId: "3",
  //     name: "Sunil Perera",
  //     registrationDate: "2024-05-29",
  //     email: "sunilperera@gmail.com",
  //     NoOfOps: "1",
  //     town: "Kandy",
  //   },
  //   {
  //     userId: "4",
  //     name: "Nimalsha Warushawithana",
  //     registrationDate: "2024-05-29",
  //     email: "nimalwar@hotmail.com",
  //     NoOfOps: "3",
  //     town: "Galle",
  //   },
  //   {
  //     userId: "5",
  //     name: "Isuri Perera",
  //     registrationDate: "2024-06-02",
  //     email: "isuri.p@gmail.com",
  //     NoOfOps: "1",
  //     town: "Matara",
  //   },
  //   {
  //     userId: "6",
  //     name: "Sandun Pathirana",
  //     registrationDate: "2024-06-10",
  //     email: "sandun.path@gmail.com",
  //     NoOfOps: "4",
  //     town: "Kurunegala",
  //   },
  //   {
  //     userId: "7",
  //     name: "Ravindu Silva",
  //     registrationDate: "2024-06-15",
  //     email: "ravindu.silva@outlook.com",
  //     NoOfOps: "2",
  //     town: "Negombo",
  //   },
  //   {
  //     userId: "8",
  //     name: "Chamali Fernando",
  //     registrationDate: "2024-06-20",
  //     email: "chamali.fernando@yahoo.com",
  //     NoOfOps: "5",
  //     town: "Badulla",
  //   },
  //   {
  //     userId: "9",
  //     name: "Kasun Weerasinghe",
  //     registrationDate: "2024-06-25",
  //     email: "kasun.weera@hotmail.com",
  //     NoOfOps: "1",
  //     town: "Anuradhapura",
  //   },
  //   {
  //     userId: "10",
  //     name: "Lakshan Jayawardena",
  //     registrationDate: "2024-06-30",
  //     email: "lakshan.jaya@gmail.com",
  //     NoOfOps: "3",
  //     town: "Jaffna",
  //   },
  // ];

  // const handleAddUser = () => {
  //     navigate('/admin/register/crew_member');
  // };

  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    dimmer: undefined,
  });
  const { open, dimmer } = state;

  // Form state and handlers
  const [formData, setFormData] = useState({
    name: "",
    registrationDate: "",
    userName: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handlers for view, edit, and delete operations
  const handleView = (id) => {
    navigate(`/admin/view/crew_member/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/edit/crew_member/${id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to a server
    console.log("Form data submitted:", formData);
    dispatch({ type: "CLOSE_MODAL" });
    navigate("/admin/view/crew_member");
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:9013/admin/delete/crew_member/${id}`)
      .then(() => {
        // Remove the deleted member from the table by filtering out the deleted member
        setRows(rows.filter((row) => row._id !== id));
        console.log("Crew member deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting crew member:", error);
      });
  };

  const InputExampleIconPosition = () => (
    <Input
      icon="user"
      iconPosition="left"
      placeholder="Search Crew Members..."
      focus
    />
  );

  return (
    <div className={classes.admin_mainContainer}>
      {/* <InputExampleIconPosition /> */}
      <Table celled compact definition>
        <TableHeader fullWidth>
          <TableRow>
            <TableHeaderCell>UserId</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Registration Date</TableHeaderCell>
            <TableHeaderCell>E-mail address</TableHeaderCell>
            <TableHeaderCell>Town</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
            {/* <TableHeaderCell></TableHeaderCell> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.userId}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.registrationDate}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.town || "N/A"}</TableCell>
              <TableCell>
                {/* <Button color="red" floated="center">
                  Assign New Task
                </Button>
                <Button color="red" floated="center">
                  Assign New Task
                </Button> */}
                <Button icon onClick={() => handleView(row.userId?._id)}>
                  <Icon name="eye" color="blue" />
                </Button>
                <Button icon onClick={() => handleEdit(row._id)}>
                  <Icon name="pencil" color="green" />
                </Button>
                <Button icon onClick={() => handleDelete(row._id)}>
                  <Icon name="trash" color="red" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter fullWidth>
          <TableRow>
            <TableHeaderCell colSpan="7">
              <Button
                floated="right"
                icon
                labelPosition="left"
                primary
                size="small"
                onClick={
                  () => navigate("/admin/register/crew_member")
                  //   dispatch({ type: "OPEN_MODAL", dimmer: "inverted" })
                }
              >
                <Icon name="user" /> Add Crew Member
              </Button>
            </TableHeaderCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* <Modal
        dimmer={dimmer}
        open={open}
        onClose={() => dispatch({ type: "CLOSE_MODAL" })}
      >
        <ModalHeader>Register New Crew Member</ModalHeader>
        <ModalContent>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>UserName:</label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Registration Date:</label>
              <input
                type="date"
                name="registrationDate"
                value={formData.registrationDate}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Field>
          </Form>
        </ModalContent>
        <ModalActions>
          <Button negative onClick={() => dispatch({ type: "CLOSE_MODAL" })}>
            Cancel
          </Button>
          <Button positive onClick={() => dispatch({ type: "CLOSE_MODAL" })}>
            Register
          </Button>
        </ModalActions>
      </Modal> */}
    </div>
  );
};

export default CrewMemberTableCmp;
