import React,{useState,useEffect} from 'react'
import { Button, Dropdown, Form, Grid, Header, Modal, Segment,Icon,Message } from 'semantic-ui-react'
import "../Login/Login.css";
import { useNavigate} from "react-router-dom";

const OSignup = ({form :{form, handleChange,saveAndContinue,formError,countryOptions,open,errMessage,message,modOpen,
  setreset,fetchData,setCurrent,setModopen}}) => {

  setCurrent('org');
  const [passwordType, setPasswordType] = useState("password");
  const [confirm,setConfirm] = useState("password");
  const [icon,setIcon] = useState("eye");
  const [confirmicon,setConfirmIcon] = useState("eye");
 
  const handleopen = () =>{
    setModopen(false);
    console.log(" user completed"); 
    navigate("/org/login");
    setreset();
  }

  useEffect(()=>{
    if(open){
      let data = {
        email: form.email,
        password: form.password,
        phoneNo: form.phoneNo,
        state: form.state,
        userType: "Organisation",
        name: form.name,
        date: form.date,
      }
      fetchData('http://localhost:3000/signup',data,"signup","POST");
    }

  },[open]);

const togglePassword = (val) =>{
  if(val === "pass")
  {
    setPasswordType(passwordType==="password"?"text":"password");
    setIcon(icon==="eye"?"low vision":"eye");

  }
  else
  {
    setConfirm(confirm==="password"?"text":"password");
    setConfirmIcon(confirmicon==="eye"?"low vision":"eye");
  }
  
}

  const navigate = useNavigate();

  return (

    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
    <Header textAlign='center'>
      <h1>Enter Organisation Details</h1>
    </Header>

    {modOpen && 
      <Modal open={modOpen}>
      <Modal.Header>Thank you!</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          Registration Successful Now you have to login to continue
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleopen}>Ok</Button>
      </Modal.Actions>
    </Modal>
    }
          {
            errMessage && 
            <Message negative>
            <p>{message}</p>
            </Message>
          }

    <Form onSubmit={saveAndContinue}>
      <Segment>
        <Form.Input
            label='Organisation Name'
            placeholder='Organisation Name'
            name="name"
            value={form.name||""}
            onChange={handleChange}
            error={(formError.nameError? true: false)?{content: formError.nameError} : false}
          />

        <Dropdown
            fluid
            label='State'
            placeholder='Select State'
            search
            selection
            options={countryOptions}
            type="dropdown"
            name="state"
            value={form.state||""}
            onChange={handleChange}
            error={(formError.stateError? true: false)?{content: formError.stateError} : false}
          />

        <Form.Input
            fluid
            label='Establishment Date'
            icon="calendar"
            iconPosition="left"
            type='date'
            placeholder='Establishment Date'
            name="date"
            value={form.date||""}
            onChange={handleChange}
            error={(formError.dateError? true: false)?{content: formError.dateError} : false}
          />

          <Form.Input
            fluid
            label='Phone no.'
            icon="phone"
            iconPosition="left"
            type='text'
            placeholder='Phone no.'
            name="phoneNo"
            value={form.phoneNo||""}
            onChange={handleChange}
            error={(formError.phoneNoError? true: false)?{content: formError.phoneNoError} : false}
          />

        <Form.Input
            fluid
            label='Email'
            icon="user"
            iconPosition="left"
            type='email'
            placeholder='Email Address'
            name="email"
            value={form.email||""}
            onChange={handleChange}
            error={(formError.emailError? true: false)?{content: formError.emailError} : false}
          />
        <Form.Field style={{ position: 'relative' }}>
              <Form.Input
                fluid
                width="14"
                label="Password"
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type={passwordType}
                name="password"
                value={form.password||""} 
                onChange={handleChange}
                error={(formError.passwordError? true: false)?{content: formError.passwordError} : false}
              />
              <Icon name={icon} link onClick={()=>togglePassword('pass')} className="showicon" style={{top:25}}/>
          </Form.Field>
          <Form.Field style={{ position: 'relative' }}>
              <Form.Input
                fluid
                label='Confirm Password'
                icon='lock'
                width="14"
                iconPosition='left'
                placeholder='Password'
                name = "confirmPassword"
                value={form.confirmPassword||""}
                type={confirm}
                onChange={handleChange}
                // defaultValue={values.confirmPassword}
                error= {(formError.confirmPasswordError? true: false)?{content: formError.confirmPasswordError} : false}
              />
              <Icon name={confirmicon} link onClick={()=>togglePassword('cnfirm')} className="showicon" style={{top:25}}/>
          </Form.Field>
          <Button type="submit" >Save And Continue</Button>
      </Segment>
    </Form>
  </Grid.Column>
  </Grid>
  )


}

export default OSignup;