import { inserirfilme } from "../repository/usuarioRepository.js";
import { Router } from "express";

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

export default server;