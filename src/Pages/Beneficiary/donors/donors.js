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
        get_requests();
    }, []);

    const get_requests = async () => {
        try {
            const response = await axiosInstance.get('/beneficiary/get_donors');
            const fetchedDonors = response.data.donors;
            // Filter out the donor whose _id matches donor._id
            // Sort donors by donated_amount in descending order
            fetchedDonors.sort((a, b) => b.donated_amount - a.donated_amount);

            // Assign ranks with tie handling
            const rankedDonors = fetchedDonors.map((d, index, arr) => {
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
            setDonors(response.data.donors);
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
