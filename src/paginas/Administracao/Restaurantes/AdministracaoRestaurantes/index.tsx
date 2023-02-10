import { AppBar, Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Link } from "@mui/material";
import { useEffect, useState } from "react"
import { Link as RouterLink } from "react-router-dom";
import IRestaurante from "../../../../interfaces/IRestaurante";
import http from "../../../../http";

const AdministracaoRestaurantes = () => {
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    useEffect(() => {
        //obter restaurantes
        http.get<IRestaurante[]>('restaurantes/')
            .then(rs => {
                setRestaurantes(rs.data)
            })
            .catch(error => console.log(error))
    }, [])

    const excluir = (restauranteAhSerExcluido: IRestaurante) => {
        http.delete(`restaurantes/${restauranteAhSerExcluido.id}/`)
            .then(() => {
                const novaListaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteAhSerExcluido.id)
                setRestaurantes([...novaListaRestaurante])
            })
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Editar</TableCell>
                        <TableCell>Ação</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.nome}
                            </TableCell>
                            <TableCell>
                                <RouterLink to={`/admin/restaurantes/${row.id}`}>Editar</RouterLink>
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" color="error" onClick={() => excluir(row)}>Excluir</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoRestaurantes