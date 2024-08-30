
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  
) {
  
  if (req.method === "GET") {

    try {
      const { id } = req.query;
      const user = await prisma.users.findUnique({
        where: { id: Number(id) },
      });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching user" });
    }
  } else if (req.method === "PUT") {
    try {
      const { id } = req.query;
      const { name, email, password, roleId } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const updateUser = await prisma.users.update({
        where: { id: Number(id) },
        data: { name, email, password: hashedPassword, roleId: Number(roleId) },
      });
      return res.status(200).json(updateUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error updating user" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      const deleteUser = await prisma.users.delete({
        where: { id: Number(id) },
      });
      return res.status(200).json(deleteUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error deleting user" });
    }
  }
  return res.status(405).json({ error: "Method not allowed" });
}
