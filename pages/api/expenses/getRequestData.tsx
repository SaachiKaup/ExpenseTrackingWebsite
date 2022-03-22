import { NextApiRequest } from "next";

export function getRequestData(req: NextApiRequest) {
    const req_expense_id = Number(req.query.expense_id) || undefined;
    const req_user_id = Number(req.query.user_id) || undefined;
    const req_cat_id = Number(req.query.cat_id) || undefined;
    const req_date = new Date(String(req.query.expense_date)) || undefined;
    return { req_expense_id, req_user_id, req_cat_id, req_date };
}
