import express, { Request, Response, NextFunction } from "express"
import { router } from "./routes.routes"

const server = express()

server.use(express.json())
server.use(router)

server.use((erro: Error, request: Request, response: Response, next: NextFunction) => {
    if(erro instanceof Error) {
        return response.status(400).json({
            error: erro.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: "Internal server error!!"
    })
})

server.listen(3000, () => console.log("servidor rodando com sucesso"))