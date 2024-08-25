import { Request, Response, Router } from "express";
import { RegisterUserController } from "./controllers/auth/RegisterUser.controller";
import { ConnectUserController } from "./controllers/auth/ConnectUser.controller";
import { CheckEmailUserController } from "./controllers/auth/CheckEmailUser.controller";
import { CategoryController } from "./controllers/product/Category.controller";
import { ListCategoryController } from "./controllers/product/ListCategory.controller";
import { EditCategoryController } from "./controllers/product/EditCategory.controller";
import { DeleteCategoryController } from "./controllers/product/DeleteCategory.controller";


const router = Router()

router.get("/", (request: Request, response: Response) => {
    return response.send("E-Commerce backend")
})

// Registrar usuario
router.post("/register", new RegisterUserController().handle)
// Logar usuario
router.post("/session", new ConnectUserController().handle)
// Check se o email está disponivel para uso
router.post("/check-email", new CheckEmailUserController().handle)


// Rota criar categoria
router.post("/categories", new CategoryController().handle)
// Lista categorias
router.get("/list-categories", new ListCategoryController().handle)
// Editar categoria
router.post("/edit-categories", new EditCategoryController().handle)
// Deletar categoria
router.post("/delete-categories", new DeleteCategoryController().handle)


export { router } 