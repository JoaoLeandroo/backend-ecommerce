import { Request, Response, Router } from "express";
import { RegisterUserController } from "./controllers/auth/RegisterUser.controller";
import { ConnectUserController } from "./controllers/auth/ConnectUser.controller";
import { CheckEmailUserController } from "./controllers/auth/CheckEmailUser.controller";
import { CategoryController } from "./controllers/product/category/Category.controller";
import { ListCategoryController } from "./controllers/product/category/ListCategory.controller";
import { EditCategoryController } from "./controllers/product/category/EditCategory.controller";
import { DeleteCategoryController } from "./controllers/product/category/DeleteCategory.controller";
import { RegisterProductController } from "./controllers/product/RegisterProduct.controller";
import { EditProductController } from "./controllers/product/EditProduct.controller";
import { DeleteProductController } from "./controllers/product/DeleteProduct.controller";

const router = Router();

router.get("/", (request: Request, response: Response) => {
  return response.send("E-Commerce backend");
});

// Registrar usuario
router.post("/register", new RegisterUserController().handle);
// Logar usuario
router.post("/session", new ConnectUserController().handle);
// Check se o email está disponivel para uso
router.post("/check-email", new CheckEmailUserController().handle);

// Rota criar categoria
router.post("/categories", new CategoryController().handle);
// Lista categorias
router.get("/list-categories", new ListCategoryController().handle);
// Editar categoria
router.post("/edit-categories", new EditCategoryController().handle);
// Deletar categoria
router.post("/delete-categories", new DeleteCategoryController().handle);

// Cadastrar produto
router.post("/register-product", new RegisterProductController().handle)
// Editar produto
router.post("/edit-product", new EditProductController().handle)
// Deletar produto
router.post("/delete-product", new DeleteProductController().handle)

export { router };
