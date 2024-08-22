import { Request, Response, Router } from "express";

const router = Router()

router.get("/", (request: Request, response: Response) => {
    return response.send("E-Commerce backend")
})

export { router } 