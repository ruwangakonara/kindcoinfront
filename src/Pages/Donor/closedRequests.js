import React from 'react';
import {Container, Grid, Header} from 'semantic-ui-react';
import Navbar2 from '../../Components/Donor/NavBar/NavBar2';
import Sidebar3 from '../../Components/Donor/Sidebar/Sidebar3';
import OpenRequest from "../../Components/Donor/Request/OpenRequest";
import ClosedRequest from "../../Components/Donor/Request/ClosedRequest.js";
import Donatenow from "../../Components/Donor/Donatenow/Donatenow";

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

const ClosedRequestList = () => (
    <div style={{ display: 'flex', width: '100%' }}>
        <Sidebar3 />
        <div style={{ flex: '1' }}>
            <Navbar2 />
            <Container style={{ marginTop: '100px' }}>
                <Header as="h2" style = {{marginBottom: "50px"}} className="page-header">Closed Requests</Header>

                <Grid centered stackable columns={3}>
                    {requests.map((request, index) => (
                        <Grid.Column key={index}>
                            <ClosedRequest request={request} />
                        </Grid.Column>
                    ))}
                </Grid>
            </Container>
        </div>
        <Donatenow/>
    </div>
);

export default ClosedRequestList;
