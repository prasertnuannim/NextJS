
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  
) {
  
  if (req.method === "GET") {
    
  } else if (req.method === "PUT") {
   
  } else if (req.method === "DELETE") {
  
}else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
