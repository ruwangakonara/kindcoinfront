import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TokenTransferTable.css';

const TokenTransferComp = () => {
    const [xlmToLkrRate, setXlmToLkrRate] = useState(null);
    const [tokenToXlmRate, setTokenToXlmRate] = useState(null);
    const [donationId, setDonationId] = useState('');
    const [donationAmountInLKR, setDonationAmountInLKR] = useState('');
    const [message, setMessage] = useState('');
    const [tokenTransfers, setTokenTransfers] = useState([]);
    const [filter, setFilter] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchRates();
        fetchTokenTransfers();
    }, []);

    const fetchRates = async () => {
        try {
            const xlmToLkrResponse = await axios.get('xlm_to_lkr');
            setXlmToLkrRate(xlmToLkrResponse.data.rate);

            const tokenToXlmResponse = await axios.get('/knd_to_xlm');
            setTokenToXlmRate(tokenToXlmResponse.data.rate);
        } catch (error) {
            console.error('Error fetching rates:', error);
        }
    };

    const fetchTokenTransfers = async () => {
        try {
            const response = await axios.get('/api/token/getTokenTransfers', {
                params: { filter, search }
            });
            setTokenTransfers(response.data);
        } catch (error) {
            console.error('Error fetching token transfers:', error);
        }
    };

    const handleTransfer = async () => {
        try {
            const response = await axios.post('/dispatch', {
                donation_id: donationId,
                donationAmountInLKR
            });
            setMessage(response.data.message);
            fetchTokenTransfers();
        } catch (error) {
            setMessage('Failed to transfer donation');
            console.error('Error transferring donation:', error);
        }
    };

    return (
        <div className="crew-token-transfer-container">
            <div className="crew-rate-boxes">
                <div className="crew-rate-box crew-right-aligned">
                    <h3>XLM to LKR Rate</h3>
                    <p>{xlmToLkrRate}</p>
                </div>
                <div className="crew-rate-box crew-left-aligned">
                    <h3>Token to XLM Rate</h3>
                    <p>{tokenToXlmRate}</p>
                </div>
            </div>
            <div className="crew-transfer-form">
                <h3>Transfer Donation</h3>
                <input
                    type="text"
                    placeholder="Donation ID"
                    value={donationId}
                    onChange={(e) => setDonationId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Donation Amount in LKR"
                    value={donationAmountInLKR}
                    onChange={(e) => setDonationAmountInLKR(e.target.value)}
                />
                <button onClick={handleTransfer}>Transfer</button>
                {message && <p className="crew-message">{message}</p>}
            </div>
            <div className="crew-filter-search">
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="">All</option>
                    <option value="successful">Successful</option>
                    <option value="unsuccessful">Unsuccessful</option>
                </select>
                <input
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={fetchTokenTransfers}>Search</button>
            </div>
            <div className="crew-token-transfer-table">
                <table>
                    <thead>
                        <tr>
                            <th>Donor ID</th>
                            <th>Donor Phone</th>
                            <th>Beneficiary ID</th>
                            <th>Beneficiary Phone</th>
                            <th>Transaction ID</th>
                            <th>Transaction Amount (LKR)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tokenTransfers.map((transfer) => (
                            <tr key={transfer._id}>
                                <td>{transfer.donor_id}</td>
                                <td>{transfer.donor_phone}</td>
                                <td>{transfer.beneficiary_id}</td>
                                <td>{transfer.beneficiary_phone}</td>
                                <td>{transfer.transaction_id}</td>
                                <td>{transfer.transaction_amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TokenTransferComp;