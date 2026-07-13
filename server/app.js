import express from "express"; 
import cors from "cors";
import artefactRoutes from "./routes/artefactRoutes.js"; 


const app = express(); 
app.use(cors()); 
app.use(express.json());
app.use("/api/artefacts", artefactRoutes); 


app.get("/", (req, res) => { 
    res.json({ message: "Archaeological Artefact Finder API" }); }); 



export default app;