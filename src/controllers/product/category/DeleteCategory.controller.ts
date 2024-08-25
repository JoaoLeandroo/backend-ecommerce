import { Request, Response } from "express";
import { DeleteCategoryService } from "../../../services/product/category/DeleteCategory.service";

class DeleteCategoryController {
  async handle(request: Request, response: Response) {
    const { id } = request.body;
    const deleteCategoryService = new DeleteCategoryService();

    const deleteCategorie = await deleteCategoryService.execute({
      id,
    });

    return response.json(deleteCategorie);
  }
}

export { DeleteCategoryController };
