import React, {useState} from "react";
import './SidebarCrew.css';
import { Link } from "react-router-dom";

const SidebarCrew = () => {
    const [isCollpased, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollpased);
    }

    return(
        <div className={`sidebar ${isCollpased ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
            <button onClick={toggleSidebar} className="collapse-button">
                {isCollpased ? 'Expand': 'Collapse'}
            </button>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    <li>
                        <Link to="#">Verify Recipients</Link>
                    </li>
                    <li>
                        <Link to="#">Verify Requests</Link>
                    </li>
                    <li>
                        <Link to="#">Verify Donation Proofs</Link>
                    </li>
                    <li>
                        <Link to="#">Token Transfer</Link>
                    </li>
                    <li>
                        <Link to="#">Settings</Link>
                    </li>
                </ul>
            </nav>
        </div>
        
    );
}

export default SidebarCrew;