import React, {useContext, useEffect, useState} from 'react';
import { Container, Grid } from 'semantic-ui-react';
import Navbar2 from "../../../Components/Donor/NavBar/NavBar2";
import LeaderBoard from "../../../Components/Donor/LeaderBoard/LeaderBoard";
import Sidebar4 from "../../../Components/Donor/Sidebar/Sidebar4";
import axios from "axios";
import { UserContext } from '../../../Components/Home/UserConext/UserContext';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});

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

const DonorLeaderboards = () => {
    // Sort donors by rank in ascending order
    const [donors, setDonors] = useState([]);
    const { user, userDetails } = useContext(UserContext);
    const mdonor = userDetails;

    useEffect(() => {
        get_donors();
    }, []);

    const get_donors = async () => {
        try {
            const response = await axiosInstance.get('/donor/get_leader_donors');
            const fetchedDonors = response.data.donors;

            // Sort donors by donated_amount in descending order
            fetchedDonors.sort((a, b) => b.donated - a.donated);

            // Assign ranks with tie handling
            let previousRank = 1;
            const rankedDonors = fetchedDonors.map((d, index, arr) => {
                if (index > 0 && d.donated === arr[index - 1].donated) {
                    // If donated amount is the same as the previous, assign the same rank
                    d.rank = previousRank;
                } else {
                    // Otherwise, update rank based on index
                    d.rank = index + 1;
                    previousRank = d.rank; // Store this rank for potential ties
                }

                return d;
            });

            setDonors(rankedDonors);
        } catch (error) {
            console.log(error);
        }
    };

    const userRank = donors.find(donor => donor._id === mdonor._id)?.rank;


    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <Sidebar4 userRank={userRank} />
            <div style={{ flex: '1' }}>
                <Navbar2/>
                <Container style={{ padding: '20px', top: '100px', position: 'relative' }}>
                    <Grid columns={3} stackable>
                        {donors.map((donor, index) => (
                            <Grid.Column width={16} key={index} style={{ marginBottom: '20px' }}>
                                <LeaderBoard
                                    name={donor.name}
                                    type={donor.type}
                                    image={donor.profile_image}
                                    rank={donor.rank}
                                    id={donor._id}
                                />
                            </Grid.Column>
                        ))}
                    </Grid>
                </Container>
            </div>
        </div>
    );
};

export default DonorLeaderboards;
