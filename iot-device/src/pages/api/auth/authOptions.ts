// authOptions.ts
//import { PrismaAdapter } from '@auth/prisma-adapter';
//import  prisma  from '@/lib/prisma';
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";

import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
//import prisma  from "@/lib/prisma"
const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials) return null;
        const user = await prisma.users.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password as string))
        ) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.roleId,
          };
        } else {
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role as string;
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.roleId as string;
      }
      return session;
    },
  },
};
