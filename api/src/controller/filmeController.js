import { inserirfilme } from "../repository/filmeRepository.js";
import { alterarImagem } from "../repository/filmeRepository.js";
import { ListarTodosOsFilmes } from "../repository/filmeRepository.js";
import { BuscarPorID } from "../repository/filmeRepository.js";

import { Router } from "express";
import multer from 'multer';

const upload = multer({ dest : 'storage/capasFilmes' })
const server= Router();

server.post ('/filme', async (req, resp)=> {
    try {
        const novofilme= req.body;

        const filmeinserido= await inserirfilme(novofilme);

        resp.send(filmeinserido)
    } catch (err) {
        resp.send({
            erro: err.message
        })
        
    }
})


server.put ('/filme/:id/capa', upload.single ('capa'), async (req, resp) => {
    try {
        const { id } = req.params;
        const imagem = req.file.path;

        const resposta = await alterarImagem(imagem , id);
        if (resposta != 1)
            throw new Error ('A imagem não pode ser salva ') 
        resp.status(204).send();
    }
    catch (err) { 
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/filme', async (req, resp) => {
	try{
	const resposta = await ListarTodosOsFilmes();
	resp.send(resposta)
} catch(err){
	resp.status(400).send({
	    erro: err.message
    })}})
    

    server.get('/filme/:id', async (req, resp) => {
        try{
        const id = Number(req.params.id);
        const resposta = await BuscarPorID(id);
        if(!resposta)
        throw new Error('filme não encontrado')
        resp.send(resposta)
    } catch(err){
        resp.status(400).send({
        erro : err.message
    })}}
    )

export default server;