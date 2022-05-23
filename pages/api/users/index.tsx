import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log: ["query"]});
    
    
    try {
        const {users: userData} = req.body
        const user = await prisma.users.findMany({});
    
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await prisma.$disconnect();
    }
}