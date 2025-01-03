import React, {useContext, useEffect, useState} from 'react';
import {Container, Grid, Header} from 'semantic-ui-react';
import Navbar from '../../../Components/Beneficiary/NavBar/NavBar';
import Sidebar4 from '../../../Components/Beneficiary/Sidebar/Sidebar4';
import OtherOpenRequest from "../../../Components/Beneficiary/OtherRequest/OtherOpenRequest.js";
import { UserContext } from '../../../Components/Home/UserConext/UserContext';
import axios from 'axios';


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
        beneficiaryName: 'Charity Org A',
        verified: true,
        id: "dfadadvadv"
    },
    {
        image: 'https://via.placeholder.com/150',
        title: 'Request for Help C',
        beneficiaryName: 'Charity Org A',
        verified: false,
        id: "dafa554554"
    },
    {
        image: 'https://via.placeholder.com/150',
        title: 'Request for Help C',
        beneficiaryName: 'Charity Org A',
        verified: false,
        id: "as44484"
    }
];

function BeneficiaryOtherOpenRequestList() {

    const [otherrequests, setRequests] = useState([])
    const { user, userDetails } = useContext(UserContext);
    const beneficiary = userDetails;

    useEffect(() => {
        get_requests();
    }, []);

    const get_requests = async () => {
        try {
            const response = await axiosInstance.post('/beneficiary/get_requests', { open: true });
            const req = response.data.requests.filter(d => d.beneficiary_id !== beneficiary._id);
            setRequests(req);
        } catch (error) {
            console.log(error);
        }
    };

    return(
    <div style={{display: 'flex', width: '100%'}}>
        <Sidebar4/>
        <div style={{flex: '1'}}>
            <Navbar/>
            <Container style={{marginTop: '100px'}}>
                <Header as="h2" style = {{marginBottom: "50px"}} className="page-header">Open Requests</Header>

                <Grid centered stackable columns={3}>
                    { otherrequests && otherrequests.map((request, index) => (
                        <Grid.Column key={index}>
                            <OtherOpenRequest request={request}/>
                        </Grid.Column>
                    ))}
                </Grid>
            </Container>
        </div>
    </div>
    )
};

export default BeneficiaryOtherOpenRequestList;
