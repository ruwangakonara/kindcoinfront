import React, { useState } from "react";
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

const CrewMemberTableCmp = ({ members }) => {
  const navigate = useNavigate();

  const InputExampleIconPosition = () => (
      <Input
          icon="user"
          iconPosition="left"
          placeholder="Search Crew Members..."
          focus
      />
  );

  console.log(members)

  return (
      <div className={classes.admin_mainContainer}>
        <InputExampleIconPosition />
        <Table celled compact definition>
          <TableHeader fullWidth>
            <TableRow>
              <TableHeaderCell>#</TableHeaderCell>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Username</TableHeaderCell>
              <TableHeaderCell>Registration Date</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members && members.map((member, index) => (
                <TableRow key={member._id || index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.username}</TableCell>
                  <TableCell>{member?.created_at.slice(0,10)}</TableCell>
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
