import React from 'react';
import Beneficiary from '../../Components/Donor/Beneficiary/Beneficiary';
import { Container, Grid } from 'semantic-ui-react';
import Navbar2 from "../../Components/Donor/NavBar/NavBar2";
import Sidebar from "../../Components/Donor/Sidebar/Sidebar";
import Donatenow from "../../Components/Donor/Donatenow/Donatenow";

const beneficiaries = [
    {
        name: 'John Doe',
        type: 'Individual',
        image: 'https://via.placeholder.com/150',
        verified: true,
        id: 'hgvjknj',
    },
    {
        name: 'Charity Org',
        type: 'Organization',
        image: 'https://via.placeholder.com/150',
        verified: false,
        id: 'oijj',
    },
    {
        name: 'Jane Smith',
        type: 'Individual',
        image: 'https://via.placeholder.com/150',
        verified: true,
        id: 'iljjjijj',
    },
    {
        name: 'Community Center',
        type: 'Organization',
        image: 'https://via.placeholder.com/150',
        verified: true,
        id: 'kjbjbbbhbbb',
    },
];

const BeneficiaryList = () => (
    <div style={{ display: 'flex', width: '100%' }}>
        <Sidebar />
        <div style={{ flex: '1' }}>
            <Navbar2/>
            <Container style={{ padding: '20px', top:"100px", position: 'relative' }}>
                <Grid columns={3} stackable>
                    {beneficiaries.map((beneficiary, index) => (
                        <Grid.Column key={index} style={{ marginBottom: '20px' }}>
                            <Beneficiary
                                name={beneficiary.name}
                                type={beneficiary.type}
                                image={beneficiary.image}
                                verified={beneficiary.verified}
                                id={beneficiary.id}
                            />
                        </Grid.Column>
                    ))}
                </Grid>
            </Container>
        </div>
        <Donatenow/>
    </div>
);

export default BeneficiaryList;
