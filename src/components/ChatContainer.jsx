import { Box } from '@mui/material';
import React, { useContext } from 'react'
import { ChatContext } from '../context/chatContext';
import EmptyUserState from './EmptyUserState';

function ChatContainer() {
    const {
        userHash,
        handleCreateUser,
        handleDeleteUser
    } = useContext(ChatContext);

    const numUsers = Object.keys(userHash).length;

    return (
        <>
            {numUsers < 1 ? <EmptyUserState/> : <Box>Hello WOrld!!!</Box>}
        </>
    );
};

export default ChatContainer;
