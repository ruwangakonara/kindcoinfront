import React from 'react';
import {Container, Header} from 'semantic-ui-react';
import './announcementsPage.css';
import Announcement from "../../Components/Donor/Announcement/Annnouncement";
import Navbar2 from "../../Components/Donor/NavBar/NavBar2";
import Donatenow from "../../Components/Donor/Donatenow/Donatenow";

const announcements = [
    {
        title: 'New Donation Campaign',
        body: 'We are excited to announce a new donation campaign to help local schools.',
        postedDateTime: '2024-06-01 10:00 AM'
    },
    {
        title: 'Volunteer Appreciation Day',
        body: 'Join us for a day of appreciation for all our dedicated volunteers.',
        postedDateTime: '2024-06-10 02:00 PM'
    },
    {
        title: 'Charity Marathon',
        body: 'Participate in our annual charity marathon to raise funds for various causes.',
        postedDateTime: '2024-06-15 08:00 AM'
    }
];

const AnnouncementList = () => (
    <div>
        <Navbar2/>


        <Container style = {{top: "150px", position: "relative"}} className="announcement-list-container">

            {announcements.map((announcement, index) => (
                <Announcement key={index} announcement={announcement} />
            ))}
        </Container>
        <Donatenow/>
    </div>

);

export default AnnouncementList;
