
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  
) {
  
  if (req.method === "GET") {
    
  } else if (req.method === "POST") {
    try {
     const { name } = req.body;
      const role = await prisma.roles.create({
        data: { name },
      });
      return res.status(200).json(role);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error creating role" });
    }
   
  } else if (req.method === "DELETE") {
  
}else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
