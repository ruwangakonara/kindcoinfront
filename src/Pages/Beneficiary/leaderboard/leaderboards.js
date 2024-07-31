import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import Navbar from "../../../Components/Beneficiary/NavBar/NavBar";
import LeaderBoard from "../../../Components/Beneficiary/LeaderBoard/LeaderBoard";
// import Sidebar4 from "../../../Components/B/Sidebar/Sidebar4";

const donors = [
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

const BeneficiaryDonorLeaderboards = () => {
    // Sort donors by rank in ascending order
    const sortedDonors = donors.sort((a, b) => a.rank - b.rank);

    return (
        <div style={{ display: 'flex', width: '100%' }}>
            {/*<Sidebar4/>*/}
            <div style={{ flex: '1' }}>
                <Navbar/>
                <Container style={{ padding: '20px', top: '100px', position: 'relative' }}>
                    <Grid columns={3} stackable>
                        {sortedDonors.map((donor, index) => (
                            <Grid.Column width={16} key={index} style={{ marginBottom: '20px' }}>
                                <LeaderBoard
                                    name={donor.name}
                                    type={donor.type}
                                    image={donor.image}
                                    rank={donor.rank}
                                    id={donor.id}
                                />
                            </Grid.Column>
                        ))}
                    </Grid>
                </Container>
            </div>
        </div>
    );
};

export default BeneficiaryDonorLeaderboards;
