import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Categories from './src/display_components/Categories'
import InputExpense from './src/display_components/InputExpense'
import App from './App'
import Link from 'next/link'
import Card from './src/shared/Card'
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

function Menu() {
  return (
    <div className={styles.container}>
      <Card>
        <ul>
          <li>
            <Link href = '/App'>
              <a>Add Expenses</a>
            </Link>
          </li>
          <li>
            <Link href='/RecentExpensesPage' >
              <a>View Recent Expenses</a>
            </Link>
          </li>
          <li>
            <Link href='/TransactionsPage' >
              <a>View Bank Statement</a>
            </Link>
          </li>
          <li>
            <Link href='/api/auth/logout' >
              <a>Logout</a>
            </Link>
          </li>

        </ul>
      </Card>
    </div>
  )
}

export default withPageAuthRequired(Menu);
// export const getServerSideProps = withPageAuthRequired();