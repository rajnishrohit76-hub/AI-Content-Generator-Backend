const express = require("express");
const { submitContact } = require("../controllers/contactController");

const contactRouter = express.Router();

// POST /api/contact
contactRouter.post("/", submitContact);

module.exports = contactRouter;
