import React, {useEffect} from 'react'
import { Button, Form, Grid, Header, Segment, Dropdown,Modal } from 'semantic-ui-react'
import Navbar from "../../Components/Home/NavBar2/NavBar";
import {useNavigate} from "react-router-dom";

const Options = [
    { key: 'AL', text: 'Organisation', value: 'Organisation' },
    { key: 'Ab', text: 'Individual', value: 'Individual' },
]


const Contact = ({handlechange,form :{form, handleChange,saveAndContinue,formError,countryOptions,open,setOpen, setreset, setForm,setIsSubmitting, setModopen, modOpen, fetchData}}) => {

  const  navigate = useNavigate()

  // const handleopen = () => {
  //   setOpen(false);
  //   setIsSubmitting(false);
  //   setForm({});
  //   handlechange(1);
  // }


  const handleopen = () =>{
    setModopen(false);
    console.log(" qquery completed");
    navigate("/");
    setreset();
  }


  useEffect(()=>{
    if(open){
      let data = {
        // name: form.username,
        // password: form.password,
        phone: form.phone,
        // district: form.district,
        // type: form.type,
        name: form.name,
        email: form.email,
        // date_of_birth: form.date_of_birth,
        message: form.message
      }
      fetchData('http://localhost:9013/query',data,"signup","POST");
    }

  },[open]);



  return (
      <div>
        <Navbar/>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header textAlign='center'>
              <h1>Enter User Details</h1>
            </Header>
            {open &&
                <Modal open={modOpen}>
                  <Modal.Header>Thank you!</Modal.Header>
                  <Modal.Content>
                    <Modal.Description>
                      For reaching us. We will get back to you soon
                    </Modal.Description>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button onClick={handleopen}>OK</Button>
                  </Modal.Actions>
                </Modal>
            }
            <Form onSubmit={saveAndContinue}>
              <Segment>
                <Form.Input
                    label='Name'
                    name="name"
                    placeholder='Name'
                    value={form.name||""}
                    onChange={handleChange}
                    error={(formError.nameError? true: false)?{content: formError.nameError} : false}
                />
                {/*<Dropdown*/}
                {/*    fluid*/}
                {/*    label='Type'*/}
                {/*    name="type"*/}
                {/*    value={form.type||""}*/}
                {/*    type="dropdown"*/}
                {/*    placeholder='Select Type'*/}
                {/*    onChange={handleChange}*/}

                {/*    // defaultValue={values.State}*/}
                {/*    error={(formError.typeError? true: false)?{content: formError.typeError} : false}*/}
                {/*    search*/}
                {/*    selection*/}
                {/*    options={Options}*/}
                {/*/>*/}
                <Form.Input
                    fluid
                    label='Phone no.'
                    name="phone"
                    value={form.phone||""}
                    icon="phone"
                    iconPosition="left"
                    type='text'
                    placeholder='Phone no.'
                    onChange={handleChange}
                    // defaultValue={values.dob}
                    error= {(formError.phoneNoError? true: false)?{content: formError.phoneNoError} : false}
                />


                <Form.Input
                    fluid
                    label='Email'
                    icon="user"
                    name="email"
                    value={form.email||""}
                    iconPosition="left"
                    type='email'
                    placeholder='Email Address'
                    onChange={handleChange}
                    // defaultValue={values.email}
                    error={(formError.emailError? true: false)?{content: formError.emailError} : false}
                />
                <Form.Input
                    fluid
                    label='Message'
                    icon="message"
                    name="message"
                    value={form.message||""}
                    iconPosition="left"
                    type='textArea'
                    placeholder='Message'
                    onChange={handleChange}
                    // defaultValue={values.email}
                    error={(formError.messageError? true: false)?{content: formError.messageError} : false}


                />
                <Button type="submit" >Save And Continue</Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>

      </div>

  )


}

export default Contact;