import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log: ["query"]});
    
    
    try {
        const {expenses: expenseData} = req.body
        console.log('expenseData: ', expenseData) 
        const expense = await prisma.expenses.create({
        data: {
            user_id: expenseData.user_id,
            cat_id: expenseData.cat_id,
            daily_amt: expenseData.daily_amt,
            expense_date:  new Date()
        },
        });
    
        res.status(201).json(expense);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    } finally {
        await prisma.$disconnect();
    }
}