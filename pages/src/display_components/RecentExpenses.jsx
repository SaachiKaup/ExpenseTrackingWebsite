import {useState} from 'react'
import Card from '../shared/Card'
import {FaTimes} from 'react-icons/fa'
import {Chip} from '@mui/material'

function RecentExpenses({expense, handle_delete}) {
    return (
        <Card>
            <div className="text-display-central-text">{expense.amount}
                <button className='close' onClick={() => handle_delete(expense.id)}><FaTimes color='purple'></FaTimes></button>
                <Chip className='centre-align' label = {expense.category}></Chip>
                
            </div>
        </Card>
    )
}

export default RecentExpenses