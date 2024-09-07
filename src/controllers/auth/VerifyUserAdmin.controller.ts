import { Request, Response } from "express";
import { VerifyUserAdminService } from "../../services/auth/VerifyUserAdmin.service";

class VerifyUserAdminController {
    async handle(request: Request, response: Response) {
        const { id } = request.body
        const verifyUserAdminService = new VerifyUserAdminService()

        const verifyUser = await verifyUserAdminService.execute({
            id
        })

        return response.json(verifyUser)
    }
}

export { VerifyUserAdminController }