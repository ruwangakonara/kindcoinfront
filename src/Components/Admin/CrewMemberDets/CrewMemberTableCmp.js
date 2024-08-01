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
  } from 'semantic-ui-react'

const CrewMemberTableCmp = ({ onAddUserClick }) => {

    const navigate = useNavigate();

    const rows = [
        {userId:"1",name:"Chamal Fernando",registrationDate:"2024-05-29",email:"chamaldesh2020@gmail.com",NoOfOps:"5"},
        {userId:"2",name:"Nimal Fernando",registrationDate:"2024-05-29",email:"nimal1.fidao@hotmail.com",NoOfOps:"0"},
        {userId:"3",name:"Sunil Perera",registrationDate:"2024-05-29",email:"sunilperera@gmail.com",NoOfOps:"1"},
        {userId:"4",name:"Nimalsha Warushawithana",registrationDate:"2024-05-29",email:"nimalwar@hotmail.com",NoOfOps:"3"},
    ]

    const handleAddUser = () => {
        navigate('/admin/register/crew_member');
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
                        <TableHeaderCell>No of Operations Doing</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.userId}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.registrationDate}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.NoOfOps}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter fullWidth>
                    <TableRow>
                        <TableHeaderCell colSpan='5'>
                        <Button
                            floated='right'
                            icon
                            labelPosition='left'
                            primary
                            size='small'
                            onClick={handleAddUser}
                        >
                            <Icon name='user' /> Add Crew Member
                        </Button>
                        </TableHeaderCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}
 
export default CrewMemberTableCmp;