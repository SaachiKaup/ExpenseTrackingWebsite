import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
let current_user_id = 15;

export default async function create_users(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log: ["query"]});
    console.log("Current user_ID: " + current_user_id);
    try {
        const {users: userData} = req.body
        const user = await prisma.users.create({
            data: {
                user_id: current_user_id,
                name: userData.name,
                email: userData.email,
                mobile_number: userData.mobile_number,
            },
        });
    
        res.status(201).json(user);
        current_user_id++;
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await prisma.$disconnect();
    }
}

