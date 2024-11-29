import React, {useEffect, useState} from 'react';
import {Container, Header} from 'semantic-ui-react';
import './announcementsPage.css';
import Announcement from "../../Components/Donor/Announcement/Annnouncement";
import Navbar2 from "../../Components/Donor/NavBar/NavBar2";
import Donatenow from "../../Components/Donor/Donatenow/Donatenow";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});

 function AnnouncementList() {
    const [announcements, setAnnouncements] = useState([]);

    const fetchAnnouncements = async () => {

        try{
            const response =  await axiosInstance.get('/donor/get_announcements');
            setAnnouncements(response.data.announcements)
        } catch(error){
            console.log(error);
        }

    }

    useEffect(() => {
        fetchAnnouncements();
    }, [])

    return (<div>
        <Navbar2/>

        <Header as="h2" style = {{marginTop: "115px"}} className="page-header">Announcements</Header>

        <Container style={{ position: "relative"}} className="announcement-list-container">

            { announcements && announcements.map((announcement, index) => (
                <Announcement key={index} announcement={announcement}/>
            ))}
        </Container>
        <Donatenow/>
    </div>)


};

export default AnnouncementList;
