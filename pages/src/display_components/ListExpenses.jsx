<<<<<<< HEAD
import RecentExpenses from './RecentExpenses'
//import {Paper} from '@material-ui/core'
import { Table, 
        TableHead, 
        TableRow, 
        TableCell, 
        TableBody, 
        styled,
        tableCellClasses } from '@mui/material'

// does not work
//import {Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core'
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.purple,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function ListExpenses({expenseData, backendCategories, handleDelete}) {
    return (
        <div >
           <Table>
               <TableHead >
                    <TableRow >
                        <StyledTableCell align="centre">
                        Expense Date
                        </StyledTableCell>
                        <StyledTableCell align="center">Amount</StyledTableCell>
                        <StyledTableCell align="center">Category</StyledTableCell>
                        <StyledTableCell align="center">X</StyledTableCell>
                    </TableRow>
               </TableHead>
           
        <TableBody>
         
           {    //takes a parameter, returns JSX in round brackets
               expenseData.map((expense) => (
                    <RecentExpenses expense = {expense}
                                    backendCategories = {backendCategories}
                                    handleDelete = {handleDelete}/>
               ))
           }
            
        </TableBody>
        </Table>
       </div>
    )
    
}
=======
import RecentExpenses from './RecentExpenses'

function ListExpenses({expense_data, handle_delete}) {
    return (
       <div className = "expense-list central-text">
           {    //takes a parameter, returns JSX in round brackets
               expense_data.map((expense) => (
                    <RecentExpenses expense = {expense} handle_delete = {handle_delete}/>
               ))
           }
       </div>
    )
    
}
>>>>>>> acad32be1002b2b872ffdccd649db4c868b50623
export default ListExpenses