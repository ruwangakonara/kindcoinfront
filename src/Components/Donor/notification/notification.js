import React from 'react';
import { Card, Icon, Label, Button } from 'semantic-ui-react';
import './notification.css'; // Ensure you create this CSS file for custom styles

const Notification = ({ notification, onClick }) => {
    const handleClick = () => {
        onClick(notification._id); // Call the clicked function with the notification ID
    };

    var description

    if(notification?.notificationDetalis?.title == "Donation Accepted"){

         description = "Your Listing " + <a href={`http://localhost:3000/donor/ongoing-donations/${notification?.donationDetails?._id}`}>{notification?.donationDetails?.title}</a> + " to Request " + <a href={`http://localhost:3000/donor/${notification?.requestDetails?.open ? "open-requests": "closed-requests"}/${notification?.requestDetails?._id}`}> {notification?.requestDetails?.title} </a>+ " by " + <a href={`http://localhost:3000/donor/beneficiaries/${notification?.beneficiaryDetails?._id}`} >{notification?.beneficiaryDetails?.name}</a> + " has been accepted.";

    } else if(notification?.notificationDetalis?.title === "Donation Verified"){

         description = "Your Donation " + <a href={`http://localhost:3000/donor/pending-rewards/${notification?.donationDetails?._id}`}>{notification?.donationDetails?.title}</a> + " to Request " + <a href={`http://localhost:3000/donor/${notification?.requestDetails?.open ? "open-requests": "closed-requests"}/${notification?.requestDetails?._id}`}> {notification?.requestDetails?.title} </a>+ " by " + <a href={`http://localhost:3000/donor/beneficiaries/${notification?.beneficiaryDetails?._id}`} >{notification?.beneficiaryDetails?.name}</a> + " has been verified.";

    } else if(notification?.notificationDetalis?.title === "KINDCOIN Transferred") {

         description = "Your Donation " +
            <a href={`http://localhost:3000/donor/completed-donations/${notification?.donationDetails?._id}`}>{notification?.donationDetails?.title}</a> + " to Request " +
            <a href={`http://localhost:3000/donor/${notification?.requestDetails?.open ? "open-requests" : "closed-requests"}/${notification?.requestDetails?._id}`}> {notification?.requestDetails?.title} </a> + " by " +
            <a href={`http://localhost:3000/donor/beneficiaries/${notification?.beneficiaryDetails?._id}`}>{notification?.beneficiaryDetails?.name}</a> + " has received KINDCOIN.";

    } else {
         description = "Your Donation " + <a href={`http://localhost:3000/donor/completed-donations/${notification?.donationDetails?._id}`}>{notification?.donationDetails?.title}</a> + " to Request " + <a href={`http://localhost:3000/donor/${notification?.requestDetails?.open ? "open-requests": "closed-requests"}/${notification?.requestDetails?._id}`}> {notification?.requestDetails?.title} </a>+ " by " + <a href={`http://localhost:3000/donor/beneficiaries/${notification?.beneficiaryDetails?._id}`} >{notification?.beneficiaryDetails?.name}</a> + " has received verification for its donation attestation fee.";

    }

    console.log(description)
        return (
        <Card className={`notification-card ${notification?.notificationDetails?.viewed ? 'viewed' : ''}`} onClick={handleClick}>
            <Card.Content>
                <Card.Header>{notification?.notificationDetalis?.title}</Card.Header>
                <Card.Meta>{description}</Card.Meta>
                <Card.Description>
                    {notification?.notificationDetails?.viewed ? (
                        <Label color="green" className="viewed-label">
                            <Icon name="check" />
                            Viewed
                        </Label>
                    ) : (
                        <Label color="red" className="unviewed-label">
                            <Icon name="circle" />
                            New
                        </Label>
                    )}
                </Card.Description>
            </Card.Content>
        </Card>
    );
};

export default Notification;
