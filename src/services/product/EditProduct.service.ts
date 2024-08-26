import { prisma } from "../../prisma/prisma";
import { z } from "zod";

interface EditProductProps {
    id: string;
    name?: string;
    amount?: number;
    value?: number;
    idCategory?: string;
}

const EditProductZod = z.object({
    id: z.string({ message: "O id deve ser do tipo string." }),
    name: z.string().min(1, { message: "O nome do produto deve conter no mínimo 1 caractere." }).max(22, { message: "O produto deve conter no maximo 22 caracteres." }).optional(),
    amount: z.number().min(1, { message: "É necessario ter no minímo 1 produto." }).optional(),
    value: z.number({ message: "É obrigatorio informar um valor." }).optional(),
    idCategory: z.string({ message: "É necessario informar o ID da categoria valido." }).optional(),
});

class EditProductService {
    async execute({ id, name, amount, value, idCategory }: EditProductProps) {
        const parseResult = EditProductZod.safeParse({ id, name, amount, value, idCategory });
        if (!parseResult.success) {
            return {
                Error: parseResult.error.flatten().fieldErrors,
            };
        }

        const productExist = await prisma.produto.findFirst({
            where: { id: id },
        });

        if (!productExist) {
            return {
                message: "Produto não encontrado.",
            };
        }

        const editProduct = await prisma.produto.update({
            where: {
                id: id,
            },
            data: {
                nomeProduto: name ?? productExist.nomeProduto,
                quantidade: amount ?? productExist.quantidade,
                valorProduto: value ?? productExist.valorProduto,
                categorieId: idCategory ?? productExist.categorieId,
            },
        });

        return editProduct;
    }
}

export { EditProductService };