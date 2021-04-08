// import { styled } from "@material-ui/core"
import { Avatar, IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from "@material-ui/icons/AttachFile"
import { useCollection } from 'react-firebase-hooks/firestore';
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import MicIcon from "@material-ui/icons/Mic"

import React, { useState } from 'react';
import Message from "./Message";
import getRecipientEmail from "../utils/getRecipientEmail";




function ChatScreen({ chat, messages }) {
    const [user] = useAuthState(auth);
    const [input, setInput] = useState("")
    const router = useRouter();
    const [messagesSnapshot] = useCollection(
        db.collection('chats')
            .doc(router.query.id)
            .collection("messages")
            .orderBy("timestamp", "asc"))

    const [recipientSnapshot] = useCollection(
        db.collection("users").where("email", "==", getRecipientEmail(chat.users, user))
    )


    const showMessages = () => {
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map((message) => (
                <Message key={message.id}
                    user={message.data().user}
                    message={{
                        ...message.data(),
                        timeStamp: message.data().timeStamp?.toDate().getTime(),
                    }}
                />
            ))
        } else {
            return JSON.parse(messages).map((message) => (
                <Message key={message.id} user={message.user} message={message} />
            ))

        }

    }


    const sendMessage = (e) => {
        e.preventDefault();

        //update last seen
        db.collection("users").doc(user.uid).set(
            {
                lastSeen: firebase.firestore.FieldValue.serverTimestamp(),


            }, { merge: true }
        );

        db.collection('chats').doc(router.query.id).collection('messages').add({
            timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL
        })

        setInput('');
    };

    const recipient = recipientSnapshot?.docs?.[0].data();
    const recipientEmail = getRecipientEmail(chat.users, user)

    return (
        <Container>
            <Header>

                {recipient ? (
                    <Avatar src={recipient?.photoURL} />
                ) : (
                    <Avatar src={recipientEmail[0]} />
                )

                }
                <Avatar />
                <HeaderInformation>
                    <h3>{recipientEmail}</h3>
                    {recipientSnapshot ? (
                        <p>Last active:{''}
                            {recipient?.lastSeen?.toDate() ? (
                                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                            ) : "Unavailable"}
                        </p>

                    ) : (
                        <p>Loading last active ...</p>
                    )}
                </HeaderInformation>
                <HeaderIcons>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </HeaderIcons>
            </Header>

            <MessageContainer>
                {showMessages()}
                <EndOfMessage />
            </MessageContainer>

            <InputContainer>
                <InsertEmoticonIcon />
                <Input value={input} onChange={(e) => setInput(e.target.value)} />
                <button hidden disabled={!input} type="submit" onClick={sendMessage}>Send message</button>
                <MicIcon />
            </InputContainer>
        </Container>
    )
}

export default ChatScreen

const Container = styled.div``;

const Input = styled.div`
flex: 1;
align-items: center;
padding: 10px;
position: sticky;
bottom: 0;
background-color: whitesmoke;
`;

const InputContainer = styled.form`
display: flex;
align-items: center;
padding: 10px;
z-index: 100;
position: sticky;
bottom: 0;
background-color: white;
`;

const Header = styled.div`
position: sticky;
background-color: white;
z-index: 100;
top:0;
display: flex;
padding:11px;
height:80px;
align-items: center;
border-bottom: 1px solid lightgrey;

`;

const HeaderInformation = styled.div`
margin-left: 15px;
flex:1;

>h3{
    margin-bottom: 3px;
}
>p{
    font-size: 14px;
    color: green;
}
`;

const HeaderIcons = styled.div`

`;

const EndOfMessage = styled.div``;

const MessageContainer = styled.div`
padding: 30px;
background-color: whitesmoke;
min-height: 90vh;
`;