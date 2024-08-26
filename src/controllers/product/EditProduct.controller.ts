import { Request, Response } from "express";
import { EditProductService } from "../../services/product/EditProduct.service";

class EditProductController {
    async handle(request: Request, response: Response) {
        const { id, name, amount, value, idCategory } = request.body;
        const editProductService = new EditProductService()

        const editProduct = await editProductService.execute({
            id,
            name,
            amount,
            value,
            idCategory,
        })

        return response.json(editProduct)
    }
}

export { EditProductController }