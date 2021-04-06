import React from 'react'
import styled from "styled-components"
import { Avatar } from "@material-ui/core";

function Chat ({ id, users }) {
    return (
        <Container>
            <UserAvatar />
            <p>Reciepient email</p>
        </Container>
    )
}

export default Chat

const Container = styled.div`
display: flex;
align-items: center;
cursor: pointer;
padding: 15px;
word-break: break-word;

:hover{
    background-color: lightgrey;
}
`;

const UserAvatar = styled(Avatar)`
margin: 5px;
margin-right: 15px;
`;