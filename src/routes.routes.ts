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
import { ListProductController } from "./controllers/product/ListProduct.controller";

import { isAuthentication } from "./middlewares/IsAuthentication";
import { checkUserPermission } from "./middlewares/CheckUserPermission";

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
router.post("/categories", isAuthentication, checkUserPermission, new CategoryController().handle);
// Lista categorias
router.get("/list-categories", new ListCategoryController().handle);
// Editar categoria
router.post("/edit-categories", isAuthentication, checkUserPermission, new EditCategoryController().handle);
// Deletar categoria
router.post("/delete-categories", isAuthentication, checkUserPermission, new DeleteCategoryController().handle);

// Cadastrar produto
router.post("/register-product", isAuthentication, checkUserPermission, new RegisterProductController().handle)
// Editar produto
router.post("/edit-product", isAuthentication, checkUserPermission, new EditProductController().handle)
// Deletar produto
router.post("/delete-product", isAuthentication, checkUserPermission, new DeleteProductController().handle)
// Lista de produtos
router.get("/list-products", new ListProductController().handle)

export { router };
