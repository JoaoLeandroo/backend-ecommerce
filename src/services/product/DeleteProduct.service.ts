import { prisma } from "../../prisma/prisma";
import { z } from "zod"

interface DeleProductProps {
    id: string;
}

const DeleteProductZod = z.object({
    id: z.string()
})

class DeleteProductService {
    async execute({id}: DeleProductProps) {
        
        const parseResult = DeleteProductZod.safeParse({ id });
        if (!parseResult.success) {
          return {
            Error: parseResult.error.flatten().fieldErrors,
          };
        }

        const productExist = await prisma.produto.findFirst({
            where: {id: id}
        })

        if(!productExist) {
            return {
                message: "Produto não localizado."
            }
        }

        const deleteProduct = await prisma.produto.delete({
            where: {
                id: id
            },
            select: {
                nomeProduto: true
            }
        })

        return deleteProduct
    }
}

export { DeleteProductService }