import { prisma } from "../../prisma/prisma";
import { z } from "zod"

interface RegisterProductProps {
    name: string;
    amount: number;
    value: number;
    idCategory: string;
}

// arrumar depois o amount, para receber apenas valores do tipo inteiro
const RegisterProductZod = z.object({
    name: z.string().min(1, {message: "O nome do produto deve conter no minimo 1 caractere."}).max(22, {message: "O produto deve conter no maximo 22 caracteres."}),
    amount: z.number().min(1, {message: "É necessario ter no minímo 1 produto."}),
    value: z.number({message: "É obrigatorio informar um valor."}),
    idCategory: z.string({message: "É necessario informar o ID da categoria valido."}),
})

class RegisterProductService {
    async execute({ name, amount, value, idCategory }: RegisterProductProps) {
        const parseResult = RegisterProductZod.safeParse({name, amount, value, idCategory})
        if(!parseResult.success) {
            return {
                Error: parseResult.error.flatten().fieldErrors,
            }
        }
        const nameLowerCase = name.toLowerCase()

        const product = await prisma.produto.create({
            data: {
                nomeProduto: nameLowerCase,
                quantidade: amount,
                valorProduto: value,
                categorieId: idCategory,
            },
            select: {
                id: true,
                nomeProduto: true,
                quantidade: true,
                valorProduto: true,
                categorieId: true,
            }
        }) 

        return product
    }
}

export { RegisterProductService }