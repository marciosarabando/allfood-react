import { AppBar, Button, Container, TextField, Typography, Link, Paper } from "@mui/material";
import { Box, display } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../../http";
import IRestaurante from "../../../../interfaces/IRestaurante";
import { Link as RouterLink } from "react-router-dom";

const FormularioRestaurante = () => {

    const parametros = useParams()

    useEffect(() => {
        if (parametros.id) {
            http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
                .then((resposta) => {
                    setRestaurante(resposta.data.nome)
                })
        }
    }, [parametros])

    const [nomeRestaurante, setRestaurante] = useState('');

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        if (parametros.id) {
            http.put(`restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert('restaurante atualizado com sucesso')
                })
        }
        else {
            http.post('restaurantes/', {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert('restaurante cadastrado com sucesso')
                })
        }


    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexFlow: 1 }}>
            <Typography component="h1" variant="h6">Formulário de Restaurante</Typography>
            <Box component="form" sx={{ width: "100%" }} onSubmit={aoSubmeterForm}>
                <TextField
                    id="standard-basic"
                    value={nomeRestaurante}
                    onChange={evento => setRestaurante(evento.target.value)}
                    label="Nome do Restaurante"
                    variant="standard"
                    fullWidth
                    required
                />
                <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>
            </Box>
        </Box>
    )
}

export default FormularioRestaurante;