import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getRequestData } from "./getRequestData";

export default async function delete_expense(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log: ["query"]});
    //const { req_expense_id, req_user_id, req_cat_id, req_date } = getRequestData(req);
    const req_expense_id = Number(req.body.expense_id) || undefined;

    try {
        
        console.log('expenseData in delete: ', req_expense_id)
        
        const expense = await prisma.expenses.delete({
        where: {
            expense_id: req_expense_id
            //user_id: req_user_id, Kept Here but not required
            //cat_id: req_cat_id,
        },
        });
    
        res.status(204).json(expense);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message });
    } finally {
        await prisma.$disconnect();
    }
}