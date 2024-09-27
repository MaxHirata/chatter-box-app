import React, { useContext } from 'react'
import { ChatContext } from '../context/chatContext';
import EmptyUserState from './EmptyUserState';
import ChatView from './ChatView';

function ChatContainer() {
    const {
        userHash,
        handleCreateUser,
        handleDeleteUser
    } = useContext(ChatContext);

    const numUsers = Object.keys(userHash).length;

    return (
        <>
            {numUsers < 1 ? <EmptyUserState/> : <ChatView/>}
        </>
    );
};

export default ChatContainer;
