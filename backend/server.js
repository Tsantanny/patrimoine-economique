import express from "express";
import cors from "cors";

const port = 8080;
const app = express();

app.use(express.json());
app.use(cors());

import possessionRouter from "./routes/possession.js";
import patrimoineRouter from "./routes/patrimoine.js";

app.use("/possession", possessionRouter );
app.use("/patrimoine", patrimoineRouter);

app.listen(port, () => console.log("server running on port " + port));
