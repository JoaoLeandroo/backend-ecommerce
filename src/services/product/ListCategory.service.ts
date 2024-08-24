import { prisma } from "../../prisma/prisma";

class ListCategoryService {
    async execute() {
        const categories = await prisma.categories.findMany({
            select: {
                nameCategorie: true
            }
        })

        return categories
    }
}

export { ListCategoryService }