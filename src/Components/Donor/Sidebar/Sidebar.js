import React, { useState, useContext } from 'react';
import { Grid, Menu, Icon } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../Home/UserConext/UserContext'; // Adjust the import path if necessary
import './Sidebar.css';

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState('Home');
    const [visible, setVisible] = useState(false);
    const [icon, setIcon] = useState('angle right');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:9013',
        withCredentials: true,
    });

    const handleItemClick = (e, { name }) => setActiveItem(name);
    const handleIconClick = () => {
        setVisible(!visible);
        setIcon(icon === 'angle right' ? 'angle left' : 'angle right');
    };

    const handleLogout = async () => {
        try {
            await axiosInstance.get('/signout');
            setUser(null);
            localStorage.removeItem('user');
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <Grid style={{ height: "100vh", top: "70px", width: "fit-content" }}>
            <Grid.Column width={5} style={{ height: "100vh" }}>
                <Menu
                    vertical
                    tabular
                    style={{ fontSize: "20px", top: "70px", position: "fixed", zIndex: "1", backgroundColor: "#fff", height: "100%" }}
                    className={visible ? "visibles" : "hiddens"}
                    direction="left"
                >
                    <Menu.Item
                        name='Home'
                        active={activeItem === 'Home'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/donor/home"
                    >
                        <Icon name='home' />
                        Home
                    </Menu.Item>
                    <Menu.Item
                        name='My Donations'
                        active={activeItem === 'My Donations'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/donor/ongoing-donations"
                    >
                        <Icon name='gift' />
                        My Donations
                    </Menu.Item>
                    <Menu.Item
                        name='Beneficiaries'
                        active={activeItem === 'Beneficiaries'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/donor/beneficiaries"
                    >
                        <Icon name='users' />
                        Beneficiaries
                    </Menu.Item>
                    <Menu.Item
                        name='Leaderboard'
                        active={activeItem === 'Leaderboard'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/donor/leaderboards"
                    >
                        <Icon name='trophy' />
                        Leaderboard
                    </Menu.Item>
                    <Menu.Item
                        name='Donors'
                        active={activeItem === 'Donors'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/donor/donors"
                    >
                        <Icon name='chess king' />
                        Donors
                    </Menu.Item>
                    <Menu.Item
                        name='Requests'
                        active={activeItem === 'Requests'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/donor/open-requests"
                    >
                        <Icon name='dollar sign' />
                        Requests
                    </Menu.Item>
                    <Menu.Item
                        name='Logout'
                        active={activeItem === 'Logout'}
                        onClick={handleLogout}
                        className="logout"
                    >
                        <Icon name='sign-out' />
                        Logout
                    </Menu.Item>
                </Menu>
            </Grid.Column>
            <Icon name={icon} className={`lefticons ${visible && "lefts"}`} onClick={handleIconClick} />
        </Grid>
    );
};

export default Sidebar;
