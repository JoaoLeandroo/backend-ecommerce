import { prisma } from "../../prisma/prisma";
import { z } from "zod"

interface CategoryProps {
    name: string;
}

const CategoryZod = z.object({
    name: z.string().min(2, {message: "O nome da categoria, deve ter no minímo 2 caracteres."}).max(20, {message: "O nome da categoria, deve ter no máximo 20 caracteres."})
})

class CategoryService {
    async execute({ name }: CategoryProps) {
        const parseResult = CategoryZod.safeParse({name})
        if(!parseResult.success) {
            return {
                Error: parseResult.error.flatten().fieldErrors
            }
        }

        const nameCategoryLowerCase = name.toLowerCase()

        const categoryExist = await prisma.categories.findFirst({
            where: {nameCategorie: nameCategoryLowerCase}
        })

        if(categoryExist) {
            return {
                message: `A categoria ${nameCategoryLowerCase} já existe.`
            }
        }

        const category = await prisma.categories.create({
            data: {
                nameCategorie: nameCategoryLowerCase,
            },
            select: {
                nameCategorie: true,
            }
        })

        return category;
    }
}

export { CategoryService }