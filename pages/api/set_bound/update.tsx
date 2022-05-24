import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function update_bound(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log: ["query"]});
    console.log(req.query, req.body)
    const req_user_id = Number(req.query.user_id) || undefined;
    const req_cat_id = Number(req.query.cat_id) || undefined;
    const req_upper_bound = Number(req.body.upper_bound) || undefined;
    console.log(req_cat_id)
    
    try {
        const {set_bound: setBoundData} = req.body
        
        const set_bound = await prisma.set_bound.updateMany({
        where: {
            user_id: req_user_id,
            cat_id: req_cat_id
        },
        data: {
            upper_bound: req_upper_bound
        }
        });
    
        res.status(201).json(set_bound);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await prisma.$disconnect();
    }
}