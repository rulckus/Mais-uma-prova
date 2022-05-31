import 'dotenv/config'

import cors from 'cors'
import express from 'express'
import usuarioController from './controller/usuarioController.js'
import filmeController from './controller/filmeController.js'

const server=express()

server.use(cors())
server.use(express.json())

server.use(usuarioController)
server.use(filmeController)
server.use('/storage/capaFilmes', express.static('storage/capasFilmes'))

server.listen(process.env.PORT, ()=>
                console.log(`Api Online na porta ${process.env.PORT}`))

