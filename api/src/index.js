import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import usuarioController from './controller/usuarioController.js'
import { Conexao } from './repository/connection.js'

const server=express()

server.use(cors())
server.use(express.json())

server.listen(process.env.PORT, ()=>
                console.log(`Api Online na porta ${process.env.PORT}`))

server.use(usuarioController)

