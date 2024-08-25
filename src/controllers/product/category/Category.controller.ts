import { Request, Response } from "express";
import { CategoryService } from "../../../services/product/category/Category.service";

class CategoryController {
  async handle(request: Request, response: Response) {
    const { name } = request.body;
    const categoryService = new CategoryService();

    const category = await categoryService.execute({
      name,
    });

    return response.json(category);
  }
}

export { CategoryController };
