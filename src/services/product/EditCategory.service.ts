import { prisma } from "../../prisma/prisma";
import { z } from "zod"
interface EditCategoryProps {
    id: string;
    name: string;
}

const EditCategoryZod = z.object({
    name: z.string().min(2, {message: "O nome da categoria deve ter no minímo 2 caracteres."}).max(20, {message: "O nome da categoria deve ter no maximo 20 caracteres."})
}) 

class EditCategoryService {
    async execute({ id, name }: EditCategoryProps) {
        const parseResult = EditCategoryZod.safeParse({name, id})
        if(!parseResult.success) {
            return {
                Error: parseResult.error.flatten().fieldErrors
            }
        }

        const idCategorie = await prisma.categories.findFirst({
            where: {id: id}
        })

        if(!idCategorie) {
            return {
                message: "Categoria não encontrada."
            }
        }

        const nameLowerCase = name.toLowerCase()
        const nameCategorie = await prisma.categories.findFirst({
            where: {nameCategorie: nameLowerCase}
        })
        if(nameCategorie) {
            return {
                message: `A categoria ${nameLowerCase} já existe.`
            }
        }
        const updateCatedoty = await prisma.categories.update({
            where: {
                id: id,
            },
            data: {
                nameCategorie: nameLowerCase
            },
            select: {
                id: true,
                nameCategorie: true,
            }
        })

        return updateCatedoty;
    }   
}

export { EditCategoryService }