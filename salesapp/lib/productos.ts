import { createClient } from "@/lib/supabase/server";

export type Producto = {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
};

export async function getProductos(): Promise<Producto[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("productos")
    .select("id, nombre, precio, stock")
    .order("id");

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function addProducto(
  producto: Omit<Producto, "id">,
): Promise<Producto> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("productos")
    .insert(producto)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}
