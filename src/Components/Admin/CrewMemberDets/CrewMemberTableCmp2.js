import React, { useState } from "react";
import classes from "./CrewMemberTableCmp.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

const CrewMemberTableCmp = ({ members }) => {
  const navigate = useNavigate();

  const handleDeleteClick = async (e, user_id) => {
    e.stopPropagation(); // Prevent the row click event
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        const response = await axios.delete(
          `http://localhost:9013/admin/delete_member/${user_id}`
        );
        console.log("Response for delete:", response);
        if (response.status === 200 || response.status === 204) {
          console.log("User deleted successfully:", response);
          navigate("/admin/view/crew_member");
        }
      } catch (error) {
        console.error("Error deleting member:", error);
        alert("There was an issue deleting the member.");
      }
    }
  };

  const InputExampleIconPosition = () => (
    <Input
      icon="user"
      iconPosition="left"
      placeholder="Search Crew Members..."
      focus
    />
  );

  console.log(members);

  return (
    <div className={classes.admin_mainContainer}>
      {/* <InputExampleIconPosition /> */}
      <Table celled compact definition>
        <TableHeader fullWidth>
          <TableRow>
            <TableHeaderCell>#</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Username</TableHeaderCell>
            <TableHeaderCell>Registration Date</TableHeaderCell>
            {/* <TableHeaderCell>Action</TableHeaderCell> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {members &&
            members.map((member, index) => (
              <TableRow key={member._id || index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.username}</TableCell>
                <TableCell>{member?.created_at.slice(0, 10)}</TableCell>
                {/* <TableCell>
                  <Icon
                    style={{ cursor: "pointer" }}
                    name="trash"
                    color="red"
                    onClick={(e) => handleDeleteClick(e, member.user_id)}
                  />
                </TableCell> */}
              </TableRow>
            ))}
        </TableBody>
        <TableFooter fullWidth>
          <TableRow>
            <TableHeaderCell colSpan="4">
              <Button
                floated="right"
                icon
                labelPosition="left"
                primary
                size="small"
                onClick={() => navigate("/admin/register/crew_member")}
              >
                <Icon name="user" /> Add Crew Member
              </Button>
            </TableHeaderCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default CrewMemberTableCmp;
