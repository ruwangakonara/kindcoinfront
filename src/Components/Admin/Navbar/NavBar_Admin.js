import { Icon, Dropdown, Menu } from "semantic-ui-react";
import "./NavBar_Admin.css";

export default function NavBar_Admin() {
    return (
        <div className="admin-navbar">
            <Menu>
                <Menu.Item
                    name="home"
                    active={false}
                    onClick={() => {
                        window.location.href = "/admin";
                    }}
                    width={15}
                >
                    <Icon name="home" />
                    Home
                </Menu.Item>    
            </Menu>
        </div>
    );
}