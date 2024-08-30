
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  
) {
  
  if (req.method === "GET") {
    
  } else if (req.method === "PUT") {
   try {
      const { id } = req.query;
      const { name } = req.body;
      const role = await prisma.roles.update({
        where: { id: Number(id) },
        data: { name },
      });
      return res.status(200).json(role);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error updating role" });
    } 
  } else if (req.method === "DELETE") {
  try {
    const { id } = req.query;
    const role = await prisma.roles.delete({
      where: { id: Number(id) },
    });
    return res.status(200).json(role);  
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error deleting role" });
  }
}else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
