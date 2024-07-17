import { Icon, Dropdown, Menu } from "semantic-ui-react";
import "./Header.css";

const Header = () => {
    return (
        <>
            <div className="header">
            <div className="header-title">Kindcoin</div>
            <div className="header-greeting">Howdy, admin</div>
            {/* <div className="header-toggle">
                <input type="checkbox" />
            </div> */}
            </div>
        </>
    );
}

export default Header