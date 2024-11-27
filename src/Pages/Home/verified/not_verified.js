import React, {useContext, useState} from 'react';
import { UserContext } from '../../../Components/Home/UserConext/UserContext'; // Adjust the import path if necessary
import { Link } from 'react-router-dom';
import './not_verified.css'; // Include CSS for styling and animation


function NotVerified() {
    const { setUser, setUserDetails, userDetails, user } = useContext(UserContext);

    const [details, setDetails] = useState(userDetails)
    const [userd, setUserd]  = useState(user)

    console.log(userd)

    // Clear user details to ensure logged-out state
    setUserDetails(null);
    setUser(null);
    console.log(userd)

    const userTypeMessage = userd?.status == 'donor'
        ? 'Thank you for registering as a Donor!'
        : 'Thank you for registering as a Beneficiary!';

    return (
        <div className="not-verified-container">
            <div className="not-verified-content">
                {/* Token Image */}
                <img src="/token.png" alt="Token" className="token-image" />

                <h1 className="not-verified-title">Hello {details?.name || 'there'}!</h1>
                <h2 className="not-verified-subtitle">{userTypeMessage}</h2>
                <p className="not-verified-message">
                    It looks like your email hasn't been verified yet. <br />
                    Please check your inbox for the verification link we sent you.
                </p>
                <div className="not-verified-animation">
                    <div className="envelope">
                        <div className="envelope-flap"></div>
                        <div className="envelope-body"></div>
                        <div className="envelope-paper"></div>
                    </div>
                </div>
                <p className="not-verified-footer">
                    Already verified? You can <Link to="/login/login" className="login-link">log in here</Link>.
                </p>
            </div>
        </div>
    );
}

export default NotVerified;
