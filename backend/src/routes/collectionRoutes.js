import express from "express";

import {
addToCollection,
getCollection,
removeFromCollection
} from "../controllers/collectionController.js";


const router = express.Router();


router.post("/add", addToCollection);

router.get("/:email", getCollection);

router.post("/remove", removeFromCollection);


export default router;