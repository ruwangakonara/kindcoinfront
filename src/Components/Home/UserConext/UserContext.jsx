import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [userDetails, setUserDetails] = useState(() => {
        const savedDetails = localStorage.getItem('userDetails');
        return savedDetails ? JSON.parse(savedDetails) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }

        if (userDetails) {
            localStorage.setItem('userDetails', JSON.stringify(userDetails));
        } else {
            localStorage.removeItem('userDetails');
        }
    }, [user, userDetails]);

    return (
        <UserContext.Provider value={{ user, setUser, userDetails, setUserDetails }}>
            {children}
        </UserContext.Provider>
    );
};
