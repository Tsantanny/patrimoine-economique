import express from "express";
import cors from "cors";
import {routerPossession, routerPatrimoine } from "./routes/index.js";

const port = 8080;
const app = express();

app.use(cors());
app.use(express.json());


app.use("/possession", routerPossession );
app.use("/patrimoine", routerPatrimoine);

app.listen(port, () => console.log("server running on port " + port));
