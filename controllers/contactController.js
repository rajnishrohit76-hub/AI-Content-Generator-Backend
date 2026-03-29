const { submitContactService } = require("../services/contactService");

// Submit Contact Form Controller
const submitContact = async (req, res) => {
    try {
        const contact = await submitContactService(req.body);
        return res.status(201).json({
            success: true,
            message: "Your message has been sent successfully! We'll get back to you soon.",
            data: contact,
        });
    } catch (error) {
        console.error("Contact Submission Error:", error);
        return res.status(400).json({
            success: false,
            message: error.message || "Failed to submit contact form.",
        });
    }
};

module.exports = { submitContact };
