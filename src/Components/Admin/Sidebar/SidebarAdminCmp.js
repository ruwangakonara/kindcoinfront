import "./SidebarAdminCmp.css"
import {
  MenuItem,
  Icon,
  Menu,
  Sidebar,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const SidebarAdminCmp = ({ visible }) => {

  const items = [
    { name: 'Dashboard', path: '/admin/home', icon: 'home' },
    { name: 'Donors', path: '/admin/Donor_List/Donors', icon: 'address book' },
    { name: 'Beneficiaries', path: '/admin/Beneficiary_List/Beneficiaries', icon: 'address card outline' },
    { name: 'Crew Members', path: '/admin/view/crew_member', icon: 'user outline' },
    { name: 'Assign Crew Member', path: '/admin/assign/crew_member', icon: 'gavel' },
    { name: 'Complaints', path: '/admin/view/complaints', icon: 'compose' },
    { name: 'Statistics', path: '/admin/overall_stats', icon: 'chart line' },
    { name: 'Settings', path: '/admin/settings', icon: 'settings' },
    
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