import * as album from "../../data/albumes.js";

export const getByGenre = (req, res) => {
  const results = album.getByGenre(req.params.genero);

  res.status(200).json(results);
};