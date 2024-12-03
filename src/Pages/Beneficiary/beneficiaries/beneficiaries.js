import React, {useContext, useEffect, useState} from 'react';
import Beneficiary from '../../../Components/Beneficiary/Beneficiary/Beneficiary';
import {Container, Grid, Header} from 'semantic-ui-react';
import Navbar from "../../../Components/Beneficiary/NavBar/NavBar";
import Sidebar from "../../../Components/Beneficiary/Sidebar/Sidebar";
// import Donatenow from "../../Components/Donor/Donatenow/Donatenow";
import { UserContext } from '../../../Components/Home/UserConext/UserContext';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});


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

function BeneficiaryOtherBeneficiaryList() {

    const [beneficiaries, setBeneficiaries] = useState([]);
    const { user, userDetails } = useContext(UserContext);
    const beneficiary = userDetails;

    useEffect(() => {
        get_requests();
    }, []);

    const get_requests = async () => {
        try {
            const response = await axiosInstance.get('/beneficiary/get_beneficiaries');

            const fetchedBeneficiaries = response.data.beneficiaries;
            // Filter out the donor whose _id matches donor._id
            const filteredbeneficiaries = fetchedBeneficiaries.filter(d => d._id !== beneficiary._id);

            setBeneficiaries(filteredbeneficiaries);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{display: 'flex', width: '100%'}}>
            <Sidebar/>
            <div style={{flex: '1'}}>
                <Navbar/>
                <Container style={{padding: '20px', top: "100px", position: 'relative'}}>
                    <Header as="h2" style={{marginBottom: "50px"}} className="page-header">Beneficiaries</Header>

                    <Grid columns={3} stackable>
                        {beneficiaries && beneficiaries.map((beneficiary, index) => (
                            <Grid.Column key={index} style={{ marginBottom: '20px' }}>
                                <Beneficiary
                                    name={beneficiary.name}
                                    type={beneficiary.type}
                                    image={beneficiary.profile_image}
                                    verified={beneficiary.verified}
                                    id={beneficiary._id}
                                />
                            </Grid.Column>
                        ))}
                    </Grid>
                </Container>
            </div>
            {/*<Donatenow/>*/}
        </div>
    )

};

export default BeneficiaryOtherBeneficiaryList;
