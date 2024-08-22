import { Request, Response, Router } from "express";
import { RegisterUserController } from "./controllers/auth/RegisterUser.controller";
import { ConnectUserController } from "./controllers/auth/ConnectUser.controller";

const router = Router()

router.get("/", (request: Request, response: Response) => {
    return response.send("E-Commerce backend")
})

router.post("/register", new RegisterUserController().handle)
router.post("/session", new ConnectUserController().handle)

export { router } 