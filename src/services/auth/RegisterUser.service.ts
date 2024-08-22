import { prisma } from "../../prisma/prisma";
import { z } from "zod"
import { hash } from "bcryptjs";


interface RegisterUserProps {
    name: string;
    email: string;
    password: string;
}

const User = z.object({
    name: z.string().min(3, {message: "O nome deve ter no minímo 3 caracteres."}),
    email: z.string().email({message: "Informe um email valido."}),
    password: z.string().min(6, {message: "A senha deve ter no minímo 6 caracteres."}),
})

class RegisterUserService {
    async execute({name, email, password}: RegisterUserProps) {

        const parseResult = User.safeParse({name, email, password})
        if(!parseResult.success) {
            return {
                Error: parseResult.error.flatten().fieldErrors
            }
        }

        const emailLowerCase = email.toLowerCase()

        const userAlreadyExist = await prisma.usuario.findUnique({
            where: {email: emailLowerCase}
        })

        if(userAlreadyExist) {
            return {
                message: "Email já cadastrado."
            }
        }

        const user = await prisma.usuario.create({
            data: {
                name: name,
                email: emailLowerCase,
                password: password,
            }
        })

        return user;
    }
}

export { RegisterUserService }