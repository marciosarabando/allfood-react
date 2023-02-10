import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";
import ITag from "../../../interfaces/ITag";

const FormularioDePrato = () => {

    const [nomeDoPrato, setNomePrato] = useState('');
    const [descricao, setDescricao] = useState('');
    const [tags, setTags] = useState<ITag[]>([]);
    const [tag, setTag] = useState('');
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
    const [restaurante, setRestaurante] = useState('');
    const [imagem, setImagem] = useState<File | null>(null);

    const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
        if (evento.target.files?.length)
            setImagem(evento.target.files[0])
        else
            setImagem(null);
    }

    useEffect(() => {
        http.get<{ tags: ITag[] }>(`tags/`)
            .then((result) => {
                setTags(result.data.tags)
            })

        http.get<IRestaurante[]>(`restaurantes/`)
            .then((result) => setRestaurantes(result.data))

    }, [])

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        
        const formData = new FormData();
        formData.append('nome', nomeDoPrato);
        formData.append('descricao', descricao);
        formData.append('tag', tag);
        formData.append('restaurante', restaurante);

        if(imagem){
            formData.append('imagem', imagem);
        }

        http.request({
            url: 'pratos/',
            method: 'POST',
            headers:{
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
        .then(result => {
            setNomePrato('')
            setDescricao('')
            setTag('')
            setRestaurante('')
            alert('Prato cadastrado')
            
        })
        .catch(erro => console.log(erro))
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexFlow: 1 }}>
            <Typography component="h1" variant="h6">Formulário de Pratos</Typography>
            <Box component="form" sx={{ width: "100%" }} onSubmit={aoSubmeterForm}>
                <TextField
                    id="standard-basic"
                    value={nomeDoPrato}
                    onChange={evento => setNomePrato(evento.target.value)}
                    label="Nome do Prato"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />
                <TextField
                    id="standard-basic"
                    value={descricao}
                    onChange={evento => setDescricao(evento.target.value)}
                    label="Descrição"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />
                <FormControl margin="dense" fullWidth>
                    <InputLabel id="select-tag">Tag</InputLabel>
                    <Select labelId="select-tag" value={tag} onChange={evento => setTag(evento.target.value)}>
                        {
                            tags.map(tag =>
                                <MenuItem value={tag.value} key={tag.id}>
                                    {tag.value}
                                </MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
                <FormControl margin="dense" fullWidth>
                    <InputLabel id="select-restaurante">Restaurantes</InputLabel>
                    <Select labelId="select-restaurante" value={restaurante} onChange={evento => setRestaurante(evento.target.value)}>
                        {
                            restaurantes.map(restaurante =>
                                <MenuItem value={restaurante.id} key={restaurante.id}>
                                    {restaurante.nome}
                                </MenuItem>
                            )
                        }
                    </Select>
                </FormControl>

                <input type="file" onChange={evento => selecionarArquivo(evento)}></input>

                <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>
            </Box>
        </Box>
    )
}

export default FormularioDePrato;