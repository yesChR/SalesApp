import type { NextRequest } from "next/server";
import { addProducto, getProductos } from "@/lib/productos";

// GET /api/productos
export async function GET() {
  return Response.json(await getProductos());
}

// POST /api/productos
export async function POST(request: NextRequest) {
  const body = await request.json();

  const nombre = String(body.nombre ?? "").trim();
  const precio = Number(body.precio);
  const stock = Number(body.stock);

  if (!nombre || !Number.isFinite(precio) || !Number.isFinite(stock)) {
    return Response.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const producto = await addProducto({ nombre, precio, stock });
  return Response.json(producto, { status: 201 });
}
