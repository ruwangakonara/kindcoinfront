import React, {useState} from 'react'
import { Grid,Menu,Segment ,Icon} from 'semantic-ui-react'
import './Sidebar.css'

export default function () {
    const [activeItem, setActiveItem] = useState('bio');
    const [visible, setVisible] = useState(false);
    const [icon,setIcon] = useState('angle right');

 const handleItemClick = (e, { name }) => setActiveItem(name);
 const  handleicon = () =>{
      setVisible(!visible);
      if(icon === 'angle right'){
          setIcon('angle left');
      }else{
          setIcon('angle right');
      }
 }
  return (
    <Grid style={{height: "100vh" ,top:"70px"}}>
          <Grid.Column width={4} style={{height:"100vh"}}>
          <Menu 
          vertical
          tabular 
          style={{fontSize:"1.5rem",top:"70px",position:"fixed",zIndex:"1",backgroundColor:"#fff",height:"100%"}} 
          className={visible ? "visibles" : "hiddens"}
          direction="left" 
          >
            <Menu.Item
              name='Home'
              active={activeItem === 'Home'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='Documents'
              active={activeItem === 'Documents'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='companies'
              active={activeItem === 'companies'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='links'
              active={activeItem === 'links'}
              onClick={handleItemClick}
            />
          </Menu>
          </Grid.Column>
          <Icon name={icon} className={`lefticons ${visible && "lefts"}`} onClick={handleicon}/>

        <Grid.Column stretched width={10} style={{top:"70px"}}>
          <Segment>
            This is an stretched grid column. This segment will always match the
            tab height
          </Segment>
        </Grid.Column>
      </Grid>
  )
}
