import express from "express";
import { 
    searchArtefacts, 
    getArtefactById, 
} from "../controllers/artefactController.js";

const router = express.Router();

router.get("/search", searchArtefacts);
router.get("/:id", getArtefactById);

export default router;
