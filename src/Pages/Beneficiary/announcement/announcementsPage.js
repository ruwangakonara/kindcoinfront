import React, {useEffect, useState} from 'react';
import {Container, Header} from 'semantic-ui-react';
import './announcementsPage.css';
import Announcement from "../../../Components/Beneficiary/Announcement/Annnouncement";
import Navbar from "../../../Components/Beneficiary/NavBar/NavBar";
// import Donatenow from "../../Components/Donor/Donatenow/Donatenow";
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});



function BeneficiaryAnnouncementList(){
    const [announcements, setAnnouncements] = useState([]);

    const fetchAnnouncements = async () => {

        try{
            const response =  await axiosInstance.get('/beneficiary/get_announcements');
            setAnnouncements(response.data.announcements)
        } catch(error){
            console.log(error);
        }

    }

    useEffect(() => {
        fetchAnnouncements();
    }, [])
    return (
        <div>
            <Navbar/>
            <Header as="h2" style = {{marginTop: "115px"}} className="page-header">Announcements</Header>


            <Container style={{ position: "relative"}} className="announcement-list-container">

                {announcements.map((announcement, index) => (
                    <Announcement key={index} announcement={announcement}/>
                ))}
            </Container>
            {/*<Donatenow/>*/}
        </div>

    )

}

export default BeneficiaryAnnouncementList;
