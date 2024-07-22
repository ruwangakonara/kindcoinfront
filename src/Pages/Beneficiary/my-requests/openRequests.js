import React, {useContext, useEffect, useState} from 'react';
import { Container, Grid } from 'semantic-ui-react';
import Navbar from '../../../Components/Beneficiary/NavBar/NavBar';
import Sidebar3 from '../../../Components/Beneficiary/Sidebar/Sidebar3';
import OpenRequest from "../../../Components/Beneficiary/Request/OpenRequest";
import { UserContext } from '../../../Components/Home/UserConext/UserContext';
import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});

const requests = [

    {
        image: 'https://via.placeholder.com/150',
        title: 'Request for Help A',
        beneficiaryName: 'Charity Org A',
        verified: false,
        id: "4dfadfaafaf"
    },
    {
        image: 'https://via.placeholder.com/150',
        title: 'Request for Help B',
        beneficiaryName: 'Charity Org A',
        verified: true,
        id: "dfadadvadv"
    },
    {
        image: 'https://via.placeholder.com/150',
        title: 'Request for Help C',
        beneficiaryName: 'Charity Org A',
        verified: false,
        id: "dafa554554"
    },
    {
        image: 'https://via.placeholder.com/150',
        title: 'Request for Help C',
        beneficiaryName: 'Charity Org A',
        verified: false,
        id: "as44484"
    }
];

function BeneficiaryOwnOpenRequestList() {

    const [requests, setRequests] = useState([])
    const { user, userDetails } = useContext(UserContext);
    const beneficiary = userDetails;

    useEffect(() => {
        get_requests()
    }, []);

    const get_requests = async () => {

        try{
            const response = await axiosInstance.post('/beneficiary/get_my_requests', {user_id: user._id, beneficiary_id: beneficiary._id, open: true});
            setRequests(response.data.requests);
        } catch (error) {
            console.log(error);
        }
    }

    return(
    <div style={{display: 'flex', width: '100%'}}>
        <Sidebar3/>
        <div style={{flex: '1'}}>
            <Navbar/>
            <Container style={{marginTop: '100px'}}>
                <Grid centered stackable columns={3}>
                    { requests && requests.map((request, index) => (
                        <Grid.Column key={index}>
                            <OpenRequest request={request} image = {beneficiary.profile_image ? beneficiary.profile_image : 'https://via.placeholder.com/150' } beneficiary = {beneficiary}/>
                        </Grid.Column>
                    ))}
                </Grid>
            </Container>
        </div>
    </div>
    )
};

export default BeneficiaryOwnOpenRequestList;
