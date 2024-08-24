import { Request, Response, Router } from "express";
import { RegisterUserController } from "./controllers/auth/RegisterUser.controller";
import { ConnectUserController } from "./controllers/auth/ConnectUser.controller";
import { CheckEmailUserController } from "./controllers/auth/CheckEmailUser.controller";
import { CategoryController } from "./controllers/product/Category.controller";


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

export { router } 