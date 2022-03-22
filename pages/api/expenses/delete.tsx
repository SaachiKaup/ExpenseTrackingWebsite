import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getRequestData } from "./getRequestData";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log: ["query"]});
    const { req_expense_id, req_user_id, req_cat_id, req_date } = getRequestData(req);
    
    try {
        const {expenses: expenseData} = req.body
        
        const expense = await prisma.expenses.deleteMany({
        where: {
            expense_id: req_expense_id,
            user_id: req_user_id,
            cat_id: req_cat_id,
            //expense_date: req_date not working
        },
        });
    
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await prisma.$disconnect();
    }
}