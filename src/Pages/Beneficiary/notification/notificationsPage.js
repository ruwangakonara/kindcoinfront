import React, { useContext, useEffect, useState } from 'react';
import { Container, Header, Grid } from 'semantic-ui-react'; // Import Grid from Semantic UI
import Navbar from "../../../Components/Beneficiary/NavBar/NavBar";
import Requestnow from "../../../Components/Beneficiary/Donatenow/Requestnow";
import axios from "axios";
import Notification from '../../../Components/Beneficiary/notification/notification'; // Import the Notification component
import { UserContext } from '../../../Components/Home/UserConext/UserContext';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});

function BeneficiaryNotificationList() {
    const { user, userDetails } = useContext(UserContext);
    const beneficiary = userDetails;
    const [notifications, setNotifications] = useState([]);

    const fetchNotifications = async () => {
        try {
            const response = await axiosInstance.get('/beneficiary/get_notifications');
            const notify = response.data.notifications;
            setNotifications(notify);
        } catch (error) {
            console.log(error);
        }
    };

    const handleNotificationClick = async (id) => {
        try {
            const response = await axiosInstance.post('/beneficiary/mark_as_viewed', { notify_id: id , beneficiary_id: beneficiary._id });
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
            <Navbar />
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
            <Requestnow />
        </div>
    );
}

export default BeneficiaryNotificationList;
