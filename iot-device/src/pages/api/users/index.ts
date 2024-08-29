import { NextApiRequest, NextApiResponse } from "next";
import { type NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  request: NextRequest
) {
  if (req.method === "GET") {
    // const searchParams = request.nextUrl.searchParams;
    // const search = searchParams.get("search") || "";
    // const role = searchParams.get("role");
    // const sort = searchParams.get("sort") || 'desc';

    console.log(request)
    try {
      const users = await prisma.users.findMany();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching users" });
    }
  } else if (req.method === "POST") {
    try {
      const { name, email, password, role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.users.create({
        data: { name, email, password: hashedPassword, role },
      });
      return res.status(200).json(newUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error creating user" });
    }
  }
}
