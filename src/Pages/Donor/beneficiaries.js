import React, { useState } from 'react';
import Beneficiary from '../../Components/Donor/Beneficiary/Beneficiary';
import { Container, Grid, Header, Form, Button } from 'semantic-ui-react';
import Navbar2 from "../../Components/Donor/NavBar/NavBar2";
import Sidebar from "../../Components/Donor/Sidebar/Sidebar";
import Donatenow from "../../Components/Donor/Donatenow/Donatenow";
import './OpenRequestList.css'; // Make sure you have this CSS file

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
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        // Implement search logic here
        console.log('Searching for:', searchQuery);
    };

    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <Sidebar />
            <div style={{ flex: '1' }}>
                <Navbar2 />
                <Container style={{ padding: '20px', top: "100px", position: 'relative' }}>
                    <Header as="h2" style={{ marginBottom: "50px" }} className="page-header">Beneficiaries</Header>

                    <Grid columns={3} stackable>
                        {beneficiaries.map((beneficiary, index) => (
                            <Grid.Column key={index} style={{ marginBottom: '20px' }}>
                                <Beneficiary
                                    name={beneficiary.name}
                                    type={beneficiary.type}
                                    image={beneficiary.image}
                                    verified={beneficiary.verified}
                                    id={beneficiary.id}
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
                            rows={6} // Multiline text box
                            style={{ width: '100%' }}
                        />
                    </Form.Field>
                    <Button primary type="submit">Search</Button>
                </Form>
                <div className="powered-by-google">
                    <img src="https://developers.google.com/static/images/branding/googlelogo/2x/googlelogo_light_color_32dp.png" alt="Powered by Google" />
                </div>
            </div>
        </div>
    );
}

export default BeneficiaryList;
