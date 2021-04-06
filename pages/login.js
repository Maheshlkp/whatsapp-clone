import React from 'react'
import styled from "styled-components";
import Head from "next/head"
import { Button } from "@material-ui/core"
import { auth, provider } from '../firebase';

function Login () {
    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert)
    }
    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>

            <LoginContainer>
                <Logo src="https://logos-world.net/wp-content/uploads/2020/05/WhatsApp-Logo.png" />
                <Button onClick={signIn} variant="outlined">Sign In with Google</Button>
            </LoginContainer>

        </Container>
    )
}

export default Login

const Container = styled.div`
display: grid;
place-items: center;
height: 100vh;
background-color: whitesmoke;
`;

const LoginContainer = styled.div`
padding: 100px;
display: flex;
flex-direction: column;
align-items: center;
background-color: white;
border-radius:5px;
box-shadow: 0px 4px 14px -3px grey;
`;

const Logo = styled.img`
height:100px;
width: 100px;
margin-bottom: 50px;
`;
