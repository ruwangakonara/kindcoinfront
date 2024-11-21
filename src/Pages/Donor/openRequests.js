import React, { useState, useContext, useEffect } from 'react';
import { Container, Grid, Header, Form, Button } from 'semantic-ui-react';
import Navbar2 from '../../Components/Donor/NavBar/NavBar2';
import Sidebar3 from '../../Components/Donor/Sidebar/Sidebar3';
import OpenRequest from "../../Components/Donor/Request/OpenRequest";
import Donatenow from "../../Components/Donor/Donatenow/Donatenow";
import { UserContext } from '../../Components/Home/UserConext/UserContext';
import axios from "axios";
import './OpenRequestList.css'; // Make sure you have this CSS file

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});

const requests = [
    {
        image: 'https://via.placeholder.com/150',
        title: 'Request for Help A',
        beneficiaryName: 'Charity Org A',
        verified: false,
        id: "4dfadfaafaf"
    },
    {
        image: 'https://via.placeholder.com/150',
        title: 'Request for Help B',
        beneficiaryName: 'Charity Org B',
        verified: true,
        id: "dfadadvadv"
    },
    {
        image: 'https://via.placeholder.com/150',
        title: 'Request for Help C',
        beneficiaryName: 'Charity Org C',
        verified: false,
        id: "dafa554554"
    },
    {
        image: 'https://via.placeholder.com/150',
        title: 'Request for Help D',
        beneficiaryName: 'Charity Org D',
        verified: false,
        id: "as44484"
    }
];

function OpenRequestList() {
    const [requests, setRequests] = useState([]);
    const { user, userDetails } = useContext(UserContext);
    const donor = userDetails;
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        get_requests();
    }, []);

    const get_requests = async () => {
        try {
            const response = await axiosInstance.post('/donor/get_requests', { open: true });
            setRequests(response.data.requests);
            console.log(response.data.requests);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = () => {
        // Implement search logic here
        console.log('Searching for:', searchQuery);
    };

    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <Sidebar3 />
            <div style={{ flex: '1' }}>
                <Navbar2 />
                <Container style={{ marginTop: '100px' }}>
                    <Header as="h2" style={{ marginBottom: "50px" }} className="page-header">Open Requests</Header>

                    <Grid centered stackable columns={3}>
                        {requests.map((request, index) => (
                            <Grid.Column key={index}>
                                <OpenRequest request={request} />
                            </Grid.Column>
                        ))}
                    </Grid>
                </Container>
            </div>
            <Donatenow />

            {/* Fixed-position search box */}
            <div className="fixed-search-box">
                <Form onSubmit={handleSearch}>
                    <Form.Field>
                        <label>Description</label>
                        <textarea
                            placeholder="Type your description here..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            rows={6} // Multiline text box
                            style={{ width: '100%' }}
                        />
                    </Form.Field>
                    <Button primary type="submit">Search</Button>
                </Form>
                <div className="powered-by-google">
                    <img src="https://developers.google.com/static/images/branding/googlelogo/2x/googlelogo_light_color_32dp.png" alt="Powered by Google" />
                </div>
            </div>
        </div>
    );
}

export default OpenRequestList;
