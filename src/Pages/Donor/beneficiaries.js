import React, {useContext, useEffect, useState} from 'react';
import Beneficiary from '../../Components/Donor/Beneficiary/Beneficiary';
import { Container, Grid, Header, Form, Button } from 'semantic-ui-react';
import Navbar2 from "../../Components/Donor/NavBar/NavBar2";
import Sidebar from "../../Components/Donor/Sidebar/Sidebar";
import Donatenow from "../../Components/Donor/Donatenow/Donatenow";
import './OpenRequestList.css'; // Make sure you have this CSS file
import { UserContext } from '../../Components/Home/UserConext/UserContext';
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

const BeneficiaryList = () => {

    const [beneficiaries, setBeneficiaries] = useState([]);
    const [filteredBeneficiaries, setFilteredBeneficairies] = useState([]);
    const { user, userDetails } = useContext(UserContext);
    const donor = userDetails;
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        get_requests();
    }, []);

    const get_requests = async () => {
        try {
            const response = await axiosInstance.get('/donor/get_beneficiaries');
            setBeneficiaries(response.data.beneficiaries);
            setFilteredBeneficairies(response.data.beneficiaries)
        } catch (error) {
            console.log(error);
        }
    };


    const handleSearch = async (e) => {
        e.preventDefault();

        console.log(searchQuery);

        if (searchQuery.trim() === '') {
            setFilteredBeneficairies(beneficiaries); // If no search query, show all requests
            return;
        }

        try {
            // TextRazor API call for keyword and entity extraction
            const response = await axiosInstance.post("/textrazor", { query: searchQuery });

            const topics = response.data.topics || [];
            const entities = response.data.entities || [];
            const categories = response.data.categories || [];
            console.log('topics:', topics);
            console.log('Entities:', entities);
            console.log('Categories:', categories);

            const tokenizeQuery = (query) => {
                return query.toLowerCase().split(/\s+/).filter(token => token.length > 0); // Tokenize the search query
            };

            const searchTokens = tokenizeQuery(searchQuery); // Tokenized search query

            const filtered = beneficiaries.filter(beneficiary => {
                // Initially attempt to match using entities
                const entityMatchDescription = entities.length > 0
                    ? entities.some(entity => beneficiary?.description?.toLowerCase().includes(entity.entityId.toLowerCase() || entity.matchedText.toLowerCase()))
                    : false;

                // const entityMatchTitle = entities.length > 0
                //     ? entities.some(entity => beneficiary.requestDetails.title.toLowerCase().includes(entity.entityId.toLowerCase() || entity.matchedText.toLowerCase()))
                //     : false;

                const entityMatchAddress = entities.length > 0
                    ? entities.some(entity => beneficiary?.address?.toLowerCase().includes(entity.entityId.toLowerCase() || entity.matchedText.toLowerCase()))
                    : false;

                const entityMatchType = entities.length > 0
                    ? entities.some(entity => beneficiary?.type?.toLowerCase().includes(entity.entityId.toLowerCase() || entity.matchedText.toLowerCase()))
                    : false;

                const entityMatchName = entities.length > 0
                    ? entities.some(entity => beneficiary?.name?.toLowerCase().includes(entity.entityId.toLowerCase() || entity.matchedText.toLowerCase()))
                    : false;

                // const entityMatchBeneDes = entities.length > 0
                //     ? entities.some(entity => beneficiary.description.toLowerCase().includes(entity.entityId.toLowerCase() || entity.matchedText.toLowerCase()))
                //     : false;

                // If entities are found, match based on entities, else fallback to token matching
                if (entities.length > 0) {
                    return entityMatchDescription  || entityMatchAddress ||
                        entityMatchType || entityMatchName ;
                } else {
                    // Token-based matching (if no entities found)
                    // const titleMatch = searchTokens.some(token => beneficiary.requestDetails.title.toLowerCase().includes(token));
                    const descriptionMatch = searchTokens.some(token => beneficiary?.description?.toLowerCase().includes(token));
                    const addressMatch = searchTokens.some(token => beneficiary?.address?.toLowerCase().includes(token));
                    const nameMatch = searchTokens.some(token => beneficiary?.name?.toLowerCase().includes(token));
                    const typeMatch = searchTokens.some(token => beneficiary?.type?.toLowerCase().includes(token));
                    // const beneDesMatch = searchTokens.some(token => beneficiary.description.toLowerCase().includes(token));

                    return  descriptionMatch || nameMatch || typeMatch
                         || addressMatch;
                }
            });

            setFilteredBeneficairies(filtered); // Update filtered requests
            console.log(filtered);
        } catch (error) {
            console.error('Error with TextRazor API:', error);
        }
    };

    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <Sidebar />
            <div style={{ flex: '1' }}>
                <Navbar2 />
                <Container style={{ padding: '20px', top: "100px", position: 'relative' }}>
                    <Header as="h2" style={{ marginBottom: "50px" }} className="page-header">Beneficiaries</Header>

                    <Grid columns={3} stackable>
                        {filteredBeneficiaries && filteredBeneficiaries.map((beneficiary, index) => (
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
            <Donatenow />

            {/* Fixed-position search box */}
            <div className="fixed-search-box">
                <Form onSubmit={handleSearch}>
                    <Form.Field>
                        <label>Description</label>
                        <textarea
                            placeholder="Type your description here..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            rows={6}
                            style={{width: '100%'}}
                        />
                    </Form.Field>
                    <Button primary type="submit">Search</Button>
                    <br/>
                    <small style={{color: "grey", marginTop: "30px"}}>powered by</small><img
                    style={{height: "30px", position: "absolute"}}
                    src="https://assets.browserlondon.com/wp-content/uploads/2019/03/TextRazor-logo-on-white.jpg"/>
                </Form>
            </div>
        </div>
    );
}

export default BeneficiaryList;
