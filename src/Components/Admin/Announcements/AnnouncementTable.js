import classes from "./AnnouncementTable.module.css";
import { useEffect, useState } from "react";
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
  IconGroup,
  Menu,
  Table,
  Input,
  Button,
} from "semantic-ui-react";

const AnnouncementTable = () => {
  const [announcements, setAnnouncements] = useState([]); // Store the fetched announcements here
  const navigate = useNavigate();

  // Fetch announcements from the backend
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9013/admin/handle/announcements"
        );
        setAnnouncements(response.data); // Set the fetched announcements
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements(); // Call the function when the component is mounted
  }, []);

  // Handle Edit Click
  const handleEditClick = (e, announcementId) => {
    e.stopPropagation(); // Prevent the row click event
    navigate(`/admin/handle/announcements/edit/${announcementId}`); // Navigate to the edit form with the announcement ID
  };

  // Handle Delete Click
  const handleDeleteClick = async (e, announcementId) => {
    e.stopPropagation(); // Prevent the row click event

    if (window.confirm("Are you sure you want to delete this announcement?")) {
      try {
        // Send DELETE request to the server
        const response = await axios.delete(
          `http://localhost:9013/admin/handle/announcements/deleteOne/${announcementId}`
        );
        if (response.status === 200 || response.status === 204) {
          // Remove the announcement from the state after successful deletion
          setAnnouncements((prevAnnouncements) =>
            prevAnnouncements.filter(
              (announcement) => announcement._id !== announcementId
            )
          );
          console.log("Announcement deleted successfully");
        }
      } catch (error) {
        console.error("Error deleting announcement:", error);
      }
    }
  };

  return (
    <>
      <div className={classes.admin_mainContainer}>
        <Table celled>
          <TableHeader>
            <TableRow>
              <TableHeaderCell className={classes.admin_customFont}>
                Id
              </TableHeaderCell>
              <TableHeaderCell className={classes.admin_customFont}>
                Title
              </TableHeaderCell>
              <TableHeaderCell className={classes.admin_customFont}>
                Body
              </TableHeaderCell>
              <TableHeaderCell className={classes.admin_customFont}>
                User
              </TableHeaderCell>
              <TableHeaderCell className={classes.admin_customFont}>
                Action
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(announcements) && announcements.length > 0 ? (
              announcements.map((announcement) => (
                <TableRow key={announcement._id}>
                  <TableCell>{announcement._id}</TableCell>
                  <TableCell>{announcement.title}</TableCell>
                  <TableCell>{announcement.body}</TableCell>
                  <TableCell>
                    {announcement.donor
                      ? "Donor"
                      : announcement.beneficiary
                      ? "Beneficiary"
                      : "General"}
                  </TableCell>
                  <TableCell>
                    <IconGroup size="large">
                      {/* <Icon
                        name="edit"
                        onClick={() =>
                          navigate()
                          // `/admin/handle/announcements/edit/${announcement._id}`
                        }
                        style={{ cursor: "pointer" }}
                      /> */}
                      <Icon
                        name="trash"
                        onClick={(e) => handleDeleteClick(e, announcement._id)}
                        style={{ cursor: "pointer" }}
                      />
                    </IconGroup>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="5">No announcements found</TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            {/* Optional: Add pagination if needed */}
            <TableRow>
              <TableHeaderCell colSpan="7">
                <Menu floated="right" pagination>
                  <MenuItem as="a" icon>
                    <Icon name="chevron left" />
                  </MenuItem>
                  {/* Add pagination logic here */}
                  <MenuItem as="a" icon>
                    <Icon name="chevron right" />
                  </MenuItem>
                </Menu>
              </TableHeaderCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
};

export default AnnouncementTable;
