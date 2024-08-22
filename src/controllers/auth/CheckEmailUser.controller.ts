import { Request, Response } from "express";
import { CheckEmailUserService } from "../../services/auth/CheckEmailUser.service";

class CheckEmailUserController {
    async handle(request: Request, response: Response) {
        const { email } = request.body

        const checkEmailUserService = new CheckEmailUserService()
    
        const checkEmail = await checkEmailUserService.execute({
            email: email
        })

        return response.json(checkEmail)
    }
}

export { CheckEmailUserController }