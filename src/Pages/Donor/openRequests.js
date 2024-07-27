import React, {useContext, useEffect, useState} from 'react';
import { Container, Grid } from 'semantic-ui-react';
import Navbar2 from '../../Components/Donor/NavBar/NavBar2';
import Sidebar3 from '../../Components/Donor/Sidebar/Sidebar3';
import OpenRequest from "../../Components/Donor/Request/OpenRequest";
import Donatenow from "../../Components/Donor/Donatenow/Donatenow";
import { UserContext } from '../../Components/Home/UserConext/UserContext';
import axios from "axios";


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
        title: 'Request for Help C',
        beneficiaryName: 'Charity Org C',
        verified: false,
        id: "as44484"
    }
];

function OpenRequestList() {

    const [requests, setRequests] = useState([])
    const { user, userDetails } = useContext(UserContext);
    const beneficiary = userDetails;

    useEffect(() => {
        get_requests()
    }, []);

    const get_requests = async () => {

        try{
            const response = await axiosInstance.post('/donor/get_requests', {open: true});
            setRequests(response.data.requests);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div style={{display: 'flex', width: '100%'}}>
            <Sidebar3/>
            <div style={{flex: '1'}}>
                <Navbar2/>
                <Container style={{marginTop: '100px'}}>
                    <Grid centered stackable columns={3}>
                        {requests.map((request, index) => (
                            <Grid.Column key={index}>
                                <OpenRequest request={request}/>
                            </Grid.Column>
                        ))}
                    </Grid>
                </Container>
            </div>
            <Donatenow/>
        </div>
    )

};

export default OpenRequestList;
