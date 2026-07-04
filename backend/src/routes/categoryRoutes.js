import express from "express";
import {
  createCategory,
  getCategories,
  deleteCategory
} from "../controllers/categoryController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, createCategory);
router.get("/", getCategories);
router.delete("/:id", protect, adminOnly, deleteCategory);

export default router;