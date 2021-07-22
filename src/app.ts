import express from "express";
import cors from "cors";

import * as recommendationControllers from "./controllers/recommendationsController"


const app = express();
app.use(cors());
app.use(express.json());

app.post("/test", (req, res) => {
  res.send("OK!");
});

app.post("/recommendations", recommendationControllers.postSong)

// app.post("/recommendations/:id/upvote", )

// app.post("/recommendations/:id/downvote", )

// app.get("/recommendations/random", )

// app.get("/recommendations/top/:amount", )


export default app;
