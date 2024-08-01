import React,{useState} from "react"
import classes from "./CrewMemberTableCmp.module.css"
import { useNavigate } from 'react-router-dom';
import {
    TableRow,
    TableHeaderCell,
    TableHeader,
    TableFooter,
    TableCell,
    TableBody,
    Button,
    Icon,
    Table,
    ModalHeader,
    ModalContent,
    ModalActions,
    Modal,
    Form
  } from 'semantic-ui-react'

  function exampleReducer(state, action) {
    switch (action.type) {
      case 'OPEN_MODAL':
        return { open: true, dimmer: action.dimmer }
      case 'CLOSE_MODAL':
        return { open: false }
      default:
        throw new Error()
    }
  }

const CrewMemberTableCmp = () => {

    const navigate = useNavigate();

    const rows = [
        { userId: "1", name: "Chamal Fernando", registrationDate: "2024-05-29", email: "chamaldesh2020@gmail.com", NoOfOps: "5", town: "Colombo" },
        { userId: "2", name: "Nimal Fernando", registrationDate: "2024-05-29", email: "nimal1.fidao@hotmail.com", NoOfOps: "0", town: "Gampaha" },
        { userId: "3", name: "Sunil Perera", registrationDate: "2024-05-29", email: "sunilperera@gmail.com", NoOfOps: "1", town: "Kandy" },
        { userId: "4", name: "Nimalsha Warushawithana", registrationDate: "2024-05-29", email: "nimalwar@hotmail.com", NoOfOps: "3", town: "Galle" },
        { userId: "5", name: "Isuri Perera", registrationDate: "2024-06-02", email: "isuri.p@gmail.com", NoOfOps: "1", town: "Matara" },
        { userId: "6", name: "Sandun Pathirana", registrationDate: "2024-06-10", email: "sandun.path@gmail.com", NoOfOps: "4", town: "Kurunegala" },
        { userId: "7", name: "Ravindu Silva", registrationDate: "2024-06-15", email: "ravindu.silva@outlook.com", NoOfOps: "2", town: "Negombo" },
        { userId: "8", name: "Chamali Fernando", registrationDate: "2024-06-20", email: "chamali.fernando@yahoo.com", NoOfOps: "5", town: "Badulla" },
        { userId: "9", name: "Kasun Weerasinghe", registrationDate: "2024-06-25", email: "kasun.weera@hotmail.com", NoOfOps: "1", town: "Anuradhapura" },
        { userId: "10", name: "Lakshan Jayawardena", registrationDate: "2024-06-30", email: "lakshan.jaya@gmail.com", NoOfOps: "3", town: "Jaffna" },
    ]

    // const handleAddUser = () => {
    //     navigate('/admin/register/crew_member');
    // };

    const [state, dispatch] = React.useReducer(exampleReducer, {
        open: false,
        dimmer: undefined,
      })
    const { open, dimmer } = state

     // Form state and handlers
     const [formData, setFormData] = useState({
        name: '',
        registrationDate: '',
        userName: '',
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to a server
        console.log('Form data submitted:', formData);
        dispatch({ type: 'CLOSE_MODAL' });
        navigate('/admin/view/crew_member');
    };

    return (
        <div className={classes.mainContainer}>
            <Table celled compact definition>
                <TableHeader fullWidth>
                    <TableRow>
                        <TableHeaderCell>UserId</TableHeaderCell>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Registration Date</TableHeaderCell>
                        <TableHeaderCell>E-mail address</TableHeaderCell>
                        <TableHeaderCell>Town</TableHeaderCell>
                        <TableHeaderCell>No of Operations Doing</TableHeaderCell>
                        <TableHeaderCell></TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.userId}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.registrationDate}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.town}</TableCell>
                            <TableCell>{row.NoOfOps}</TableCell>
                            <TableCell className={classes.buttonStyles}><Button color="red" floated="center">Assign New Task</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter fullWidth>
                    <TableRow>
                        <TableHeaderCell colSpan='7'>
                        <Button
                            floated='right'
                            icon
                            labelPosition='left'
                            primary
                            size='small'
                            onClick={() => dispatch({ type: 'OPEN_MODAL', dimmer: 'inverted' })}
                        >
                            <Icon name='user' /> Add Crew Member
                        </Button>
                        </TableHeaderCell>
                    </TableRow>
                </TableFooter>
            </Table>

            <Modal
                dimmer={dimmer}
                open={open}
                onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
            >
                <ModalHeader>Register New Crew Member</ModalHeader>
                <ModalContent>
                    <Form onSubmit={handleSubmit}>
                        <Form.Field>
                            <label>Name:</label>
                            <input 
                                type="text" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>UserName:</label>
                            <input 
                                type="text" 
                                name="userName" 
                                value={formData.userName} 
                                onChange={handleChange} 
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Registration Date:</label>
                            <input 
                                type="date" 
                                name="registrationDate" 
                                value={formData.registrationDate} 
                                onChange={handleChange} 
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Email:</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                            />
                        </Form.Field>
                    </Form>
                </ModalContent>
                <ModalActions>
                    <Button negative onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
                       Cancel
                    </Button>
                    <Button positive onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
                        Register
                    </Button>
                </ModalActions>
            </Modal>
        </div>
    );
}
 
export default CrewMemberTableCmp;