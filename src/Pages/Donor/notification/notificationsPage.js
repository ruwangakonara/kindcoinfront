import React, {useContext, useEffect, useState} from 'react';
import { Container, Header } from 'semantic-ui-react';
import Navbar2 from "../../../Components/Donor/NavBar/NavBar2";
import Donatenow from "../../../Components/Donor/Donatenow/Donatenow";
import axios from "axios";
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
            // setNotifications(response.data.notifications);
            const notify = response.data.notifications
            console.log(notify)

            await setNotifications(notify)
            console.log(notifications)

        } catch (error) {
            console.log(error);
        }
    };

    const handleNotificationClick = async (id) => {
        try {
            // Mark the notification as viewed by making an API call
            const response = await axiosInstance.post('/donor/mark_as_viewed', { notify_id: id , donor_id: donor._id});

            // Update the local state to reflect the change
           if(response.status === 200){
               setNotifications(notifications.map(notification =>
                   notification._id === id
                       ? { ...notification, notificationDetails: { ...notification.notificationDetails, viewed: true } }
                       : notification
               ));
           }  else {
               throw new Error(response.statusText);
           }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    // useEffect(() => {
    //     console.log("Updated notifications:", notifications);
    // }, [notifications]);

    return (
        <div>
            <Navbar2 />
            <Header as="h2" style={{ marginTop: "115px" }} className="page-header">Notifications</Header>

            <Container style={{ position: "relative" }} className="announcement-list-container">
                {notifications && notifications.map((notification) => (
                    <Notification
                        key={notification.notificationDetails._id}
                        notification={notification}
                        onClick={handleNotificationClick} // Pass the function to handle clicks
                    />
                ))}
            </Container>
            <Donatenow />
        </div>
    );
}

export default DonorNotificationList;
