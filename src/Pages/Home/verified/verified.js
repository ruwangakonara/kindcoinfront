import React, {useContext, useEffect, useState} from 'react';
import { UserContext } from '../../../Components/Home/UserConext/UserContext'; // Adjust the import path if necessary
import {Link, useNavigate, useParams} from 'react-router-dom'; // Import useNavigate for redirection
import { Image } from 'semantic-ui-react'; // Import Image for the token image
import './verified.css'; // Include CSS for styling and animation
import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
});



function Verified() {


    const [details, setDetails] = useState({});
    const { token } = useParams();
    const [status, setStatus] = useState(null);


    const verify = async () => {
        console.log("verifying...");
        try {
            const response = await axiosInstance.post('/verify', { token: token });
            console.log("Response:", response);
            if (response.status === 200) {
                const det = response.data.details;
                setStatus(response.data.status)
                console.log(status);
                setDetails(det); // Update state with fetched details
            } else {
                console.error(`Error: Received status code ${response.status}`);
            }
        } catch (error) {
            console.error('Error fetching donor details:', error);
        }
    };

    useEffect(() => {
        verify()
    }, []);

    // const { userDetails } = useContext(UserContext);
    const navigate = useNavigate(); // Hook for redirection

    const userTypeMessage = status == 'donor'
        ? 'Thank you for verifying your Donor account!'
        : 'Thank you for verifying your Beneficiary account!';

    // Redirect to login page after the component is mounted
    useEffect(() => {
        // Redirect after a short delay to show the confirmation message
        const timer = setTimeout(() => {
            navigate('/login/login');
        }, 10000); // Redirect after 3 seconds

        return () => clearTimeout(timer); // Cleanup on component unmount
    }, [navigate]);

    return (
        <div className="verified-container">
            <div className="verified-content">
                {/* Token Image */}
                <Image src="/token.png" circular className="token-image" />

                <h1 className="verified-title">Congratulations {details?.name || 'there'}!</h1>
                <h2 className="verified-subtitle">{userTypeMessage}</h2>
                <p className="verified-message">
                    Your email has been successfully verified. You will be redirected to the login page shortly.
                </p>
                <div className="verified-animation">
                    {/* Envelope Animation */}
                    <div className="envelope">
                        <div className="envelope-flap"></div>
                        <div className="envelope-body"></div>
                        <div className="envelope-paper"></div>
                    </div>
                </div>
                <p className="verified-footer">
                    If you are not redirected, you can <a href="/login/login" className="login-link">click here</a> to log in manually.
                </p>
            </div>
        </div>
    );
}

export default Verified;
