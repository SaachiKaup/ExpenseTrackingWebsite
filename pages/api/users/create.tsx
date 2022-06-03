import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function create_users(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log: ["query"]});
    
    
    try {
        const {users: userData} = req.body
        const user = await prisma.users.create({
        data: {
            user_id: userData.user_id,
            name: userData.name,
            email: userData.email,
            mobile_number: userData.mobile_number,
        },
        });
    
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await prisma.$disconnect();
    }
}