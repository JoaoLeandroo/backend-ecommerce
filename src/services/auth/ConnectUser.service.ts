import { prisma } from "../../prisma/prisma";
import { sign } from "jsonwebtoken";
import { z } from "zod";

interface ConnectUserProps {
  email: string;
  password: string;
  idAdmin?: string | any;
}

const AuthUser = z.object({
  email: z.string().email({ message: "Informe um email valido." }),
  password: z
    .string()
    .min(6, { message: "A senha deve conter no minímo 6 caracteres." }),
});

class ConnectUserService {
  async execute({ email, password, idAdmin }: ConnectUserProps) {
    const parseResult = AuthUser.safeParse({ email, password });
    if (!parseResult.success) {
      return {
        Error: parseResult.error.flatten().fieldErrors,
      };
    }

    const emailLowerCase = email.toLowerCase();

    const userAlreadyExist = await prisma.usuario.findFirst({
      where: { email: emailLowerCase },
    });

    if (!userAlreadyExist) {
      return {
        Error: { message: "Usuario ou senha inválido." },
      };
    }

    if (userAlreadyExist.password != password) {
      return {
        Error: { message: "Usuario ou senha inválido." },
      };
    }

    // const userAdmin = await prisma.admin.findFirst({
    //   where: { nameId: idAdmin },
    // });

    // if (userAdmin) {
    //   const token = sign(
    //     {
    //       id: userAlreadyExist.id,
    //       name: userAlreadyExist.name,
    //     },
    //     process.env.JWT_SECRET,
    //     {
    //       subject: userAlreadyExist.id,
    //       expiresIn: "30d",
    //     }
    //   );
    //   return {
    //     id: userAlreadyExist.id,
    //     name: userAlreadyExist.name,
    //     email: userAlreadyExist.email,
    //     token,
    //   };
    // }

    return {
      id: userAlreadyExist.id,
      name: userAlreadyExist.name,
      email: userAlreadyExist.email,
    };
  }
}

export { ConnectUserService };
