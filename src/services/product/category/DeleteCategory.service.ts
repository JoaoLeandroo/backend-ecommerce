import { prisma } from "../../../prisma/prisma";

interface DeleteCategoryProps {
  id: string;
}

class DeleteCategoryService {
  async execute({ id }: DeleteCategoryProps) {
    const categoryId = await prisma.categories.findFirst({
      where: { id: id },
    });

    if (!categoryId) {
      return {
        message: "Categoria não encontrada.",
      };
    }

    const deleteCategory = await prisma.categories.delete({
      where: {
        id: id,
      },
      select: {
        id: true,
        nameCategorie: true,
      },
    });

    return deleteCategory;
  }
}

export { DeleteCategoryService };
