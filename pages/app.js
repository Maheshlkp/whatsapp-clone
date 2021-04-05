import React from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase"
import Login from "./login"

function app ({ component, pageProps }) {
    const [user] = useAuthState(auth);

    if (!user) return <Login />;

    return <Component {...pageProps} />;
}

export default app
