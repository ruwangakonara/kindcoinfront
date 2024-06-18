import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import Navbar2 from "../../Components/Donor/NavBar/NavBar2";
import Sidebar from "../../Components/Donor/Sidebar/Sidebar";
import Donor from "../../Components/Donor/Donor/Donor";

const beneficiaries = [
    {
        name: 'John Doe',
        type: 'Individual',
        image: 'https://via.placeholder.com/150',
        rank: 4,
        id: 'dadvadv',
    },
    {
        name: 'Charity Org',
        type: 'Organization',
        image: 'https://via.placeholder.com/150',
        rank: 2,
        id: 'dadadadvdv',
    },
    {
        name: 'Jane Smith',
        type: 'Individual',
        image: 'https://via.placeholder.com/150',
        rank: 1,
        id: 'afafaadvv',
    },
    {
        name: 'Community Center',
        type: 'Organization',
        image: 'https://via.placeholder.com/150',
        rank: 3,
        id: 'acdvsvv',
    },
];

const DonorList = () => (
    <div style={{ display: 'flex', width: '100%' }}>
        <Sidebar />
        <div style={{ flex: '1' }}>
            <Navbar2/>
            <Container style={{ padding: '20px', top:"100px", position: 'relative' }}>
                <Grid columns={3} stackable>
                    {beneficiaries.map((beneficiary, index) => (
                        <Grid.Column key={index} style={{ marginBottom: '20px' }}>
                            <Donor
                                name={beneficiary.name}
                                type={beneficiary.type}
                                image={beneficiary.image}
                                rank={beneficiary.rank}
                                id={beneficiary.id}
                            />
                        </Grid.Column>
                    ))}
                </Grid>
            </Container>
        </div>
    </div>
);

export default DonorList;