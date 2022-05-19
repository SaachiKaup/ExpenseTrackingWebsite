import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log: ["query"]});
    const req_cat_id = Number(req.query.cat_id) || undefined;
    
    try {
        const {categories: categoryData} = req.body
        const category = await prisma.categories.findMany({
            where: {
                cat_id: req_cat_id
            }
        });
        
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await prisma.$disconnect();
    }
}