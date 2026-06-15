import * as album from "../../data/albumes.js";

export const getBySlug = (req, res) => {
  const selectedAlbum = album.getBySlug(req.params.slug);

  if (!selectedAlbum) {
    return res.status(404).json({
      error: "Album no encontrado"
    });
  }

  res.status(200).json(selectedAlbum);
};