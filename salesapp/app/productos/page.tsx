import { connection } from "next/server";
import { Suspense } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { getProductos } from "@/lib/productos";
import ProductoForm from "./ProductoForm";

const fmtPrecio = new Intl.NumberFormat("es-CR", {
  style: "currency",
  currency: "CRC",
});

// Server Component: lee los datos en el servidor, por request (connection()
// marca este bloque como dinámico dentro de Cache Components).
async function TablaProductos() {
  await connection();
  const productos = await getProductos();

  return (
    <Paper elevation={1} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="right">Stock</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productos.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.id}</TableCell>
              <TableCell>{p.nombre}</TableCell>
              <TableCell align="right">{fmtPrecio.format(p.precio)}</TableCell>
              <TableCell align="right">{p.stock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default function ProductosPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Productos
      </Typography>
      <Typography color="text.secondary">
        Datos servidos desde el backend (Server Component + API en
        /api/productos).
      </Typography>

      <Suspense fallback={<Skeleton variant="rounded" height={200} sx={{ mt: 2 }} />}>
        <TablaProductos />
      </Suspense>

      <Typography variant="h6" sx={{ mt: 4 }}>
        Agregar producto
      </Typography>
      <ProductoForm />
    </Container>
  );
}
