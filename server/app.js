import "dotenv/config";

import express from "express";
import cors from "cors";

import artefactRoutes from "./routes/artefactRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean);


app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Archaeological Artefact Finder API" });
});

app.use("/api/artefacts", artefactRoutes);
app.use("/api/favorites", favoriteRoutes);

export default app;