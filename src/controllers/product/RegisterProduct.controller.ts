import { Request, Response } from "express";
import { RegisterProductService } from "../../services/product/RegisterProduct.service";

class RegisterProductController {
    async handle(request: Request, response: Response) {
        const { name, amount, value, idCategory } = request.body;

        const registerProductService = new RegisterProductService()

        const product = await registerProductService.execute({
            name,
            amount,
            value,
            idCategory,
        })

        return response.json(product)
    }
}

export { RegisterProductController }