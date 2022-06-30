import React, {useState} from 'react';
import Login from "./LoginReg/Login";
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import Card from './src/shared/Card';
import Header from './src/display_components/Header';

function Auth0Login() {
    return (
        <div className={styles.container}>
            <Card>
                <div className={styles.title}>
                <Header text = "Expense Tracker App"/>
                </div>
                <div  className={styles.grid}>
                    <Link href = "/api/auth/login"><u>Log In</u></Link>
                </div>
            </Card>
        </div>
    )
}

export default Auth0Login