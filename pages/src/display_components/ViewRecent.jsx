import React, { useEffect, useState } from 'react'
//import LocalAverage from './LocalAverage'
import LocalAverage from '../../../components_with_arguments/LocalAverage'
//import ListExpenses from './ListExpenses'
import ListExpenses from '../../../components_with_arguments/ListExpenses'
import BackendExpenseData from '../../../data/BackendExpenseData'
import { DeleteExpenseInBackendFromAPI } from '../../../api_call/DeleteExpenseInBackendFromAPI'
//import CategoriesData from './CategoriesData'
import BackendCategories from '../../../data/BackendCategories'
//import { get } from 'http'
//import Card from '../shared/Card'


function ViewRecent() {
    
    const [backendExpenseData, setBackendExpenseData] = useState([]) 
    const [backendCategories, getBackendCategories] = useState([]);
    
    const handleBackendDelete = (expense_id) => {
        DeleteExpenseInBackendFromAPI(expense_id) //bit slow
        //console.log('Backend Expenses After Deletion', backendExpenseData)
    }
    
    //should cause problems, as it is not a pure function
    //but lets see
    useEffect(() => {
        BackendCategories(getBackendCategories)
        //BackendExpenseData(setBackendExpenseData)
        //console.log('Expense Data in View Expenses: ', backendExpenseData)
        //CategoriesData(getBackendCategories)
    }, [])

    useEffect((expense_data) => {
        console.log('Updated Expense Data in View Expenses: ', backendExpenseData)
        BackendExpenseData(setBackendExpenseData) //this will go to infinite
        }, [backendExpenseData])

    
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