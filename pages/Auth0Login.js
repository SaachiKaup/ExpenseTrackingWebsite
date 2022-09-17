import React, {useState} from 'react';
import Login from "./LoginReg/Login";
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import CustomCard from './src/shared/Card'
import {Button, Card} from '@mui/material';
import { styled } from '@mui/material';
import Header from './src/display_components/Header';

const BootstrapButton = styled(Button)({
  backgroundColor: '#0063cc',
  textColor: '#000000',
  borderColor: '#0063cc',
})

function Auth0Login() {
    return (
        <div className={styles.container}>
            <CustomCard>
                <div className={styles.title}>
                <Header text = "Expense Tracker App"/>
                </div>
                <div className={styles.grid} >
                <Card>
                {/* <div  className={styles.grid}> */}
                    <BootstrapButton variant="contained"> 
                    <Link href = "/api/auth/login">Log In</Link>
                    </BootstrapButton>
                {/* </div> */}
                </Card>
                </div>
            </CustomCard>
        </div>
    )
}

export default Auth0Login