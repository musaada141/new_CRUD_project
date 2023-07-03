const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const contactsFilePath = path.join(__dirname, "../models/contacts.json");

// Get all contacts
const getContacts = (req, res) => {
  const contacts = readContactsFromFile();
  res.json(contacts);
};

// Get a single contact by ID
const getContactById = (req, res) => {
  const contacts = readContactsFromFile();
  const contact = contacts.find((c) => c.id === parseInt(req.params.id));
  if (contact) {
    res.json(contact);
  } else {
    res.sendStatus(404);
  }
};

// Create a new contact
const createContact = (req, res) => {
  const newContact = {
    id: uuid.v4(),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    age: req.body.age,
    location: req.body.location,
  };

  if (!newContact.firstname ||!newContact.lastname ||!newContact.email ||!newContact.age ||!newContact.location) {
    return res.sendStatus(400);
  }

  const contacts = readContactsFromFile();
  contacts.push(newContact);
  writeContactsToFile(contacts);
  res.json(contacts);
};

// Update an existing contact
const updateContact = (req, res) => {
  const contacts = readContactsFromFile();
  const contactIndex = contacts.findIndex((c) => c.id === parseInt(req.params.id));
  if (contactIndex!== -1) {
    const updatedContact = {
    ...contacts[contactIndex],
      firstname: req.body.firstname || contacts[contactIndex].firstname,
      lastname: req.body.lastname || contacts[contactIndex].lastname,
      email: req.body.email || contacts[contactIndex].email,
      age: req.body.age!== undefined? req.body.age : contacts[contactIndex].age,
      location: req.body.location || contacts[contactIndex].location,
    };
    contacts[contactIndex] = updatedContact;
    writeContactsToFile(contacts);
    res.json(contacts);
  } else {
    res.sendStatus(404);
  }
};

// Delete a contact
const deleteContact = (req, res) => {
  const contacts = readContactsFromFile();
  const contactIndex = contacts.findIndex((c) => c.id === parseInt(req.params.id));
  if (contactIndex!== -1) {
    contacts.splice(contactIndex, 1);
    writeContactsToFile(contacts);
    res.json({ message: "Contact deleted", contacts });
  } else {
    res.sendStatus(404);
  }
};

// Helper functions
const readContactsFromFile = () => {
  try {
    const contactsData = fs.readFileSync(contactsFilePath, "utf8");
    return JSON.parse(contactsData);
  } catch (error) {
    console.error("Error reading contacts file:", error);
    return [];
  }
};

const writeContactsToFile = (contacts) => {
  try {
    const contactsData = JSON.stringify(contacts);
    fs.writeFileSync(contactsFilePath, contactsData);
  } catch (error) {
    console.error("Error writing contacts file:", error);
  }
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};