"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
//import api_check_midd from "../middleware/api_check_mid";
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = (0, express_1.Router)();
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY_2}`;
//router.use("/volectro", api_check_midd);
router.post("/volectro", async (req, res) => {
    try {
        const userMessage = req.body.message;
        const quer = `You are a professional electronics engineer with access to reliable manufacturer datasheets. 
Task:
Given a user query about an electronic component, follow these exact steps:

1. *Find one single, most reliable datasheet link* (from a trusted manufacturer website like Texas Instruments, STMicroelectronics, Vishay, ON Semiconductor, Infineon, etc. Avoid third-party sites like datasheetarchive or random PDF mirrors).

2. *Extract only the required technical information relevant to the user's question* directly from that datasheet.

3. *Filter and present the answer in a clear, structured format* with proper headings and bullet points. Keep it concise but accurate.

4. *Include the final datasheet link at the end* of the answer as a reference.

Formatting Template:

- *Component Name:*  
- *Category:*  
- *Key Electrical Characteristics:*  
- *Pin Configuration (if relevant):*  
- *Absolute Maximum Ratings (if asked):*  
- *Typical Applications:*  
- *Special Features:*  
- *Answer to Specific User Query:* (e.g., working principle, voltage rating, etc. — as asked)
- *Official Datasheet Link:*  

Strict Instructions:  
✔ Only use data from the manufacturer's official datasheet  
✔ Only one single datasheet link  
✔ No extra web search results or random websites  
✔ No AI filler text like "As an AI model..."      
✔ Be precise and fact-based  

Now, process the following user query:  
*${userMessage}*`;
        const geminiPayload = {
            contents: [
                {
                    parts: [
                        { text: quer }
                    ]
                }
            ]
        };
        const geminiRes = await axios_1.default.post(GEMINI_URL, geminiPayload, {
            headers: { "Content-Type": "application/json" }
        });
        // Extract Gemini response text
        const aiText = geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI";
        res.json({ response: aiText });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to get AI response" });
    }
});
module.exports = router;
