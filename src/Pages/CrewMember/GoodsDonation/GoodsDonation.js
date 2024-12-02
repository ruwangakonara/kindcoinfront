// MemberDonations.js
import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'semantic-ui-react';
import HeaderCrew from '../../../Components/CrewMember/Header/HeaderCrew';
import Sidebar from '../../../Components/CrewMember/Sidebar/Sidebar';
import axios from 'axios';
import './GoodsDonation.css';

const GoodsMemberDonations = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMemberDonations();
    }, []);

    const fetchMemberDonations = async () => {
        try {
            const response = await axios.get('http://localhost:9013/crew/goods_donations', {
                withCredentials: true
            });
            setDonations(response.data.donations);
        } catch (error) {
            console.error('Error fetching donations:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <Sidebar />
            <div style={{ flex: '1' }}>
                <HeaderCrew />
                <Container className="crew-table-container">
                    <h2 className="crew-page-header">My Assigned Donations</h2>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Donation ID</Table.HeaderCell>
                                <Table.HeaderCell>Title</Table.HeaderCell>
                                <Table.HeaderCell>Donor</Table.HeaderCell>
                                <Table.HeaderCell>Beneficiary</Table.HeaderCell>
                                <Table.HeaderCell>Type</Table.HeaderCell>
                                <Table.HeaderCell>Value</Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                                <Table.HeaderCell>Created Date</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {donations.length > 0 ? (
                                donations.map((donation) => (
                                    <Table.Row key={donation.donationDetails._id}>
                                        <Table.Cell>{donation.donationDetails._id}</Table.Cell>
                                        <Table.Cell>{donation.donationDetails.title}</Table.Cell>
                                        <Table.Cell>{donation.donorDetails.name}</Table.Cell>
                                        <Table.Cell>{donation.beneficiaryDetails.name}</Table.Cell>
                                        <Table.Cell>{donation.donationDetails.type}</Table.Cell>
                                        <Table.Cell>{donation.donationDetails.value}</Table.Cell>
                                        <Table.Cell>
                                            {donation.donationDetails.verified ? 'Verified' : 'Pending'}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {new Date(donation.donationDetails.created).toLocaleDateString()}
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            ) : (
                                <Table.Row>
                                    <Table.Cell colSpan="8" textAlign="center">
                                        {loading ? 'Loading...' : 'No donations assigned'}
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                </Container>
            </div>
        </div>
    );
};

export default GoodsMemberDonations;