import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Users from './Components/UsersTableComponents/Users'
import Categories from './src/display_components/Categories'
import InputExpense from './src/display_components/InputExpense'
import App from './App'
import Link from 'next/link'


export default function Home() {
  return (
    <div className={styles.container}>
        <ul>
          <li>
            <Link href = '/App'>
              <a>App</a>
            </Link>
          </li>
          <li>
            <Link href='/RecentExpensesPage' >
              <a>View Recent Expenses</a>
            </Link>
          </li>
          <li>
            <Link href='/SetuTransactions' >
              <a>View Bank Statement</a>
            </Link>
          </li>
        </ul>
    </div>
  )
}
