import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import CurrentUserIDContext from "../../../context/CurrentUserIDContext";

export default async function create_users(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log: ["query"]});
    //console.log("Current user to add: " + CurrentUserIDContext);
    const num_current_users = await prisma.users.count();
    try {
        const {users: userData} = req.body
        const user = await prisma.users.create({
            data: {
                user_id: num_current_users + 1,
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

