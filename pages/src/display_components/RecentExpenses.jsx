import {useState, useEffect} from 'react'
import {FaTimes} from 'react-icons/fa'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  styled,
  tableCellClasses
} from "@mui/material";
import CategoriesData from './CategoriesData'
import BackendCategories from '../data/BackendCategories';
//import {TableRow, TableCell} from '@material-ui/core'
//import Card from '../shared/Card'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.purple,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: theme.palette.common.purple,
    color: theme.palette.common.white,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    //backgroundColor: theme.palette.action.hover,
    backgroundColor: theme.palette.common.purple,
    color: theme.palette.common.white
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function RecentExpenses({expense, backendCategories, handleDelete}) {

    const required_expense_date = (new Date(expense.expense_date)).toLocaleString().slice(0, 9) || 'null'
    /*const [backendCategories, getBackendCategories] = useState([]);
    useEffect(() => {
        BackendCategories(getBackendCategories)
        //CategoriesData(getBackendCategories)
        //console.log('backend categories: ', backendCategories)
    }, [])*/
    //works: console.log('recent expenses categories: ', backendCategories)
    return (
        <TableRow
              key={expense.expense_id}
              //sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell align="left">
                {required_expense_date}
              </StyledTableCell>
              <StyledTableCell align="center">{expense.daily_amt}</StyledTableCell>
              <StyledTableCell align="center">
                {/*console.log('backendCategories: ', backendCategories)*/}
                {backendCategories[expense.cat_id - 1]}
                </StyledTableCell>
              <TableCell align="center">{
                <button 
                  className='close' 
                  onClick={() => handleDelete(expense.expense_id)}>
                      <FaTimes color='white'>
                          </FaTimes>
                </button>
              }</TableCell>
        </TableRow>
    )
    
}

export default RecentExpenses

/* Original Rendering Code
/*return (
        <div className='container'>
            <div className='text-display-central-text'>
                {required_expense_date}
            </div>
            <div className="text-display">{expense.daily_amt}
                <Chip 
                    className='centre-align'
                    label = {expense.cat_id}
                    color = "primary">
                </Chip>
            </div>
            <button 
                className='close' 
                onClick={() => handleDelete(expense.expense_id)}>
                    <FaTimes color='white'>
                        </FaTimes>
            </button>
        </div>
    )*/
