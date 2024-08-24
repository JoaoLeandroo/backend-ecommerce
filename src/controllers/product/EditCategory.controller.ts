import { Request, Response } from "express";
import { EditCategoryService } from "../../services/product/EditCategory.service";

class EditCategoryController {
    async handle(request: Request, response: Response) {
        const { id, name } = request.body;
        const editCategoryService = new EditCategoryService()

        const updateCategory = await editCategoryService.execute({
            id,
            name
        })

        return response.json(updateCategory)
    }
}

export { EditCategoryController }