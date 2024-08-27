import { Request, Response } from "express";
import { DeleteProductService } from "../../services/product/DeleteProduct.service";

class DeleteProductController {
    async handle(request: Request, response: Response) {
        const { id } = request.body;
        const deleteProductService = new DeleteProductService()

        const deleteProduct = await deleteProductService.execute({
            id
        })
        

        return response.json(deleteProduct)
    }
}

export { DeleteProductController }