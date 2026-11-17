"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

// Client Component: corre en el navegador. El formulario hace POST
// al Route Handler /api/productos y luego refresca la tabla.
export default function ProductoForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const form = event.currentTarget;
    const data = new FormData(form);

    const res = await fetch("/api/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: data.get("nombre"),
        precio: data.get("precio"),
        stock: data.get("stock"),
      }),
    });

    setLoading(false);

    if (res.ok) {
      form.reset();
      router.refresh(); // vuelve a renderizar el Server Component con datos nuevos
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 2 }}>
        <TextField name="nombre" label="Nombre" size="small" required />
        <TextField
          name="precio"
          label="Precio"
          type="number"
          size="small"
          required
          slotProps={{ htmlInput: { step: "0.01", min: "0" } }}
        />
        <TextField
          name="stock"
          label="Stock"
          type="number"
          size="small"
          required
          slotProps={{ htmlInput: { min: "0" } }}
        />
        <Button type="submit" variant="contained" loading={loading}>
          Agregar
        </Button>
      </Stack>
    </form>
  );
}
