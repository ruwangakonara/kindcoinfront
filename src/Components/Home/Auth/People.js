import React from 'react'
import { Link,Outlet,useNavigate } from "react-router-dom";

import{Button} from 'semantic-ui-react'
const People = () => {
  const navigate = useNavigate();
    return(
      <div style={{marginTop:"70px"}}>
        <ul>
          <li><Link to="login">login user</Link></li>
          <li><Link to="signup">signup user</Link></li>
        </ul>
        <Button color="teal" onClick={()=>navigate("/org")} >Login As Organisation</Button>
        <Outlet/>
      </div>

    )

  }

  export default People;

