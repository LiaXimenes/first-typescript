import express from "express";
import cors from "cors";

import * as recommendationControllers from "./controllers/recommendationsController"


const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("OK!");
});

app.post("/recommendations", recommendationControllers.postSong)

app.post("/recommendations/:id/upvote", recommendationControllers.addVote)

app.post("/recommendations/:id/downvote", recommendationControllers.removeVote)

app.get("/recommendations/random", recommendationControllers.randomSong)

app.get("/recommendations/top/:amount", recommendationControllers.topSongs)


export default app;
