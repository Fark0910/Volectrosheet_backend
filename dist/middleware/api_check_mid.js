"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api_check_midd = void 0;
const api_check_midd = async (req, res, next) => {
    try {
        const { uid } = req.body;
        // ... your UID lookup logic ...
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.FIREBASE_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ localId: [uid] })
        });
        const data = await response.json();
        if (data.users && data.users.length > 0) {
            return next();
        }
        res.status(401).json({ message: "Not a registered user" });
    }
    catch (error) {
        console.error("Middleware error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.api_check_midd = api_check_midd;
