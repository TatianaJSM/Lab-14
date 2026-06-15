import * as album from "../../data/albumes.js";
import schema, { slugify } from "./album.schema.js";

export const update = (req, res) => {
  const currentAlbum = album.getBySlug(req.params.slug);

  if (!currentAlbum) {
    return res.status(404).json({
      error: "Album no encontrado"
    });
  }

  const parsed = schema.safeParse(req.body);

  if (!parsed.success) {
    const error = parsed.error.issues[0].message ?? "Datos invalidos";
    return res.status(400).json({ error });
  }

  const updatedAlbumData = {
    ...parsed.data,
    slug: slugify(parsed.data.titulo)
  };

  const duplicatedAlbum = album.getBySlug(updatedAlbumData.slug);

  if (duplicatedAlbum && duplicatedAlbum.slug !== req.params.slug) {
    return res.status(409).json({
      error: "Ya existe otro album con ese slug"
    });
  }

  const updatedAlbum = album.update(req.params.slug, updatedAlbumData);

  res.status(200).json(updatedAlbum);
};