import * as album from "../../data/albumes.js";
import schema, { slugify } from "./album.schema.js";

export const create = (req, res) => {
  const parsed = schema.safeParse(req.body);

  if (!parsed.success) {
    const error = parsed.error.issues[0].message ?? "Datos invalidos";
    return res.status(400).json({ error });
  }

  const newAlbum = {
    ...parsed.data,
    slug: slugify(parsed.data.titulo)
  };

  const exists = album.getBySlug(newAlbum.slug);

  if (exists) {
    return res.status(409).json({
      error: "Ya existe un album con ese slug"
    });
  }

  const createdAlbum = album.create(newAlbum);

  res
    .status(201)
    .location(`/album/${createdAlbum.slug}`)
    .json(createdAlbum);
};