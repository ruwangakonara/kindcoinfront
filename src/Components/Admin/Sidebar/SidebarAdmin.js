import "./SidebarAdmin.css"
import { Link } from 'react-router-dom';

const SidebarAdmin = ({ visible }) => {
    return (
        <div className={`sidebar ${visible ? 'visible' : ''}`}>
            <h1>Sidebar_Admin</h1>
            <div className="sidebar-item">
                <Link to="/donor">Donor</Link>
                <a href="">Donor</a>
            </div>
            <div className="sidebar-item">
                <Link to="/donees">Donees</Link>
                <a href="">Donor</a>
            </div>
            <div className="sidebar-item">
                {/* <Link to="/statistics">Statistics</Link> */}
                <a href="">Donor</a>
            </div>
            <div className="sidebar-item">
                {/* <Link to="/register">Register</Link> */}
                <a href="">Donor</a>
            </div>
            <div className="sidebar-item">
                {/* <Link to="/complaints">Complaints</Link> */}
                <a href="">Donor</a>
            </div>
            <div className="sidebar-item">
                {/* <Link to="/settings">Settings</Link> */}
                <a href="">Donor</a>
            </div>
      </div>
    )
}

export default SidebarAdmin