import React from 'react'
import { Button, Form, Grid, Header, Segment, Dropdown,Modal } from 'semantic-ui-react'

const Options = [
    { key: 'AL', text: 'Organisation', value: 'Organisation' },
    { key: 'Ab', text: 'Individual', value: 'Individual' },
]

const Contact = ({handlechange,form :{form, handleChange,saveAndContinue,formError,countryOptions,open,setOpen,setForm,setIsSubmitting}}) => {


  const handleopen = () => {
    setOpen(false);
    setIsSubmitting(false);
    setForm({});
    handlechange(1);
  }


  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
    <Header textAlign='center'>
      <h1>Enter User Details</h1>
    </Header>
    {open && 
      <Modal open={open}>
      <Modal.Header>Thank you!</Modal.Header>
      <Modal.Content>
        <Modal.Description>
           For approaching to us we will get back to you soon
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
            name="Name"
            placeholder='Name'
            value={form.firstName||""}
            onChange={handleChange}
            error={(formError.firstNameError? true: false)?{content: formError.firstNameError} : false}
          />
          <Dropdown
            fluid
            label='Type'
            name="type"
            value={form.type||""}
            type="dropdown"
            placeholder='Select Type'
            onChange={handleChange}
          
            // defaultValue={values.State}
            error={(formError.typeError? true: false)?{content: formError.typeError} : false}
            search
            selection
            options={Options}
          />
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
            error= {(formError.phoneError? true: false)?{content: formError.phoneError} : false}
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
            name="email"
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
  )


}

export default Contact;