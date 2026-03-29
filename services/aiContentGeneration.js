const axios = require("axios");

const aiGenerateContentService = async (prompt) => {
    const isMockMode =
        String(process.env.USE_MOCK_AI).trim().toLowerCase() === "true";

    console.log(
        `AI Mode: ${isMockMode ? "MOCK" : "GEMINI-REST"} | Prompt: ${prompt}`
    );

    if (isMockMode) {
        return `Mock response for: ${prompt}`;
    }

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [{ text: prompt }]
                    }
                ]
            }
        );

        console.log("✅ GEMINI SUCCESS:", response.data);

        return (
            response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No response"
        );

    } catch (error) {
        console.error("❌ FINAL GEMINI ERROR:", error.response?.data || error.message);

        let errorMessage = "⚠️ AI service temporarily unavailable.";

        if (error.response?.data?.error?.status === "RESOURCE_EXHAUSTED") {
            errorMessage = "Quota Exceeded: Your Gemini API free tier limit has been reached. Please wait a few seconds/minutes or set USE_MOCK_AI=true in your .env file to continue testing without interruptions.";
        } else if (error.response?.data?.error?.message) {
            errorMessage = error.response.data.error.message;
        }

        return `${errorMessage}\n\nFallback response for: "${prompt}"`;
    }
};

module.exports = {
    aiGenerateContentService
};