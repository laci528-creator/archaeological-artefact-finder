import express from "express"; 
import cors from "cors";
import artefactRoutes from "./routes/artefactRoutes.js"; 
import favoriteRoutes from "./routes/favoriteRoutes.js"; 




const app = express(); 

app.use(cors()); 
app.use(express.json());
app.use("/api/artefacts", artefactRoutes); 
app.use("/api/favorites", favoriteRoutes);


app.get("/", (req, res) => { 
    res.json({ message: "Archaeological Artefact Finder API" }); }); 

export default app;