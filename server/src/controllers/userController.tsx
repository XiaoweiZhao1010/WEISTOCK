import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await prisma.users.findMany();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error retrieving users",
    });
  }
}
