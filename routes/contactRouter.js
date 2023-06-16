const express = require("express");
const router = express.Router();


// const {
//   getContacts,
//   getContact,
//   C,
//   updateContact,
//   deleteContact,
// } = require("../controllers/contactControllers");

// router.route("/").get(getContacts).post(createContact).put(updateContact).delete(deleteContact);

// router.route("/:id").get(getContact);

const { getContacts, getContact, createContact, updateContact, deleteContact } = require("../controllers/contactControllers");

router.route("/").get(getContacts).post(createContact)
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact)                                                                                                                                                                                                                                                                           
module.exports = router;
