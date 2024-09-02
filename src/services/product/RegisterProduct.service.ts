import { prisma } from "../../prisma/prisma";
import { z } from "zod"

interface RegisterProductProps {
    name: string;
    amount: number;
    value: number;
    urlImage: string;
    idCategory: string;
}

// arrumar depois o amount, para receber apenas valores do tipo inteiro
const RegisterProductZod = z.object({
    name: z.string().min(1, {message: "O nome do produto deve conter no minimo 1 caractere."}).max(100, {message: "O produto deve conter no maximo 100 caracteres."}),
    amount: z.number().min(1, {message: "É necessario ter no minímo 1 produto."}),
    value: z.number({message: "É obrigatorio informar um valor."}),
    urlImage: z.string({message: "É necessario enviar uma url, no formato string."}),
    idCategory: z.string({message: "É necessario informar o ID da categoria valido."}),
})

class RegisterProductService {
    async execute({ name, amount, value, urlImage, idCategory }: RegisterProductProps) {
        const parseResult = RegisterProductZod.safeParse({name, amount, value, urlImage, idCategory})
        if(!parseResult.success) {
            return {
                Error: parseResult.error.flatten().fieldErrors,
            }
        }
        const nameLowerCase = name.toLowerCase()

        const checkProduct = await prisma.produto.findFirst({
            where: {nomeProduto: nameLowerCase}
        })

        if(checkProduct) {
            return {
                message: `O produto ${nameLowerCase} já está cadastrado.`
            }
        }

        const checkCategory = await prisma.categories.findFirst({
            where: {id: idCategory}
        })

        if(!checkCategory) {
            return {
                message: "O id da categoria informada, não existe ou está incorreto."
            }
        }

        const product = await prisma.produto.create({
            data: {
                nomeProduto: nameLowerCase,
                quantidade: amount,
                valorProduto: value,
                urlImage: urlImage,
                categorieId: idCategory,
            },
            select: {
                id: true,
                nomeProduto: true,
                quantidade: true,
                valorProduto: true,
                urlImage: true,
                categorieId: true,
            }
        }) 

        return product
    }
}

export { RegisterProductService }