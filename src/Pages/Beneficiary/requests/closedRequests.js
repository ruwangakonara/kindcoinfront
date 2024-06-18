import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import Navbar from '../../../Components/Beneficiary/NavBar/NavBar';
import Sidebar3 from '../../../Components/Beneficiary/Sidebar/Sidebar3';
import ClosedRequest from "../../../Components/Beneficiary/Request/ClosedRequest.js";

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

const BeneficiaryOwnClosedRequestList = () => (
    <div style={{ display: 'flex', width: '100%' }}>
        <Sidebar3 />
        <div style={{ flex: '1' }}>
            <Navbar />
            <Container style={{ marginTop: '100px' }}>
                <Grid centered stackable columns={3}>
                    {requests.map((request, index) => (
                        <Grid.Column key={index}>
                            <ClosedRequest request={request} />
                        </Grid.Column>
                    ))}
                </Grid>
            </Container>
        </div>
    </div>
);

export default BeneficiaryOwnClosedRequestList;
