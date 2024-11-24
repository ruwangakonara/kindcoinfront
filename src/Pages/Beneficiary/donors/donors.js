import React, {useContext, useEffect, useState} from 'react';
import {Container, Grid, Header} from 'semantic-ui-react';
import Navbar from "../../../Components/Beneficiary/NavBar/NavBar";
import Sidebar from "../../../Components/Beneficiary/Sidebar/Sidebar";
import Donor from "../../../Components/Beneficiary/Donor/Donor";
import { UserContext } from '../../../Components/Home/UserConext/UserContext';
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});

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

    const [donors, setDonors] = useState([]);
    const { user, userDetails } = useContext(UserContext);
    const beneficiary = userDetails;

    useEffect(() => {
        get_donors();
    }, []);

    const get_donors = async () => {
        try {
            const response = await axiosInstance.get('/beneficiary/get_donors');
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



    return(
    <div style={{display: 'flex', width: '100%'}}>
        <Sidebar/>
        <div style={{flex: '1'}}>
            <Navbar/>
            <Container style={{padding: '20px', top: "100px", position: 'relative'}}>
                <Header as="h2" style = {{marginBottom: "50px"}} className="page-header">Donor</Header>

                <Grid columns={3} stackable>
                    {donors.map((donor, index) => (
                        <Grid.Column key={index} style={{marginBottom: '20px'}}>
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
    </div>
    )
};

export default BeneficiaryDonorList;
