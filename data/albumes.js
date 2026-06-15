import { DatabaseSync } from "node:sqlite";
import { cwd } from "node:process";

const db = new DatabaseSync(`${cwd()}/data/albumes.db`);

export const getAll = () => {
  const query = db.prepare("SELECT slug FROM albumes");
  return query.all();
};

export const getAllFull = () => {
  const query = db.prepare("SELECT * FROM albumes");
  return query.all();
};

export const getBySlug = (slug) => {
  const query = db.prepare("SELECT * FROM albumes WHERE slug = ?");
  return query.get(slug);
};

export const getByGenre = (genero) => {
  const query = db.prepare("SELECT slug FROM albumes WHERE lower(genero) = lower(?)");
  return query.all(genero);
};

export const search = (text) => {
  const value = `%${text}%`;

  const query = db.prepare(`
    SELECT slug FROM albumes
    WHERE lower(titulo) LIKE lower(?)
       OR lower(artista) LIKE lower(?)
       OR lower(genero) LIKE lower(?)
       OR lower(sello) LIKE lower(?)
       OR lower(resumen) LIKE lower(?)
       OR lower(descripcion) LIKE lower(?)
  `);

  return query.all(value, value, value, value, value, value);
};

export const create = (album) => {
  const query = db.prepare(`
    INSERT INTO albumes (
      titulo, artista, genero, anio, sello, pistas,
      imagen, slug, resumen, descripcion
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  query.run(
    album.titulo,
    album.artista,
    album.genero,
    album.anio,
    album.sello,
    album.pistas,
    album.imagen,
    album.slug,
    album.resumen,
    album.descripcion
  );

  return getBySlug(album.slug);
};

export const update = (slug, album) => {
  const query = db.prepare(`
    UPDATE albumes
    SET titulo = ?,
        artista = ?,
        genero = ?,
        anio = ?,
        sello = ?,
        pistas = ?,
        imagen = ?,
        slug = ?,
        resumen = ?,
        descripcion = ?
    WHERE slug = ?
  `);

  query.run(
    album.titulo,
    album.artista,
    album.genero,
    album.anio,
    album.sello,
    album.pistas,
    album.imagen,
    album.slug,
    album.resumen,
    album.descripcion,
    slug
  );

  return getBySlug(album.slug);
};

export const remove = (slug) => {
  const query = db.prepare("DELETE FROM albumes WHERE slug = ?");
  return query.run(slug);
};