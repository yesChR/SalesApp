import { prisma } from "@/lib/prisma";

export type Producto = {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
};

// La BD devuelve id: BigInt y precio: Decimal → se convierten a number para JSON
type FilaProducto = {
  id: bigint;
  nombre: string;
  precio: { toString(): string };
  stock: number;
};

function toProducto(row: FilaProducto): Producto {
  return {
    id: Number(row.id),
    nombre: row.nombre,
    precio: Number(row.precio),
    stock: row.stock,
  };
}

export async function getProductos(): Promise<Producto[]> {
  const rows = await prisma.productos.findMany({ orderBy: { id: "asc" } });
  return rows.map(toProducto);
}

export async function addProducto(
  producto: Omit<Producto, "id">,
): Promise<Producto> {
  const row = await prisma.productos.create({ data: producto });
  return toProducto(row);
}
