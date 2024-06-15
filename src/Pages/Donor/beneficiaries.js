import React from 'react';
import Beneficiary from '../../Components/Donor/Beneficiary/Beneficiary';
import { Container, Grid } from 'semantic-ui-react';
import Navbar2 from "../../Components/Donor/NavBar/NavBar2";
import Sidebar from "../../Components/Donor/Sidebar/Sidebar";

const beneficiaries = [
    {
        name: 'John Doe',
        type: 'Individual',
        image: 'https://via.placeholder.com/150',
        verified: true,
        accountLink: '/beneficiary/john-doe',
    },
    {
        name: 'Charity Org',
        type: 'Organization',
        image: 'https://via.placeholder.com/150',
        verified: false,
        accountLink: '/beneficiary/charity-org',
    },
    {
        name: 'Jane Smith',
        type: 'Individual',
        image: 'https://via.placeholder.com/150',
        verified: true,
        accountLink: '/beneficiary/jane-smith',
    },
    {
        name: 'Community Center',
        type: 'Organization',
        image: 'https://via.placeholder.com/150',
        verified: true,
        accountLink: '/beneficiary/community-center',
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
                                accountLink={beneficiary.accountLink}
                            />
                        </Grid.Column>
                    ))}
                </Grid>
            </Container>
        </div>
    </div>
);

export default BeneficiaryList;
