import React,{useState,useEffect} from 'react'
import { Button, Form, Grid, Header, Segment, Dropdown,Modal,Icon,Message } from 'semantic-ui-react'
import "../Login/Login.css"
import { useNavigate} from "react-router-dom";
import axios from 'axios';


const Signup =  ({form :{form, handleChange,saveAndContinue,formError,countryOptions,typeOptions, open,errMessage,message,modOpen,
  setreset,fetchData,setCurrent,setModopen}}) => {

  setCurrent('donor');
  
const [passwordType, setPasswordType] = useState("password");
const [confirm,setConfirm] = useState("password");
const [icon,setIcon] = useState("eye");
const [confirmicon,setConfirmIcon] = useState("eye");

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:9013',
    withCredentials: true,
  });


  const handleopen = () =>{
    setModopen(false);
    console.log(" user completed"); 
    navigate("/login/login");
    setreset();
  }


  useEffect(()=>{
    if(open){
      let data = {
        username: form.username,
        password: form.password,
        phoneNo: form.phoneNo,
        district: form.district,
        type: form.type,
        name: form.name,
        lastName: form.lastName,
        date_of_birth: form.date_of_birth,
        status: "donor"
      }
      fetchData('http://localhost:9013/signup',data,"signup","POST");
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
      <h1>Enter Donor Details</h1>
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
    <Form onSubmit={saveAndContinue} >
      <Segment>
        <Form.Input
            label='Name'
            name="name"
            placeholder='Name'
            value={form.name||""}
            onChange={handleChange}
            error={(formError.nameError? true: false)?{content: formError.nameError} : false}
          />

        {/*<Form.Input*/}
        {/*    label='Last Name'*/}
        {/*    name="lastName"*/}
        {/*    value={form.lastName||""}*/}
        {/*    placeholder='Last Name'*/}
        {/*    onChange={handleChange}*/}
        {/*    error={(formError.lastNameError? true: false)?{content: formError.lastNameError} : false}*/}
        {/*  />*/}

        <Form.Input
            fluid
            label='Date of Birth/Organization Start Date'
            name="date_of_birth"
            value={form.date_of_birth||""}
            icon="calendar"
            iconPosition="left"
            type='date'
            placeholder='Date of Birth/Organization Start Date'
            onChange={handleChange}
            error= {(formError.dateError? true: false)?{content: formError.dateError} : false}
          />
          <Dropdown
            fluid
            label='District'
            name="district"
            value={form.district||""}
            type="dropdown"
            placeholder='Select District'
            onChange={handleChange}
            error={(formError.stateError? true: false)?{content: formError.stateError} : false}
            search
            selection
            options={countryOptions}
          />

        <Dropdown
            style = {{marginTop: "15px"}}
            fluid
            label='Type'
            name="type"
            value={form.type||""}
            type="dropdown"
            placeholder='Select Type'
            onChange={handleChange}
            error={(formError.typeError? true: false)?{content: formError.stateError} : false}
            search
            selection
            options={typeOptions}
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
            label='Email (Username)'
            icon="user"
            name="username"
            value={form.username||""}
            iconPosition="left"
            type='email'
            placeholder='Email Address'
            onChange={handleChange}
            error={(formError.emailError? true: false)?{content: formError.emailError} : false}
          />
        <Form.Field style={{ position: 'relative' }}>
              <Form.Input
                fluid
                width="14"
                icon='lock'
                label="Password"
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
                error= {(formError.confirmPasswordError? true: false)?{content: formError.confirmPasswordError} : false}
              />
              <Icon name={confirmicon} link onClick={()=>togglePassword('confim')} className="showicon" style={{top:25}}/>
              </Form.Field>
          <Button type="submit" >Save And Continue</Button>
      </Segment>
    </Form>
  </Grid.Column>
  </Grid>
  )


}

export default Signup;


// const sleep = (milliseconds) => {
//   return new Promise(resolve => setTimeout(resolve, milliseconds))
// }
// let [count,setCount] = useState(0);

// const doSomething = async () => {
//   for (; count < 3;) {
//     await sleep(2000)
//     setMessage(mess[count]);
//     await sleep(2000)
//     count++;
//   }
//   }
// doSomething();


// useEffect(()=>{
//   if(count===3){
//     setCount(0);
    
//   }
// },[count]); x