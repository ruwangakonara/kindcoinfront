import React,{useState,useEffect} from 'react'
import { Button, Form, Grid, Header, Segment,Modal,Icon,Message } from 'semantic-ui-react'
import './Login.css'
import { useNavigate} from "react-router-dom";

const Olog = ({form :{form, handleChange,saveAndContinue,formError,open,
  setreset,errMessage,message,modOpen,fetchData,setModopen,setCurrent
}})  =>{

  setCurrent('login');

  const [passwordType, setPasswordType] = useState("password");
  const [icon,setIcon] = useState("eye");


  const handleopen = () =>{
    setreset();
    console.log(" user completed"); 
    setModopen(false);
    navigate("/main");
  }

 

  useEffect(()=>{
    if(open){
      let data = {
        email: form.email,
        password: form.password,
        userType: 'Organisation'
      }
      fetchData("http://localhost:3000/login",data,"login","POST");
    }

  },[open]);


  const togglePassword = () =>{
    if(passwordType === "password"){
      setPasswordType("text");
      setIcon("low vision");
    }else{
      setPasswordType("password");
      setIcon("eye");
    }
  }

  const navigate = useNavigate();
  
  return (
   
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
    {modOpen && 
  <Modal open={modOpen}>
  
  <Modal.Content>
    <Modal.Description>
      Hurrah! Your credentials are matched.
    </Modal.Description>
  </Modal.Content>
  <Modal.Actions>
    <Button onClick={handleopen}>OK</Button>
  </Modal.Actions>
</Modal>
}
      <Header as='h2' color='teal' textAlign='center'>
        Log-in to your account
      </Header>
      {
            errMessage && 
            <Message negative>
            <p>{message}</p>
            </Message>
      }
        
      <Form size='large' onSubmit={saveAndContinue}>
        <Segment stacked>
          <Form.Input fluid 
            icon='user' 
            iconPosition='left'
            name="email"
            
            value={form.email||""} 
            placeholder='E-mail address' 
            onChange={handleChange}
            type='email'
            error={(formError.emailError? true: false)?{content: formError.emailError} : false}
          />
          <Form.Field style={{ position: 'relative' }}>
          <Form.Input
            fluid
            width="14"
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type={passwordType}
            name="password"
            value={form.password||""} 
            onChange={handleChange}
            error={(formError.passwordError? true: false)?{content: formError.passwordError} : false}
          />
          <Icon name={icon} link onClick={togglePassword} className="showicon"/>
          </Form.Field>
        <a onClick={()=>navigate("/forgot")} link style={{cursor:"pointer"}}>Forgot Password?</a>
          <Button color='teal' fluid size='large'  type="submit">
            Login
          </Button>
        </Segment>
      </Form>
      <Button color='teal' fluid size='large' onClick={()=>navigate("/org/signup")} >New to us? Sign UP
      </Button>
    </Grid.Column>
  </Grid>
    
  )
}

export default Olog
