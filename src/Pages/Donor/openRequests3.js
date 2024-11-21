import React, { useState, useContext, useEffect } from 'react';
import { Container, Grid, Header, Form, Button } from 'semantic-ui-react';
import Navbar2 from '../../Components/Donor/NavBar/NavBar2';
import Sidebar3 from '../../Components/Donor/Sidebar/Sidebar3';
import OpenRequest from "../../Components/Donor/Request/OpenRequest";
import Donatenow from "../../Components/Donor/Donatenow/Donatenow";
import { UserContext } from '../../Components/Home/UserConext/UserContext';
import axios from "axios";
import './OpenRequestList.css';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});

function OpenRequestList3() {
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const { userDetails } = useContext(UserContext);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        get_requests();
    }, []);

    const get_requests = async () => {
        try {
            const response = await axiosInstance.post('/donor/get_requests', { open: true });
            setRequests(response?.data.requests);
            console.log(requests);

            setFilteredRequests(response.data.requests); // Initially show all requests

        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();

        console.log(searchQuery);

        if (searchQuery.trim() === '') {
            setFilteredRequests(requests); // If no search query, show all requests
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

            const filtered = requests.filter(request => {
                // Initially attempt to match using entities
                const entityMatchDescription = entities.length > 0
                    ? entities.some(entity => request.requestDetails.description.toLowerCase().includes(entity.entityId.toLowerCase() || entity.matchedText.toLowerCase()))
                    : false;

                const entityMatchTitle = entities.length > 0
                    ? entities.some(entity => request.requestDetails.title.toLowerCase().includes(entity.entityId.toLowerCase() || entity.matchedText.toLowerCase()))
                    : false;

                const entityMatchAddress = entities.length > 0
                    ? entities.some(entity => request.requestDetails.address.toLowerCase().includes(entity.entityId.toLowerCase() || entity.matchedText.toLowerCase()))
                    : false;

                const entityMatchType = entities.length > 0
                    ? entities.some(entity => request.requestDetails.type.toLowerCase().includes(entity.entityId.toLowerCase() || entity.matchedText.toLowerCase()))
                    : false;

                const entityMatchName = entities.length > 0
                    ? entities.some(entity => request.name.toLowerCase().includes(entity.entityId.toLowerCase() || entity.matchedText.toLowerCase()))
                    : false;

                const entityMatchBeneDes = entities.length > 0
                    ? entities.some(entity => request.description.toLowerCase().includes(entity.entityId.toLowerCase() || entity.matchedText.toLowerCase()))
                    : false;

                // If entities are found, match based on entities, else fallback to token matching
                if (entities.length > 0) {
                    return entityMatchDescription || entityMatchTitle || entityMatchAddress ||
                        entityMatchType || entityMatchName || entityMatchBeneDes;
                } else {
                    // Token-based matching (if no entities found)
                    const titleMatch = searchTokens.some(token => request.requestDetails.title.toLowerCase().includes(token));
                    const descriptionMatch = searchTokens.some(token => request.requestDetails.description.toLowerCase().includes(token));
                    const addressMatch = searchTokens.some(token => request.requestDetails.address.toLowerCase().includes(token));
                    const beneficaryMatch = searchTokens.some(token => request.name.toLowerCase().includes(token));
                    const typeMatch = searchTokens.some(token => request.requestDetails.type.toLowerCase().includes(token));
                    const beneDesMatch = searchTokens.some(token => request.description.toLowerCase().includes(token));

                    return titleMatch || descriptionMatch || beneficaryMatch || typeMatch ||
                        beneDesMatch || addressMatch;
                }
            });

            setFilteredRequests(filtered); // Update filtered requests
            console.log(filtered);
        } catch (error) {
            console.error('Error with TextRazor API:', error);
        }
    };

    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <Sidebar3 />
            <div style={{ flex: '1' }}>
                <Navbar2 />
                <Container style={{ marginTop: '100px' }}>
                    <Header as="h2" style={{ marginBottom: "50px" }} className="page-header">Open Requests</Header>

                    <Grid centered stackable columns={3}>
                        {filteredRequests.map((request, index) => (
                            <Grid.Column key={index}>
                                <OpenRequest request={request} />
                            </Grid.Column>
                        ))}
                    </Grid>
                </Container>
            </div>
            <Donatenow />

            <div className="fixed-search-box">
                <Form onSubmit={handleSearch}>
                    <Form.Field>
                        <label>Description</label>
                        <textarea
                            placeholder="Type your description here..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            rows={6}
                            style={{ width: '100%' }}
                        />
                    </Form.Field>
                    <Button primary type="submit">Search</Button>
                    <br />
                    <small style={{ color: "grey", marginTop: "30px" }}>powered by</small><img style={{ height: "30px", position: "absolute" }} src="https://assets.browserlondon.com/wp-content/uploads/2019/03/TextRazor-logo-on-white.jpg" />
                </Form>
            </div>
        </div>
    );
}

export default OpenRequestList3;
