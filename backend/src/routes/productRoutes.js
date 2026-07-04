import express from "express";

import {
  createProduct,
  getProducts,
  getFeaturedProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * PUBLIC ROUTES
 */

// Get all products
router.get("/", getProducts);

// Featured products MUST come before :id
router.get("/featured", getFeaturedProducts);

// Get single product by ID
router.get("/:id", getSingleProduct);


/**
 * ADMIN ROUTES
 */

router.post("/", protect, adminOnly, createProduct);

router.put("/:id", protect, adminOnly, updateProduct);

router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;