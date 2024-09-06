import { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma/prisma";
import { verify } from "jsonwebtoken"

interface PayLoad {
    sub: string;
}

const checkUserPermission = async (request: Request, response: Response, next: NextFunction) => {

    const userAdmin = request.body
    const authToken = request.headers.authorization
    if(!authToken) {
        
        return response.status(401).json({message: "Usuario não autorizado."}).end()
    }

    const [, token] = authToken.split(" ")

    try {
        const { sub } = verify(token, process.env.JWT_SECRET) as PayLoad
        const user = await prisma.admin.findFirst({
            where: {userId: sub}
        })
        if(!user) {
            return response.status(401).json({message: "Acesso negado. Permissões insuficientes."})
        }
        request.user_id = sub
        return next()
    }catch(err) {
        return response.status(401).json({ message: "Acesso negado. Permissões insuficientes." })
    }
    
}

export { checkUserPermission }