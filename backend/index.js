const express = require("express");
const mongoose = require("mongoose")
const cors = require('cors');

const Contacts = require("./models/Contact")

const app = express();
app.use(cors());
app.use(express.json())

app.post('/contacts', async (req, res) => {
    console.log("hello");
    // console.log(req.body);
    try {
        const newcontact = new Contacts(req.body);
        await newcontact.save();
        res.status(201).json({ message: "Contact saved successfully!" });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errorMessages = Object.values(err.errors).map(error => error.message);
            console.log(errorMessages)
            return res.status(400).json({ message: errorMessages });
        }
        res.status(500).json({ message: 'Server Error' });
    }
});

app.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contacts.find({});
        res.status(200).json(contacts);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to fetch contacts' });
    }
});

app.put('/contacts/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        console.log(id);
        console.log(data);
        
        const result = await Contacts.findByIdAndUpdate(id, data, { new: true, runValidators: true });

        if (!result) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json({ message: 'Updated Successfully' });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errorMessages = Object.values(err.errors).map(error => error.message);
            return res.status(400).json({ message: errorMessages });
        }
        res.status(500).json({ message: 'Failed to Update' });
    }
});






app.delete('/contacts/:id', async (req, res) => {
    let id  = req.params.id;
    // id=id.substring(1)
    
  

    try {
        
        const result =await Contacts.findOneAndDelete({_id: id});

        if (!result) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        return res.status(200).json({ message: 'Deleted Successfully' });
    } catch (err) {
        console.log('Error deleting contact:', err);
        return res.status(500).json({ message: 'Server Error' });
    }
});


mongoose.connect("mongodb+srv://srinikethansri:ucNn67eryQP0Pivf@cluster0.rxqgt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("Connencted to  mongo")
}).catch((err) => {
    console.log(err)
})
app.listen(5000, () => {
    console.log("serve activated")
})

// console.log(Contacts)