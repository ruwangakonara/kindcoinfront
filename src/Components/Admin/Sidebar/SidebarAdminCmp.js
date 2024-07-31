import "./SidebarAdminCmp.css"
import {
  MenuItem,
  Header,
  Icon,
  Image,
  Menu,
  Sidebar,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const SidebarAdminCmp = ({ visible }) => {

  const items = [
    { name: 'Dashboard', path: '/admin/home', icon: 'home' },
    { name: 'Donors', path: '/admin/Donor_List/Donors', icon: 'address book' },
    { name: 'Beneficiaries', path: '/admin/Beneficiary_List/Beneficiaries', icon: 'address card outline' },
    { name: 'Statistics', path: '/admin/overall_stats', icon: 'chart line' },
    { name: 'Register', path: '/admin/register/crew_member', icon: 'registered' },
    { name: 'Complaints', path: '/admin/view/complaints', icon: 'compose' },
    { name: 'Settings', path: '/admin/settings', icon: 'settings' },
    { name: 'Assign Crew Member', path: '/admin/assign/crew_member', icon: 'gavel' }
  ];

  return (
      <Sidebar
        as={Menu}
        animation='overlay'
        icon='labeled'
        inverted
        vertical
        visible={visible}
        width='thin'
      >
          {items.map((item, index) => (
            <MenuItem as={Link} to={item.path} key={index}>
              <Icon name={item.icon} />
              {item.name}
            </MenuItem>
          ))}
      </Sidebar>
  )
}

export default SidebarAdminCmp