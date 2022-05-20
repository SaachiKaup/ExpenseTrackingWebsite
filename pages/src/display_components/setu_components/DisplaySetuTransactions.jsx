import {React, useState, useEffect, useContext} from 'react'
import GetCurrentCategory from '../GetCurrentCategory'
import {Menu, MenuItem, Fade, Button, Typography, Checkbox} from "@mui/material";
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
import GetSelectedTransactions from '../GetSelectedTransactions';
//Not used import CustomButton from '../../shared/Button'

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

function DisplaySetuTransactions({transaction}) {
    const [backend_categories, setBackendCategories] = useState([]);
    const [category, setCategory] = useState("Categories");
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [checked, setChecked] = useState(false);
    const [transactionDate, setTransactionDate] = useState('');
    const currentTransactions = useContext(GetSelectedTransactions);

    console.log("Current Transactions: ", currentTransactions);
    
    useEffect(() => {
        getCategoriesFromState();
    }, []);

    const getCategoriesFromState = () => {
      const axios = require('axios');
      const base_url = 'http://localhost:3000'
      let backend_categories = [];
      axios.get('http://localhost:3000/api/categories').then(
            res => {
              res.data.forEach(category => {
                  backend_categories.push(category.cat_name)
                  //console.log("Backend Categories:", backend_categories)
              });
              setBackendCategories(backend_categories);
            }).catch(err => {
              console.log(err);
            })
    }

    const handleClick = (event) => {
      console.log('Button Clicked', event.target.innerText);
      console.log("Transaction amt in handleClick: ", transaction.amount);
      currentTransactions.selectedTransactions = 
      currentTransactions.selectedTransactions.filter(selected_transaction =>
        selected_transaction[0] != parseInt(transaction.amount))
      console.log("Current Transactions: ", currentTransactions.selectedTransactions);
      setCategory(event.target.innerText);
      setAnchorEl(event.target); //Used to be currentTarget
      //setTransactionDate(transaction.transactionTimestamp);
      //console.log("Transactions Date: ", transaction.transactionTimestamp, "Typeof str: ", typeof transaction.transactionTimestamp);
      setChecked(true)
    };

    const handleClose = (e) => {
      console.log('on closing', typeof e.target.innerText );
      if (e.target.innerText === '') {
        console.log('closed to soon:', category)
        
        currentTransactions.selectedTransactions = currentTransactions.selectedTransactions
        .filter(api_transaction => 
          (api_transaction[0] !== parseInt(transaction.amount) && api_transaction[1] !== category))
        setCategory("Categories");
        setChecked(false)
          /*{
          console.log("API Transaction: ", api_transaction);
          if (api_transaction[0] !== transaction.amount) {
            return api_transaction
          }
          else {
            console.log("Transaction Found: ", api_transaction);
            return null
          }
          return api_transaction[0] != transaction.amount
        }*/
        console.log("Filtered transactions: ", currentTransactions.selectedTransactions);
      }

      else {
        let selected_category = e.target.innerText
        setCategory(selected_category);
        console.log("Transaction to be logged:\nexpense: ", transaction.amount)
        console.log("Date of transactions: ", transaction.transactionTimestamp)
        console.log("Category: ", selected_category)
        console.log("All Categories: ", backend_categories)
        currentTransactions.selectedTransactions = [...currentTransactions.selectedTransactions, [parseInt(transaction.amount), selected_category, transaction.transactionTimestamp]]
        console.log("All current transactions: ", currentTransactions.selectedTransactions)
        
        //Will employ while sending categories to backend
        //current_category_context.category = e.target.innerText
        //console.log('cat context: ', current_category_context)

      }
      setAnchorEl(null)
    };
    //console.log('transaction Data: ', transaction)

    const handleChecked = (e) => {
      console.log('checked', e)
      
    }
    
    return (
      <>
      {/*console.log("In Display Transactions\nAnchor: ", anchorEl)*/}
      
        <TableRow>
            <StyledTableCell align="left">
                {transaction.amount}
            </StyledTableCell>
            <StyledTableCell align="left">
                {transaction.transactionTimestamp.slice(0, 10)}
            </StyledTableCell>
            <StyledTableCell align="left">
                {transaction.narration}
            </StyledTableCell>
            <StyledTableCell align="left">
                {transaction.type}
            </StyledTableCell>
        
            <StyledTableCell align="left">
              <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                {/*console.log("Anchor Elem:", anchorEl, "for transaction:", transaction.amount)*/}
                {backend_categories.map((category, index) => (
                  <MenuItem key = {index} onClick={handleClose}>{category}</MenuItem>
                ))}
                
              </Menu>
              <Button onClick = {handleClick}>
                  {category}
              </Button>
            </StyledTableCell>
            <StyledTableCell align='left'>
              <Checkbox checked = {checked} onChange={handleChecked}/>
            </StyledTableCell>
        </TableRow>
        </>
    )
}

export default DisplaySetuTransactions

/* Render Menu Items, might use Later
const renderMenuItems = () => {
      return backend_categories.map((category, index) => {
        <MenuItem key={index} onClick={handleClose}>{category}</MenuItem>
      })
    }
*/
/* 
{/*console.log("backend categories: ", backend_categories)}
                /*<MenuItem onClick={handleClose}>
                  {console.log("In Menu ITEM: ", this)}
                  Rendered
            </MenuItem>  
*/

/*Old Button Code
            {<StyledTableCell align="left">
              <Button
                id="fade-button"
                variant = "outlined"
                className="text-input"
                //aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                text={category}
                size = 'small'
                sx={{
                  width: 150,
                  height: 50,
                  marginLeft: 0,
                }}
              >
                {category}
              </Button> 
              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button"
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}>
                  {backend_categories.map(category => (
                    renderMenuItems(category)
                  ))}
                {backend_categories.map(category => (
                  <MenuItem onClick={handleClose}>{"HELLO"}</MenuItem>
                ))}
                <MenuItem onClick={handleClose}>HI</MenuItem>
              </Menu>
                </StyledTableCell> }*/