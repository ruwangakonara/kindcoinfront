import React, { useContext, useEffect, useState } from 'react';
import { Container, Header, Grid } from 'semantic-ui-react'; // Import Grid from Semantic UI
import Navbar2 from "../../../Components/Donor/NavBar/NavBar2";
import Donatenow from "../../../Components/Donor/Donatenow/Donatenow";
import axios from 'axios';
import Notification from '../../../Components/Donor/notification/notification'; // Import the Notification component
import { UserContext } from '../../../Components/Home/UserConext/UserContext';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});

function DonorNotificationList() {
    const { user, userDetails } = useContext(UserContext);
    const donor = userDetails;
    const [notifications, setNotifications] = useState([]);

    const fetchNotifications = async () => {
        try {
            const response = await axiosInstance.get('/donor/get_notifications');
            const notify = response.data.notifications;
            setNotifications(notify);
        } catch (error) {
            console.log(error);
        }
    };

    const handleNotificationClick = async (id) => {
        try {
            const response = await axiosInstance.post('/donor/mark_as_viewed', { notify_id: id , donor_id: donor._id });
            if (response.status === 200) {
                setNotifications(notifications.map(notification =>
                    notification._id === id
                        ? { ...notification, notificationDetails: { ...notification.notificationDetails, viewed: true } }
                        : notification
                ));
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <div>
            <Navbar2 />
            <Header as="h2" style={{ marginTop: "115px" }} className="page-header">Notifications</Header>

            <Container style={{ position: "relative" }} className="announcement-list-container">
                <Grid stackable columns={3}> {/* Use grid with stackable and 3 columns */}
                    {notifications && notifications.map((notification) => (
                        <Grid.Column key={notification.notificationDetails._id}>
                            <Notification
                                notification={notification}
                                onClick={handleNotificationClick} // Pass the function to handle clicks
                            />
                        </Grid.Column>
                    ))}
                </Grid>
            </Container>
            <Donatenow />
        </div>
    );
}

export default DonorNotificationList;
