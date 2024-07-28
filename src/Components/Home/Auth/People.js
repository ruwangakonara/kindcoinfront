import React from 'react'
import { Link,Outlet,useNavigate } from "react-router-dom";

import{Button} from 'semantic-ui-react'
const People = () => {
  const navigate = useNavigate();
    return(
      <div style={{marginTop:"70px"}}>
          <div>
              <ul style={{textAlign: "left", display:"flex", justifyContent:"space-between"}}>
                  <li><Link to="login">login user</Link></li>
                  <li><Link to="signup">Sign up as a Donor</Link></li>
              </ul>
          </div>

          <Button color="teal" onClick={() => navigate("/beneficiary_registration")}>Register as a Beneficiary</Button>
          <Outlet/>
      </div>

    )

}

export default People;

