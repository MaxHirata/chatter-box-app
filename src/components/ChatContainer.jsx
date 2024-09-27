import React, { useContext } from 'react'
import { ChatContext } from '../context/chatContext';
import EmptyUserState from './EmptyUserState';
import ChatView from './ChatView';
import { Box } from '@mui/material';

function ChatContainer() {
    const {
        userHash,
        handleCreateUser,
        handleDeleteUser
    } = useContext(ChatContext);

    const numUsers = Object.keys(userHash).length;

    return (
        <Box 
            sx={{ 
                width: '100%', 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center' 
            }}
        >
            {numUsers < 1 ? <EmptyUserState/> : <ChatView/>}
        </Box>
    );
};

export default ChatContainer;
