import React from 'react';
import { Card, Icon, Label } from 'semantic-ui-react';
import './notification.css'; // Ensure you create this CSS file for custom styles

const Notification = ({ notification, onClick }) => {
    const handleClick = () => {
        onClick(notification._id); // Call the clicked function with the notification ID
    };

    console.log(notification);

    let description;

    if (notification?.notificationDetails?.title === "Donation Accepted") {
        description = (
            <>
                Your Listing{" "}
                <strong><em>
                    <a href={`http://localhost:3000/donor/ongoing-donations/${notification?.donationDetails?._id}`}>
                        {notification?.donationDetails?.title}
                    </a>
                </em></strong>{" "}
                to Request{" "}
                <strong><em>
                    <a href={`http://localhost:3000/donor/${notification?.requestDetails?.open ? "open-requests" : "closed-requests"}/${notification?.requestDetails?._id}`}>
                        {notification?.requestDetails?.title}
                    </a>
                </em></strong>{" "}
                by{" "}
                <strong><em>
                    <a href={`http://localhost:3000/donor/beneficiaries/${notification?.beneficiaryDetails?._id}`}>
                        {notification?.beneficiaryDetails?.name}
                    </a>
                </em></strong>{" "}
                has been accepted.
            </>
        );
    } else if (notification?.notificationDetails?.title === "Donation Verified") {
        description = (
            <>
                Your Donation{" "}
                <strong><em>
                    <a href={`http://localhost:3000/donor/pending-rewards/${notification?.donationDetails?._id}`}>
                        {notification?.donationDetails?.title}
                    </a>
                </em></strong>{" "}
                to Request{" "}
                <strong><em>
                    <a href={`http://localhost:3000/donor/${notification?.requestDetails?.open ? "open-requests" : "closed-requests"}/${notification?.requestDetails?._id}`}>
                        {notification?.requestDetails?.title}
                    </a>
                </em></strong>{" "}
                by{" "}
                <strong><em>
                    <a href={`http://localhost:3000/donor/beneficiaries/${notification?.beneficiaryDetails?._id}`}>
                        {notification?.beneficiaryDetails?.name}
                    </a>
                </em></strong>{" "}
                has been verified.
            </>
        );
    } else if (notification?.notificationDetails?.title === "KINDCOIN Transferred") {
        description = (
            <>
                Your Donation{" "}
                <strong><em>
                    <a href={`http://localhost:3000/donor/completed-donations/${notification?.donationDetails?._id}`}>
                        {notification?.donationDetails?.title}
                    </a>
                </em></strong>{" "}
                to Request{" "}
                <strong><em>
                    <a href={`http://localhost:3000/donor/${notification?.requestDetails?.open ? "open-requests" : "closed-requests"}/${notification?.requestDetails?._id}`}>
                        {notification?.requestDetails?.title}
                    </a>
                </em></strong>{" "}
                by{" "}
                <strong><em>
                    <a href={`http://localhost:3000/donor/beneficiaries/${notification?.beneficiaryDetails?._id}`}>
                        {notification?.beneficiaryDetails?.name}
                    </a>
                </em></strong>{" "}
                has received KINDCOIN.
            </>
        );
    } else if (notification?.notificationDetails?.title === "Donation Usage Details Changed") {
        description = (
            <>
                Usage Details for your Donation{" "}
                <strong><em>
                    <a href={`http://localhost:3000/donor/completed-donations/${notification?.donationDetails?._id}`}>
                        {notification?.donationDetails?.title}
                    </a>
                </em></strong>{" "}
                to Request{" "}
                <strong><em>
                    <a href={`http://localhost:3000/donor/${notification?.requestDetails?.open ? "open-requests" : "closed-requests"}/${notification?.requestDetails?._id}`}>
                        {notification?.requestDetails?.title}
                    </a>
                </em></strong>{" "}
                by{" "}
                <strong><em>
                    <a href={`http://localhost:3000/donor/beneficiaries/${notification?.beneficiaryDetails?._id}`}>
                        {notification?.beneficiaryDetails?.name}
                    </a>
                </em></strong>{" "}
                has been modified by the Beneficiary since you had reported them unsatisfactory.
            </>
        );
    }else {
        description = (
            <>
                Your Donation{" "}
                <strong><em>
                    <a href={`http://localhost:3000/donor/completed-donations/${notification?.donationDetails?._id}`}>
                        {notification?.donationDetails?.title}
                    </a>
                </em></strong>{" "}
                to Request{" "}
                <strong><em>
                    <a href={`http://localhost:3000/donor/${notification?.requestDetails?.open ? "open-requests" : "closed-requests"}/${notification?.requestDetails?._id}`}>
                        {notification?.requestDetails?.title}
                    </a>
                </em></strong>{" "}
                by{" "}
                <strong><em>
                    <a href={`http://localhost:3000/donor/beneficiaries/${notification?.beneficiaryDetails?._id}`}>
                        {notification?.beneficiaryDetails?.name}
                    </a>
                </em></strong>{" "}
                has received verification for its donation attestation fee.
            </>
        );
    }


    console.log(description);

    return (
        <Card className={`notification-card ${notification?.notificationDetails?.viewed ? 'viewed' : ''}`} onClick={() => handleClick(notification?.notificationDetails?._id)}>
            <Card.Content>
                <Card.Header>{notification?.notificationDetails?.title}</Card.Header>
                <Card.Meta>{description}</Card.Meta>
                <Card.Meta>{notification?.notificationDetails?.created_at.slice(0,10) + "@" + notification?.notificationDetails?.created_at.slice(11,16)}</Card.Meta>
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
