import "dotenv/config";
import express from "express";
import { create } from "./routes/albumes/create.js";
import { update } from "./routes/albumes/update.js";
import { remove } from "./routes/albumes/remove.js";

import "dotenv/config";

const HOST = process.env.HOST;
const PORT = process.env.PORT;

import { getAll } from "./routes/albumes/getAll.js";
import { getBySlug } from "./routes/albumes/getBySlug.js";
import { getByGenre } from "./routes/albumes/getByGenre.js";
import { search } from "./routes/albumes/search.js";

const app = express();

const HOST = process.env.HOST ?? "localhost";
const PORT = process.env.PORT ?? 4321;

app.use(express.json());
app.use("/imagenes", express.static("public/imagenes"));

app.get("/", (req, res) => {
  res.status(200).json({
    nombre: "DiscoStore API",
    version: "1.0",
    descripcion: "API REST para administrar un catalogo de albumes musicales.",
    rutas: [
      "/albumes",
      "/album/:slug",
      "/genero/:genero",
      "/search/:text",
      "/imagenes/:archivo"
    ]
  });
});

app.get("/albumes", getAll);
app.get("/album/:slug", getBySlug);
app.get("/genero/:genero", getByGenre);
app.get("/search/:text", search);

app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada"
  });
});
app.post("/albumes", create);
app.put("/album/:slug", update);
app.delete("/album/:slug", remove);

app.listen(PORT, HOST, () => {
  console.log(`Servidor en http://${HOST}:${PORT}/`);
});