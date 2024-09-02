import { Request, Response } from "express";
import { RegisterProductService } from "../../services/product/RegisterProduct.service";

class RegisterProductController {
    async handle(request: Request, response: Response) {
        const { name, amount, value, urlImage, idCategory } = request.body;

        const registerProductService = new RegisterProductService()

        const product = await registerProductService.execute({
            name,
            amount,
            value,
            urlImage,
            idCategory,
        })

        return response.json(product)
    }
}

export { RegisterProductController }