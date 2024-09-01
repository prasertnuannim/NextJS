import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  // request: NextRequest
) {
  if (req.method === "GET") {
    const { search, role, sort } = req.query;

    let queryOptions: any = {
      orderBy: {
        createdAt: sort as "asc" | "desc",
      },
    };

    if (role || search) {
      queryOptions.where = {
        ...(role && { role : { name: { equals: String(role) } } }),
        OR: search
          ? [
              {
                name: {
                  contains: String(search),
                  mode: "insensitive",
                },
              },
              {
                email: {
                  contains: String(search),
                  mode: "insensitive",
                },
              },
            ]
          : undefined,
      };
    }

    try {
      const users = await prisma.users.findMany({...queryOptions, include: {role: true}});

      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching users" });
    }
  } else if (req.method === "POST") {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.users.create({
        data: { name, email, password: hashedPassword },
      });
      return res.status(200).json(newUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error creating user" });
    }
  }
}
