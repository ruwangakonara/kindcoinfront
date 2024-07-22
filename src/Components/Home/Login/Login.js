import React, { useState, useContext } from 'react';
import { Button, Form, Grid, Header, Segment, Modal, Icon, Message } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserConext/UserContext'; // Adjust the import path if necessary

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9013',
  withCredentials: true, // This enables sending credentials (cookies) with the request
});

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setUserDetails } = useContext(UserContext); // Import setUser and setUserDetails from UserContext
  const [passwordType, setPasswordType] = useState('password');
  const [icon, setIcon] = useState('eye');
  const [loginError, setLoginError] = useState(null);
  const [modOpen, setModOpen] = useState(false); // State for modal open/close

  const togglePassword = () => {
    setPasswordType(prevType => prevType === 'password' ? 'text' : 'password');
    setIcon(prevIcon => prevIcon === 'eye' ? 'low vision' : 'eye');
  };

  const handleOpen = () => {
    setModOpen(false);
    navigate('/main');
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    const form = event.target.elements;

    const data = {
      username: form.username.value,
      password: form.password.value,
    };

    try {
      const response = await axiosInstance.post('/signin', data);

      if (response.status === 200) {
        const { user, donor, beneficiary } = response.data;
        setUser(user); // Save user in global state

        if (donor) {
          setUserDetails(donor); // Save donor details in global state
        } else if (beneficiary) {
          setUserDetails(beneficiary); // Save beneficiary details in global state
        } else {
          setUserDetails(null);
        }

        switch (user.status) {
          case 'admin':
            navigate('/admin/home');
            break;
          case 'donor':
            navigate('/donor/home');
            break;
          case 'beneficiary':
            navigate('/beneficiary/home');
            break;
          case 'crew_member':
            navigate('/crew_member/home');
            break;
          default:
            navigate('/'); // Navigate to default home if status is unknown
        }
      } else {
        setLoginError('An unknown error occurred');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 420) {
          setLoginError('Incorrect username');
        } else if (error.response.status === 409) {
          setLoginError('Incorrect password');
        } else {
          setLoginError('An unknown error occurred');
        }
      }
    }
  };

  return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          {modOpen && (
              <Modal open={modOpen}>
                <Modal.Content>
                  <Modal.Description>
                    Hurrah! Your credentials are matched.
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button onClick={handleOpen}>OK</Button>
                </Modal.Actions>
              </Modal>
          )}
          <Header as='h2' color='teal' textAlign='center'>
            Log-in to your account
          </Header>
          {loginError && (
              <Message negative>
                <p>{loginError}</p>
              </Message>
          )}
          <Form size='large' onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  name='username'
                  placeholder='E-mail address'
                  type='email'
              />
              <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type={passwordType}
                  name='password'
              />
              <Icon
                  name={icon}
                  link
                  onClick={togglePassword}
                  className='showicon'
                  style={{
                    position: 'absolute',
                    top: '103px',
                    left: '354px',
                    marginBottom: '10px',
                  }}
              />
              <a onClick={() => navigate('/forgot')} style={{ cursor: 'pointer' }}>
                Forgot Password?
              </a>
              <Button color='teal' fluid size='large' type='submit'>
                Login
              </Button>
            </Segment>
          </Form>
          <Button color='teal' fluid size='large' onClick={() => navigate('/people/signup')}>
            New to us? Sign UP
          </Button>
        </Grid.Column>
      </Grid>
  );
};

export default Login;
