import * as album from "../../data/albumes.js";

export const getAll = (req, res) => {
  if (req.query.include === "full") {
    return res.status(200).json(album.getAllFull());
  }

  res.status(200).json(album.getAll());
};