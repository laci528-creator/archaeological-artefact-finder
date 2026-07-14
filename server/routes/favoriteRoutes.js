import express from "express"; 
import { 
    getFavorites, 
    addFavorite, 
    deleteFavorite, 
    updateFavoriteNote, 
} from "../controllers/favoriteController.js"; 





const router = express.Router(); 

router.get("/", getFavorites); 
router.post("/", addFavorite); 
router.delete("/:id", deleteFavorite); 
router.put("/:id/note", updateFavoriteNote); 


export default router;