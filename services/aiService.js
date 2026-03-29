const Content = require("../schema/Content");
const User = require("../schema/User");
const { aiGenerateContentService } = require("./aiContentGeneration");

// Generate Content Service
const generateContentService = async (userId, prompt) => {

    // Check User
    const user = await User.findById(userId);
    if (!user) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
    }

    // Check Credits
    if (user.credits <= 0) {
        const error = new Error("Insufficient credits");
        error.status = 400;
        throw error;
    }

    // Generate Content using OpenAI
    const result = await aiGenerateContentService(prompt);

    // Deduct Credits
    user.credits -= 1;
    await user.save();

    // Save Content
    await Content.create({
        userId,
        prompt,
        result
    });

    // Return Result and Updated User Credits
    return {
        result,
        credits: user.credits
    };
}

// Get History Service
const getHistoryService = async (userId) => {
    const history = await Content.find({ userId }).sort({ createdAt: -1 });
    return history;
}

module.exports = {
    generateContentService,
    getHistoryService
}