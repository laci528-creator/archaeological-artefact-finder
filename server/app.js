import express from "express"; 
import cors from "cors"; 

const app = express(); 
app.use(cors()); 
app.use(express.json()); 

app.get("/", (req, res) => { 
    res.json({ message: "Archaeological Artefact Finder API" }); }); 




export default app;