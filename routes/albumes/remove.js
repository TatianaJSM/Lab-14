import * as album from "../../data/albumes.js";

export const remove = (req, res) => {
  const selectedAlbum = album.getBySlug(req.params.slug);

  if (!selectedAlbum) {
    return res.status(404).json({
      error: "Album no encontrado"
    });
  }

  album.remove(req.params.slug);

  res.status(204).send();
};