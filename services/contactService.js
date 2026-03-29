const Contact = require("../schema/Contact");

// Save a new contact submission
const submitContactService = async (data) => {
    const { firstName, lastName, email, phone, subject, message } = data;

    if (!firstName || !lastName || !email || !subject || !message) {
        throw new Error("All required fields must be filled.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Invalid email address.");
    }

    const contact = await Contact.create({ firstName, lastName, email, phone, subject, message });
    return contact;
};

module.exports = { submitContactService };
