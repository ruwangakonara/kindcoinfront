import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
import Navbar2 from "../../Components/Donor/NavBar/NavBar2";
import Sidebar from "../../Components/Donor/Sidebar/Sidebar";
import Donor from "../../Components/Donor/Donor/Donor";
import Donatenow from "../../Components/Donor/Donatenow/Donatenow";
import { UserContext } from '../../Components/Home/UserConext/UserContext';
import axios from "axios";

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
            // Filter out the donor whose _id matches donor._id
            const filteredDonors = fetchedDonors.filter(d => d._id !== donor._id);
            // Sort donors by donated_amount in descending order
            filteredDonors.sort((a, b) => b.donated_amount - a.donated_amount);

            // Assign ranks with tie handling
            const rankedDonors = filteredDonors.map((d, index, arr) => {
                const currentAmount = d.donated_amount;
                const previousDonor = arr[index - 1];
                let rank = index + 1; // Default rank

                // Check if the current donor has the same donated_amount as the previous donor
                if (previousDonor && currentAmount === previousDonor.donated_amount) {
                    rank = previousDonor.rank; // Assign the same rank as the previous donor
                }

                return {
                    ...d,
                    rank: rank
                };
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
