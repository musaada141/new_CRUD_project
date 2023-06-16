const express = require("express");
const uuid = require("uuid");
const contacts = require("../models/contacts")

// to get all contacts 
const getContacts = (req, res) => {
  res.json(contacts)
}

// to get a single contact specify by the id
const getContact = (req, res) => {
  const search = contacts.some(contact => contact.id === parseInt(req.params.id))

  if (search) {
    res.json(contacts.filter(contact => contact.id === parseInt(req.params.id)))
  } else {
    res.sendStatus(400)
  }
}

// to create new contact
const createContact = (req, res) => {
  const newContact = {
    id: uuid.v4(),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    age: req.body.age,
    location: req.body.location
  }

  if (!newContact.firstname || !newContact.lastname || !newContact.email || !newContact.age || !newContact.location) {
    return res.sendStatus(400)
  }

  contacts.push(newContact)
  res.json(contacts)
}


// to update contact
const updateContact = (req, res) => {
  const found = contacts.some(contact => contact.id === parseInt(req.params.id))

  if (found) {
    const update = req.body
    contacts.forEach(contact => {
      if (contact.id === parseInt(req.params.id)) {
        contact.firstname = update.firstname ? update.firstname: contact.firstname
        contact.lastname = update.lastname ? update.lastname : contact.lastname
        contact.email = update.email ? update.email: contact.email
        contact.age= update.age ? update.age: contact.age
        contact.location = update.location ? update.location : contact.location

        res.json({msg: "user updated", contacts})
      }
    })
  }
}



// to delete contact
// const deleteContact = (req, res) => {
//   const found = contacts.some((contact) => contact.id === parseInt(req.params.id))

//   if (found) {
//     contacts = contacts.filter((contact) => contact.id !== parseInt(req.params.id))
//       req.json({
//       msg: "Contact Deleted",
//       contacts,
//     })           
//   } else {
//       res.sendStatus(400)
//   }
// }

//Delete User

const deleteContact = (req, res) => {
  const found = contacts.some(contact => contact.id === parseInt(req.params.id))
  if (found) {
    contacts = contacts.filter(contact => contact.id !== parseInt(req.params.id))
    res.json({
      msg: "User deleted",
      contacts
    });
  } else {
    res.sendStatus(400);
  }
};



module.exports = { getContacts, getContact, createContact, updateContact, deleteContact };