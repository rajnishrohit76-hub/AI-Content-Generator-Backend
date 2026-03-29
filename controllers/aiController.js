const { generateContentService, getHistoryService } = require("../services/aiService");

const generateContent = async (req, res) => {
   console.log("Generate Content Request Received:", req.body);
   try{
    const {prompt} = req.body;

    const data = await generateContentService(req.user.id, prompt);

    return res.status(200).json({
        success: true,
        message: "Content Generated Successfully",
        data
    })
   }catch(error){
    console.error("AI Generate Error:", error);
    return res.status(500).json({
        success: false,
        message: error.message,
        error: error.message
    })
   }
}

const getHistory = async (req, res) => {
    try{
        const data = await getHistoryService(req.user.id);
        return res.status(200).json({
            success: true,
            message: "History Fetched Successfully",
            data
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "History Fetch Failed",
            error: error.message
        })
    }
}

module.exports = {
    generateContent,
    getHistory
}