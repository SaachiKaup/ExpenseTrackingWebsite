import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log: ["query"]});
    
    
    try {
        const {users: userData} = req.body
        const user = await prisma.users.create({
        data: {
            user_id: userData.user_id,
            first_name: userData.first_name,
            last_name: userData.last_name,
            age: userData.age
        },
        });
    
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await prisma.$disconnect();
    }
}