import React, {useContext, useState} from 'react';
import { Grid, Menu, Icon } from 'semantic-ui-react';
import {Link, useNavigate} from 'react-router-dom';
import './Sidebar.css';
import { UserContext } from '../../Home/UserConext/UserContext'; // Adjust the import path if necessary
import './Sidebar.css';
import axios from "axios";


export default function Sidebar3() {
    const [activeItem, setActiveItem] = useState('Open Requests');
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
                    style={{ fontSize: "17px", top: "70px", position: "fixed", zIndex: "1", backgroundColor: "#fff", height: "100%", width: "fit-content", background: "lightgrey" }}
                    className={visible ? "visibles" : "hiddens"}
                    direction="left"
                >
                    <Menu.Item
                        name='Open Requests'
                        active={activeItem === 'Open Requests'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/beneficiary/open-requests"
                    >
                        <Icon name='folder open' />
                        Open Requests
                    </Menu.Item>
                    <Menu.Item
                        name='Closed Requests'
                        active={activeItem === 'Closed Requests'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/beneficiary/closed-requests"
                    >
                        <Icon name='folder' />
                        Closed Requests
                    </Menu.Item>
                    {/*<Menu.Item*/}
                    {/*    name='My Listings'*/}
                    {/*    active={activeItem === 'My Listings'}*/}
                    {/*    onClick={handleItemClick}*/}
                    {/*    as={Link}*/}
                    {/*    to="/donor/my-listings"*/}
                    {/*>*/}
                    {/*    <Icon name='list' />*/}
                    {/*    My Listings*/}
                    {/*</Menu.Item>*/}
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
