import React from 'react';
import { Card, Icon, Label } from 'semantic-ui-react';
import './notification.css'; // Ensure you create this CSS file for custom styles

const Notification = ({ notification, onClick }) => {
    const handleClick = () => {
        onClick(notification._id); // Call the clicked function with the notification ID
    };

    console.log(notification);

    let description;

    if (notification?.notificationDetails?.title === "New Donation Listed") {
        description = (
            <>
                Your Request{" "}
                <strong><em>
                    <a href={`http://localhost:3000/beneficiary/${notification?.requestDetails?.open ? "open-requests" : "closed-requests"}/${notification?.requestDetails?._id}`}>
                        {notification?.requestDetails?.title}
                    </a>
                </em></strong>{" "}
                has Received a Donation{" "}
                <strong><em>
                    <a href={`http://localhost:3000/donor/unaccepted-donations/${notification?.donationDetails?._id}`}>
                        {notification?.donationDetails?.title}
                    </a>
                </em></strong>{" "}

                from {" "}
                <strong><em>
                    <a href={`http://localhost:3000/beneficiary/donors/${notification?.donorDetails?._id}`}>
                        {notification?.donorDetails?.name}
                    </a>
                </em></strong>.
            </>
        );
    } else if (notification?.notificationDetails?.title === "Donation Reception Verified") {
        description = (
            <>
                The Donation{" "}
                <strong><em>
                    <a href={`http://localhost:3000/beneficiary/completed-donations/${notification?.donationDetails?._id}`}>
                        {notification?.donationDetails?.title}
                    </a>
                </em></strong>{" "}
                to your Request{" "}
                <strong><em>
                    <a href={`http://localhost:3000/beneficiary/${notification?.requestDetails?.open ? "open-requests" : "closed-requests"}/${notification?.requestDetails?._id}`}>
                        {notification?.requestDetails?.title}
                    </a>
                </em></strong>{" "}
                by{" "}
                <strong><em>
                    <a href={`http://localhost:3000/beneficiary/donors/${notification?.donorDetails?._id}`}>
                        {notification?.donorDetails?.name}
                    </a>
                </em></strong>{" "}
                has been verified as passed.
            </>
        );
    }
    else if (notification?.notificationDetails?.title === "Donation Usage Reported Unsatisfactory") {
        description = (
            <>
                The evident usage of the Donation{" "}
                <strong><em>
                    <a href={`http://localhost:3000/beneficiary/completed-donations/${notification?.donationDetails?._id}`}>
                        {notification?.donationDetails?.title}
                    </a>
                </em></strong>{" "}
                by{" "}
                <strong><em>
                    <a href={`http://localhost:3000/beneficiary/donors/${notification?.donorDetails?._id}`}>
                        {notification?.donorDetails?.name}
                    </a>
                </em></strong>{" "}
                to Your Request{" "}
                <strong><em>
                    <a href={`http://localhost:3000/beneficiary/${notification?.requestDetails?.open ? "open-requests" : "closed-requests"}/${notification?.requestDetails?._id}`}>
                        {notification?.requestDetails?.title}
                    </a>
                </em></strong>{" "}

                has been raised as unsatisfactory by the donor. Change Usage Details.
            </>
        );
    } else {
        description = (
            <>
                The evident usage of the Donation{" "}
                <strong><em>
                    <a href={`http://localhost:3000/beneficiary/completed-donations/${notification?.donationDetails?._id}`}>
                        {notification?.donationDetails?.title}
                    </a>
                </em></strong>{" "}
                by{" "}
                <strong><em>
                    <a href={`http://localhost:3000/beneficiary/donors/${notification?.donorDetails?._id}`}>
                        {notification?.donorDetails?.name}
                    </a>
                </em></strong>{" "}
                to Your Request{" "}
                <strong><em>
                    <a href={`http://localhost:3000/beneficiary/${notification?.requestDetails?.open ? "open-requests" : "closed-requests"}/${notification?.requestDetails?._id}`}>
                        {notification?.requestDetails?.title}
                    </a>
                </em></strong>{" "}

                had been raised as unsatisfactory by the donor. They have revoked that report.
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
