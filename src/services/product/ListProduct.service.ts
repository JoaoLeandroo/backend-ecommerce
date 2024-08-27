import { prisma } from "../../prisma/prisma";

class ListProductService {
    async execute() {
        
        const products = await prisma.produto.findMany({
            select:{
                id: true,
                nomeProduto: true,
                quantidade: true,
                valorProduto: true,
                categorieId: true,
            }
        })

        if(products.length === 0) {
            return {
                message: "Nenhum produto cadastrado."
            }
        }

        return products
    }
}

export { ListProductService }