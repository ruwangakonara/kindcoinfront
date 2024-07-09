import React, {useContext, useState} from 'react';
import { Grid, Menu, Icon } from 'semantic-ui-react';
import {Link, useNavigate} from 'react-router-dom';
import './Sidebar.css';
import axios from 'axios';
import { UserContext } from '../../Home/UserConext/UserContext'; // Adjust the import path if necessary


export default function Sidebar() {
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
    }

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
        <Grid style={{ height: "100vh", top: "70px" }}>
            <Grid.Column style={{ height: "100vh", width: "fit-content" }}>
                <Menu
                    vertical
                    tabular
                    style={{ fontSize: "17px", top: "70px", position: "fixed", zIndex: "1", backgroundColor: "#fff", height: "100%", width: "fit-content" , background: "lightgrey"}}
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
                        name='Ongoing Donations'
                        active={activeItem === 'Ongoing Donations'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/donor/ongoing-donations"
                    >
                        <Icon name='hourglass half' />
                        Ongoing Donations
                    </Menu.Item>
                    <Menu.Item
                        name='Pending Rewards'
                        active={activeItem === 'Pending Rewards'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/donor/pending-rewards"
                    >
                        <Icon name='wait' />
                        Pending Rewards
                    </Menu.Item>
                    <Menu.Item
                        name='Completed Donations'
                        active={activeItem === 'Completed Donations'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/donor/completed-donations"
                    >
                        <Icon name='check' />
                        Completed Donations
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
}
