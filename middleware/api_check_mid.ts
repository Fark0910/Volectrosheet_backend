import { Request, Response, NextFunction } from "express";

export const api_check_midd = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.body;

    // ... your UID lookup logic ...

    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.FIREBASE_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ localId: [uid] })
    });

    const data = await response.json() as { users?: any[] };

    if (data.users && data.users.length > 0) {
      return next(); 
    }

    res.status(401).json({ message: "Not a registered user" });
  } catch (error) {
    console.error("Middleware error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
