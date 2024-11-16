import React from 'react'
import { Stack, TextField, Typography, Box, Button } from '@mui/material'
import { useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios'
import Navbar from './Navbar';
const Form = () => {
    const [Contacts, setContacts] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        PhoneNo: '',
        Company: '',
        JobTitle: '',
    });

    const handleChange=(e)=>{
        const {name,value}=e.target;


        setContacts({...Contacts,[name]:value});

    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log("hello")

        try{
            const res=await axios.post('http://localhost:5000/contacts',Contacts);

            alert("Contact Details added successfully")
            console.log(res);
        }
        catch(err){

            alert(err.response.data.message.join("\n"));


            
        

        }
      
    }


    return (
        <>
        
        <Navbar />
        <Box sx={{ display: 'flex', justifyContent: 'space-around', margin: '20px', }} component='form' onSubmit={handleSubmit}>

            <Stack direction="column" spacing={2} sx={{ width:'50vw',padding:'40px'}}>
                <Typography variant='h6' textAlign={'center'} >Add New Contacts</Typography>



                <TextField label='FirstName' name="FirstName" value={Contacts.FirstName} type='text' size='small' variant='outlined' onChange={handleChange} />
                <TextField label='LastName' name="LastName" value={Contacts.LastName} type='text' size='small' variant='outlined' onChange={handleChange} />
                <TextField label='Email' name='Email' value={Contacts.Email} type='email' size='small' variant='outlined' onChange={handleChange} />
                <TextField label='PhoneNo' name="PhoneNo"value={Contacts.PhoneNo} type='text' size='small' variant='outlined' onChange={handleChange} />
                <TextField label='Company' name="Company" value={Contacts.Company} type='text' size='small' variant='outlined' onChange={handleChange} />
                <TextField label='Job Title' name="JobTitle"value={Contacts.JobTitle} type='text' size='small' variant='outlined' onChange={handleChange} />
                <Box sx={{textAlign:'center'}}>

                    <Button variant='contained' type='submit' sx={{width:'20vw'}}>Add Details</Button>
                </Box>
                {/* <Link to='/details'><Button variant='contained'>Details</Button></Link> */}

            </Stack>





        </Box>
        </>
    )
}

export default Form
