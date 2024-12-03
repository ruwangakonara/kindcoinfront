import classes from "./RaisedTicketsTableCmp.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
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
import HeaderCmp from "../Header/HeaderCmp";
import DefaultDashCmp from "../DashboardComp/DefaultDashCmp";
import ChatWindow from "./ChatWindow";

const TicketDiscussionCmp = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  // const [activeRows, setActiveRows] = useState({});

  // const [selectedUser, setSelectedUser] = useState(null);

  // Fetch tickets from the backend
  //   useEffect(() => {
  //     axios
  //       .get("http://localhost:9013/admin/tickets")
  //       .then((response) => {
  //         setTickets(response.data); // Assuming the response contains the tickets array
  //         console.log(response.data);
  //         console.log(tickets);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching tickets:", error);
  //       });
  //   }, []);

  return (
    <>
      <HeaderCmp />
      <div className={classes.content}>
        <DefaultDashCmp>
          <h1 style={{}}>Discussion for the Ticket</h1>
        </DefaultDashCmp>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <ChatWindow />
        </div>
      </div>
      <div className={classes.mainContainer}></div>
    </>
  );
};

export default TicketDiscussionCmp;
