import React, {useState} from 'react';
import Login from "./LoginReg/Login";
import Link from 'next/link';

function Auth0Login() {
    return (
        <>
        <Link href = "https://expense-tracking-website-git-master-saachikaup.vercel.app/api/auth/login">Log In </Link>
        </>
    )
}

export default Auth0Login