import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography, Button, IconButton, TextField, Modal } from '@mui/material';
import { Pagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from '../Components/Navbar';
import '../App.css'
const Details = () => {
    const [contacts, setContacts] = useState([]);
    const [open, setOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortedColumn, setSortedColumn] = useState('FirstName');

    const [currentContact, setCurrentContact] = useState(null);
    const [page, setPage] = useState(1);
    // const [pageDetails, setPageDetails] = useState([]);
    const pagesize = 5;
    const end = (page) * pagesize;
    const start = end - pagesize;
    // const current = contacts.slice(start, end);
    const totalpages = contacts.length / pagesize

    const [updatedContact, setUpdatedContact] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        PhoneNo: '',
        Company: '',
        JobTitle: ''
    });

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/contacts');
            setContacts(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSort = (column) => {
        if (sortedColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortedColumn(column);
            setSortOrder('asc');
        }
    };

    const sortedContacts = [...contacts].sort((a, b) => {
        let valueA = a[sortedColumn];
        let valueB = b[sortedColumn];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
            return valueA.localeCompare(valueB, 'en', { sensitivity: 'base' }) * (sortOrder === 'asc' ? 1 : -1);
        }

        if (typeof valueA === 'number' && typeof valueB === 'number') {
            return (valueA - valueB) * (sortOrder === 'asc' ? 1 : -1);
        }

        return 0;
    });

    const current = sortedContacts.slice(start, end);



    const handleDelete = async (id) => {
        try {
            console.log("hello")
            const res = await axios.delete(`http://localhost:5000/contacts/${id}`);
            setContacts((prevContacts) => prevContacts.filter((contact) => contact._id !== id));
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    const handleOpen = (contact) => {
        setCurrentContact(contact);
        setUpdatedContact({ ...contact });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdate = async () => {
        try {
            const res = await axios.put(`http://localhost:5000/contacts/${currentContact._id}`, updatedContact);
            fetchData()
            setOpen(false);
            alert("Data updated Successfully")

        } catch (err) {
            alert(err.response.data.message.join("\n"));

        }
    };

    const handleChange = (e) => {
        setUpdatedContact({
            ...updatedContact,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <Navbar />
            <Box sx={{
                display: 'flex',

                alignItems: 'center',
                flexDirection: 'column',
                height: '99vh',

                padding: 2,
                overflow: 'hidden'
            }}
            >

                <Typography textAlign={'left'} variant='h4' color='black' width='100%' marginTop={2} marginLeft={10} marginBottom={2}>Contact Details</Typography>
                <TableContainer component={Paper} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Table sx={{ width: '100%' }}>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#1A2130' }}>
                                <TableCell align="left" onClick={() => handleSort('FirstName')}>
                                    <Typography variant='h6' sx={{ cursor: 'pointer', fontFamily: 'Roboto', color:'white' }}>
                                        First Name {sortedColumn === 'FirstName' ? (sortOrder === 'asc' ? '🔼' : '🔽') : '🔽'}
                                    </Typography>
                                </TableCell>
                                <TableCell align="left" onClick={() => handleSort('LastName')}>
                                    <Typography variant='h6' sx={{ cursor: 'pointer', fontFamily: 'Roboto', color:'white' }}>
                                        Last Name {sortedColumn === 'LastName' ? (sortOrder === 'asc' ? '🔼' : '🔽') : '🔽'}
                                    </Typography>
                                </TableCell>
                                <TableCell align="left" onClick={() => handleSort('Email')}>
                                    <Typography variant='h6' sx={{ cursor: 'pointer', fontFamily: 'Roboto', color:'white' }}>
                                        Email {sortedColumn === 'Email' ? (sortOrder === 'asc' ? '🔼' : '🔽') : '🔽'}
                                    </Typography>
                                </TableCell>
                                <TableCell align="left" onClick={() => handleSort('PhoneNo')}>
                                    <Typography variant='h6' sx={{ cursor: 'pointer', fontFamily: 'Roboto', color:'white' }}>
                                        PhoneNo {sortedColumn === 'PhoneNo' ? (sortOrder === 'asc' ? '🔼' : '🔽') : '🔽'}
                                    </Typography>
                                </TableCell>
                                <TableCell align="left" onClick={() => handleSort('Company')}>
                                    <Typography variant='h6' sx={{ cursor: 'pointer', fontFamily: 'Roboto', color:'white' }}>
                                        Company {sortedColumn === 'Company' ? (sortOrder === 'asc' ? '🔼' : '🔽') : '🔽'}
                                    </Typography>
                                </TableCell>
                                <TableCell align="left" onClick={() => handleSort('JobTitle')}>
                                    <Typography variant='h6' sx={{ cursor: 'pointer', fontFamily: 'Roboto', color:'white' }}>
                                        Job Title {sortedColumn === 'JobTitle' ? (sortOrder === 'asc' ? '🔼' : '🔽') : '🔽'}
                                    </Typography>
                                </TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left"></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {current.map((contact, index) => (
                                <TableRow key={contact._id} sx={{ backgroundColor: index % 2 == 0 ? 'white' : '#f8f9fa' }}>
                                    <TableCell align="left" sx={{ fontFamily: 'Roboto', fontSize: '18px' }}>{contact.FirstName}</TableCell>
                                    <TableCell align="left" sx={{ fontFamily: 'Roboto', fontSize: '18px' }}>{contact.LastName}</TableCell>
                                    <TableCell align="left" sx={{ fontFamily: 'Roboto', fontSize: '18px' }}>{contact.Email}</TableCell>
                                    <TableCell align="left" sx={{ fontFamily: 'Roboto', fontSize: '18px' }}>{contact.PhoneNo}</TableCell>
                                    <TableCell align="left" sx={{ fontFamily: 'Roboto', fontSize: '18px' }}>{contact.Company}</TableCell>
                                    <TableCell align="left" sx={{ fontFamily: 'Roboto', fontSize: '18px' }}>{contact.JobTitle}</TableCell>
                                    <TableCell align="left">
                                        <Button variant="contained" sx={{ backgroundColor: '#5A72A0' }} onClick={() => handleOpen(contact)}>
                                            Edit
                                        </Button>
                                    </TableCell>
                                    <TableCell align="left">
                                        <IconButton aria-label="delete" sx={{ color: 'red' }} size="large"onClick={() => handleDelete(contact._id)}>
                                            <DeleteIcon fontSize="inherit" />
                                        </IconButton>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>


                <Box sx={{ display: 'flex', justifyContent: 'center', bottom: '10px', marginBottom: '10px' }} className='pagination-component'>
                    <Pagination
                        count={Math.ceil(totalpages)}
                        page={page}
                        onChange={(event, value) => setPage(value)}
                        color="primary"
                        siblingCount={1}
                        boundaryCount={1}
                    />
                </Box>

                <Modal open={open} onClose={handleClose}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'white',
                            padding: 4,
                            borderRadius: 2,
                            boxShadow: 24,
                            minWidth: 300
                        }}
                    >
                        <Typography variant="h6">Update Contact</Typography>
                        <TextField label="First Name" name="FirstName" value={updatedContact.FirstName} onChange={handleChange} fullWidth margin="normal" />
                        <TextField label="Last Name" name="LastName" value={updatedContact.LastName} onChange={handleChange} fullWidth margin="normal" />
                        <TextField label="Email" name="Email" value={updatedContact.Email} onChange={handleChange} fullWidth margin="normal" />
                        <TextField label="Phone No" name="PhoneNo" value={updatedContact.PhoneNo} onChange={handleChange} fullWidth margin="normal" />
                        <TextField label="Company" name="Company" value={updatedContact.Company} onChange={handleChange} fullWidth margin="normal" />
                        <TextField label="Job Title" name="JobTitle" value={updatedContact.JobTitle} onChange={handleChange} fullWidth margin="normal" />
                        <Button variant="contained" onClick={handleUpdate} sx={{ marginTop: 2 }} sx={{backgroundColor:'green'}}>Update</Button>
                    </Box>
                </Modal>
            </Box>

        </>
    );
};

export default Details;
