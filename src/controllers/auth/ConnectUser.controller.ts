import { ConnectUserService } from "../../services/auth/ConnectUser.service";
import { Request, Response } from 'express';


class ConnectUserController {
    async handle(request: Request, response: Response) {
        const { email, password, idAdmin } = request.body;
        const connectUserService = new ConnectUserService()

        const auth = await connectUserService.execute({
            email,
            password,
            idAdmin
        })

        return response.json(auth)
    }
}

export { ConnectUserController }