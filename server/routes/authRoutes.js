import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
        if (!req.user) {
            return res.status(401).json({ message: "Authentication failed" });
        }

        res.cookie("token", req.user.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });

        res.redirect("http://localhost:3000/")
    }
);

router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logout successful" });
});

export default router;