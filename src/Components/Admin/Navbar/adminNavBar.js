import { Icon, Dropdown, Menu } from "semantic-ui-react";
import "./adminNavBar.css";

export default function AdminNavBar() {
    return (
        <div className="adminNavBar">
            <Menu>
                <Menu.Item>
                    <Icon name="home" />
                    Admin
                </Menu.Item>
            </Menu>
        </div>
    );
}