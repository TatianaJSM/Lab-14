import { z } from "zod";

export const slugify = (value) => {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const schema = z.object({
  titulo: z.string().trim().min(1, "El titulo es obligatorio"),
  artista: z.string().trim().min(1, "El artista es obligatorio"),
  genero: z.string().trim().min(1, "El genero es obligatorio"),
  anio: z.number().int().min(1900, "El anio debe ser valido"),
  sello: z.string().trim().min(1, "El sello es obligatorio"),
  pistas: z.number().int().positive("La cantidad de pistas debe ser positiva"),
  imagen: z.string().trim().min(1, "La imagen es obligatoria"),
  resumen: z.string().trim().min(1, "El resumen es obligatorio"),
  descripcion: z.string().trim().min(1, "La descripcion es obligatoria")
});

export default schema;