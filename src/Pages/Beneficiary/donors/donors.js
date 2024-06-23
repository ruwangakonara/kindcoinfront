import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import Navbar from "../../../Components/Beneficiary/NavBar/NavBar";
import Sidebar from "../../../Components/Beneficiary/Sidebar/Sidebar";
import Donor from "../../../Components/Beneficiary/Donor/Donor";

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

function  BeneficiaryDonorList() {


    return(
    <div style={{display: 'flex', width: '100%'}}>
        <Sidebar/>
        <div style={{flex: '1'}}>
            <Navbar/>
            <Container style={{padding: '20px', top: "100px", position: 'relative'}}>
                <Grid columns={3} stackable>
                    {beneficiaries.map((beneficiary, index) => (
                        <Grid.Column key={index} style={{marginBottom: '20px'}}>
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
    )
};

export default BeneficiaryDonorList;
