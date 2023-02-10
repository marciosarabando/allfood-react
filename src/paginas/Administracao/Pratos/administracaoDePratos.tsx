import { AppBar, Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Link } from "@mui/material";
import { useEffect, useState } from "react"
import { Link as RouterLink } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";

const AdministracaoDePratos = () => {
    const [pratos, setPratos] = useState<IPrato[]>([]);

    useEffect(() => {
        //obter pratos
        http.get<IPrato[]>('pratos/')
            .then(rs => {
                setPratos(rs.data)
            })
            .catch(error => console.log(error))
    }, [])

    const excluir = (restauranteAhSerExcluido: IPrato) => {
        http.delete(`pratos/${restauranteAhSerExcluido.id}/`)
            .then(() => {
                const novaListaRestaurante = pratos.filter(restaurante => restaurante.id !== restauranteAhSerExcluido.id)
                setPratos([...novaListaRestaurante])
            })
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Descrição</TableCell>
                        <TableCell>Tag</TableCell>
                        <TableCell>Imagem</TableCell>
                        <TableCell>Editar</TableCell>
                        <TableCell>Ação</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pratos.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.nome}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.descricao}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.tag}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <a href={row.imagem} target='_blank'>Ver imagem</a>
                            </TableCell>
                            <TableCell>
                                <RouterLink to={`/admin/pratos/${row.id}`}>Editar</RouterLink>
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

export default AdministracaoDePratos