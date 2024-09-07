import { prisma } from "../../prisma/prisma";
import { z } from "zod"

interface VerifyUserAdminProps {
    id: string;
}

const verifyUserZod = z.object({
    id: z.string({message: "O id do usuario, precisa ser do tipo string."})
})


class VerifyUserAdminService {
    async execute({ id }: VerifyUserAdminProps) {

        const parseResult = verifyUserZod.safeParse({ id });
        if (!parseResult.success) {
          return {
            Error: parseResult.error.flatten().fieldErrors,
          };
        }

        const verifyUser = await prisma.admin.findFirst({
            where: {userId: id}
        })

        if(!verifyUser) {
            return {
                Error: { message: "O usuario não possui credênciais de admin." }
            }
        }

        return {
            userId: verifyUser.userId,
            message: "Usuario autorizado."
        }
    }
}

export { VerifyUserAdminService }