<<<<<<< HEAD
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getRequestData } from "./getRequestData";



export default async function (req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log: ["query"]});
    console.log('u_id before parse', req.query.user_id)
    const { req_expense_id, req_user_id, req_cat_id, req_date } = getRequestData(req);
    console.log('ex_date', req.query.expense_date)
    try {
        const {expenses: expenseData} = req.body
        console.log('exp user id', req.body.user_id, req.body.expense_id)
        const expense = await prisma.expenses.findMany({
            where: 
            {
                expense_id: req_expense_id,
                user_id: req_user_id,
                cat_id: req_cat_id,
                //expense_date: req_date || null
            }

        });
    
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await prisma.$disconnect();
    }
}


=======
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getRequestData } from "./getRequestData";



export default async function (req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient({log: ["query"]});
    console.log('u_id before parse', req.query.user_id)
    const { req_expense_id, req_user_id, req_cat_id, req_date } = getRequestData(req);
    console.log('ex_date', req.query.expense_date)
    try {
        const {expenses: expenseData} = req.body
        console.log('exp user id', req.body.user_id, req.body.expense_id)
        const expense = await prisma.expenses.findMany({
            where: 
            {
                expense_id: req_expense_id,
                user_id: req_user_id,
                cat_id: req_cat_id,
                //expense_date: req_date || null
            }

        });
    
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await prisma.$disconnect();
    }
}


>>>>>>> acad32be1002b2b872ffdccd649db4c868b50623
