import React, { useEffect, useState } from 'react'
import LocalAverage from './LocalAverage'
import ListExpenses from './ListExpenses'
import BackendExpenseData from '../data/BackendExpenseData'
import { DeleteExpenseInBackend } from './DeleteExpenseInBackend'
//import CategoriesData from './CategoriesData'
import BackendCategories from '../data/BackendCategories'
import { get } from 'http'
//import Card from '../shared/Card'


function ViewRecent() {
    
    const [backendExpenseData, setBackendExpenseData] = useState([]) 
    const [backendCategories, getBackendCategories] = useState([]);
    
    const handleBackendDelete = (expense_id) => {
        DeleteExpenseInBackend(expense_id) //bit slow
        //console.log('Backend Expenses After Deletion', backendExpenseData)
    }
    
    useEffect(() => {
        BackendCategories(getBackendCategories)
        BackendExpenseData(setBackendExpenseData)
        //console.log('Expense Data in View Expenses: ', backendExpenseData)
        //CategoriesData(getBackendCategories)
    })
    return ( 
        <div className='recent-expenses-container'> {/* centralalign not working */}
        {/*<Card>here before table length increased*/}
            <LocalAverage expenseData={backendExpenseData} />
            <ListExpenses 
                expenseData = {backendExpenseData} 
                backendCategories = {backendCategories}
                handleDelete = {handleBackendDelete} />
            
        {/*</Card> here*/}
        </div> 
    )
}

export default ViewRecent

/* old delete
//old State: const [expenseData, setExpenseData] = useState(ExpenseData)
    const handleDelete = (expense_id) => {
        if (window.confirm('Delete Confirm?')) {
            //delete from backend ALSO otherwise it just reloads // bit slow
            DeleteExpenseInBackend(expense_id)
            setBackendExpenseData(expenseData.filter((expense) => 
            expense.expense_id != expense_id))
        }
    }*/

/* Old Imports
import Card from '../shared/Card'
import ExpenseData from '../data/ExpenseData'
*/