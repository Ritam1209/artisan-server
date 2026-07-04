import express from "express";
import { sendEnquiryEmail } from "../controllers/contactController.js";

const router = express.Router();

// POST: /api/contact/send-email
router.post("/send-email", sendEnquiryEmail);

export default router;