import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Categories from './src/display_components/Categories'
import InputExpense from './src/display_components/InputExpense'
import App from './App'
import Link from 'next/link'
import Card from './src/shared/Card'


export default function Home() {
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
            <Link href='/InputNumberForTransactions' >
              <a>View Bank Statement</a>
            </Link>
          </li>
        </ul>
      </Card>
    </div>
  )
}
