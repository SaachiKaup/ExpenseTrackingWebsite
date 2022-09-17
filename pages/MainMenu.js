import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Categories from './src/display_components/Categories'
import InputExpense from './src/display_components/InputExpense'
import App from './App'
import Link from 'next/link'
import CustomCard from './src/shared/Card'
import {Card, MenuList, MenuItem} from '@mui/material'
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Header from './src/display_components/Header'

function Menu() {
  return (
    <div className={styles.container}>
      <CustomCard>
        <div className={styles.title}>
        <Header text = "MAIN MENU"/>
        </div>
        <div className={styles.grid}>
          <Card
            sx={{
                bgcolor: 'background.paper',
                boxShadow: 1,
                borderRadius: 2,
                minWidth: 200,
                minHeight: 150,
                textcolor: 'black'
              }}
          >
          <div className={styles.grid}>
          <MenuList>
            <MenuItem>
              <Link href = '/App'>
                <a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  Add Expenses</a>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href='/RecentExpensesPage' >
                <a>View Recent Expenses</a>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href='/TransactionsPage' >
                <a>View Bank Statement</a>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href='/api/auth/logout' >
                <a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  Logout&nbsp;&nbsp;&nbsp;</a>
              </Link>
            </MenuItem>

          </MenuList>
          </div>
        </Card>
      </div>
    </CustomCard>
    </div>
  )
}

export default withPageAuthRequired(Menu);
// export const getServerSideProps = withPageAuthRequired();