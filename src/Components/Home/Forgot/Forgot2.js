import React,{useState,useEffect,useRef} from 'react'
import {Button, Form, Grid, Header, Segment, Icon, Message, Modal} from 'semantic-ui-react'
import { useNavigate, useParams} from "react-router-dom";



const  Forgot2= ({form :{form, handleChange,saveAndContinue,formError,open,setCurrent,errMessage,
    message,fetchData,modOpen,setOpen,setModopen,setreset
  }}) => {

    const {token} = useParams()

  const delay = 1000;
  const [passwordType, setPasswordType] = useState("password");
  const [confirm,setConfirm] = useState("password");
  const [icon,setIcon] = useState("eye");
  const [confirmicon,setConfirmIcon] = useState("eye");
  const [retmail,setRetmail] = useState("Change Password");
  const [time,setTime] = useState(false);
  const [resendtimer,setResendtimer] = useState(120);


  useEffect(()=>{
    if(open){
        console.log("i am in useeffect",retmail);
        if(retmail==="Send mail"){
            // if(modOpen===false)
            // fetchData("http://localhost:9013/forgot",form,"forgot","POST");
            //
            // if(modOpen===true)
            // {
            //     setRetmail("Change Password");
            //     setTime(true);
            //     setCurrent("forgot");
            //     setModopen(false);
            //     setOpen(false);
            // }

        }
        else{
            let data = {
                email: form.email,
                password: form.password,
                token: token,
              }
              if(modOpen===false)
              fetchData("http://localhost:9013/reset",data,"forgot","POST");

                // if(modOpen===true){
                //     setreset();
                //     navigate(-1);
                // }
        }
    }

  },[open,modOpen]);

    const handleopen = () =>{
        setModopen(false);
        console.log(" reset completed");
        navigate("/login/login");
        setreset();
    }

  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

    useEffect(() => {
        if(time)
        {
            resetTimeout();
            timeoutRef.current = setTimeout(
            () =>
                setResendtimer(resendtimer - 1),
            delay
            );

            return () => {
            resetTimeout();
            };
        }
  }, [resendtimer,time]);



  const resend = ()=>{
      fetchData("http://localhost:9013/forgot",form,"forgot","POST");
      setResendtimer(120);
  }




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
        
          <Header as='h2' color='teal' textAlign='center'>
            {/* {<Image src='/logo.png' />}  */}
            Forgot password
          </Header>
          {
            errMessage && 
            <Message negative>
            <p>{message}</p>
            </Message>
          }

            {modOpen &&
                <Modal open={modOpen}>
                    <Modal.Header>Thank you!</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            Password has been reset
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={handleopen}>OK</Button>
                    </Modal.Actions>
                </Modal>
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
              {retmail === "Change Password" &&
                  <div>
                      {/*<Form.Input*/}
                      {/*  fluid*/}
                      {/*  label="OTP"*/}
                      {/*  name="OTP"*/}
                      {/*  value={form.OTP||""}*/}
                      {/*  placeholder='OTP'*/}
                      {/*  onChange={handleChange}*/}
                      {/*  type='Number'*/}
                      {/*  min = {1000}*/}
                      {/*  max = {9999}*/}
                      {/*  error={(formError.OTPError? true: false)?{content: formError.OTPError} : false}*/}
                      {/*/>*/}
                      <Form.Field style={{ position: 'relative' }}>
                        <Form.Input
                            fluid
                            width="14"
                            label="New Password"
                            icon='lock'
                            iconPosition='left'
                            placeholder='New Password'
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
                    {/*{resendtimer>0?(<p>Resend OTP in <strong>{resendtimer}s</strong></p>):(<a onClick={resend} style={{cursor:"pointer"}}>Resend OTP</a>)}*/}
                    {/*  {resendtimer>0?(<p>Resend OTP in <strong>{resendtimer}s</strong></p>):*/}
                          <a href="http://localhost:3000/forgot" style={{cursor:"pointer"}}>Resend Link</a>
                  {/*}*/}


                  </div>

              }
              
              <Button color='teal' fluid size='large'  type="submit">
                {retmail}
              </Button>
            </Segment>
          </Form>
          
        </Grid.Column>
      </Grid>
    
  )
}

export default Forgot2;
