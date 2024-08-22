import { prisma } from "../../prisma/prisma";

interface CheckEmailProps {
    email: string;
}

class CheckEmailUserService {
    async execute({email}: CheckEmailProps) {
        const emailLowerCase = email.toLowerCase()

        const checkEmail = await prisma.usuario.findFirst({
            where: {email: emailLowerCase}
        })

        if(checkEmail) {
            return {message: "Email já cadastrado."}
        }else {
            return {message: "Email disponivel para uso."}
        }
    }
}

export { CheckEmailUserService }