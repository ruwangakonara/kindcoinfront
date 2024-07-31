import React from 'react'
import { Link,Outlet,useNavigate } from "react-router-dom";

import{Button} from 'semantic-ui-react'
const People = () => {
  const navigate = useNavigate();
    return(
      <div style={{marginTop:"70px", }}>
          <div style={{textAlign: "left", display:"flex"}}>
              <ul style={{textAlign: "left"}}>
                  <li style={{textAlign: "left", marginBottom: "-50px"}}><Link to="login">login user</Link></li>
                  <li style={{textAlign: "left", marginBottom: "20px"}}><Link to="signup">Sign up as a Donor</Link></li>
              </ul>
          </div>

          <Button color="teal" onClick={() => navigate("/beneficiary_registration")}>Register as a Beneficiary</Button>
          <Outlet/>
      </div>

    )

}

export default People;

