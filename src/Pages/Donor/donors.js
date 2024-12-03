import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
import Navbar2 from "../../Components/Donor/NavBar/NavBar2";
import Sidebar from "../../Components/Donor/Sidebar/Sidebar";
import Donor from "../../Components/Donor/Donor/Donor";
import Donatenow from "../../Components/Donor/Donatenow/Donatenow";
import { UserContext } from '../../Components/Home/UserConext/UserContext';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});

function DonorList() {

    const [donors, setDonors] = useState([]);
    const { user, userDetails } = useContext(UserContext);
    const donor = userDetails;

    useEffect(() => {
        get_donors();
    }, []);

    const get_donors = async () => {
        try {
            const response = await axiosInstance.get('/donor/get_donors');
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


    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <Sidebar/>
            <div style={{ flex: '1' }}>
                <Navbar2/>
                <Container style={{ padding: '20px', top: "100px", position: 'relative' }}>
                    <Header as="h2" style={{ marginBottom: "50px" }} className="page-header">Donors</Header>
                    <Grid columns={3} stackable>
                        {donors.map((donor, index) => (
                            <Grid.Column key={index} style={{ marginBottom: '20px' }}>
                                <Donor
                                    name={donor.name}
                                    type={donor.type}
                                    image={donor.profile_image}
                                    rank={donor.rank}
                                    id={donor._id}
                                    anonymous={donor.anonymous}
                                    anonymous_id={donor.anonymous_id}
                                />
                            </Grid.Column>
                        ))}
                    </Grid>
                </Container>
            </div>
            <Donatenow/>
        </div>
    );
}

export default DonorList;
