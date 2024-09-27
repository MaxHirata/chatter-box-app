import { AppBar, Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/chatContext";
import { Add } from "@mui/icons-material";
import CreateChatDialog from "./CreateChatDialog";

const ChatWindow = () => {

    const {
        currentUser,
        currentChat,
        userHash,
        chatHash,
        handleSelectCurrentChat,
        handleSendMessage
    } = useContext(ChatContext);

    const [currentChatLogs, setCurrentChatLogs] = useState(chatHash[currentChat] ?? []);
    const [messageText, setMessageText] = useState('')
    const [openCreateChatDialog, setOpenCreateChatDialog] = useState(false);

    useEffect(() => {
        setCurrentChatLogs(chatHash[currentChat])
    }, [currentChat, chatHash])

    const currUser = userHash[currentUser];

    const sendMessage = () => {
        handleSendMessage(currentUser, currentChat, messageText);
        setMessageText('');    
    }

    return (
        <Box 
            sx={{ 
                width: '70%', 
                height: 'inherit' 
            }}
        > 
            <Box 
                id="chat-view"
                sx={{
                    padding: 2,
                    height: '75%',
                    border: '3px solid white',
                    overflowY: 'auto',
                    overflowX: 'scroll'
                }}
            >
                {currentChatLogs.chatLogs?.map( (chatLog, index) => {
                    const sender = chatLog.senderName;
                    const message = chatLog.message;
                    const timeStamp = chatLog.timeStamp;
                    return (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Box>{sender}:</Box>
                            <Box>"{message}"</Box>
                            <Box>{timeStamp}</Box>
                        </Box>
                    )
                } )}
            </Box>
            <Box>
                <TextField
                    value={messageText}
                    onChange={ e => setMessageText(e.target.value)}
                />
                <Button
                    variant="contained"
                    onClick={() => sendMessage()}
                >Send</Button>
            </Box>
            <Box>
                <Box>
                    {currUser.involvedChats.map((chatId, idx) => {
                    const chat = chatHash[chatId];
                    return(
                            <Box 
                                sx={{
                                    border: '2px solid #515761',
                                    margin: '5px 10px'
                                }}
                                key={idx}
                                onClick={() => handleSelectCurrentChat(chatId)}
                            >
                                {chat.name}
                            </Box>
                        );
                    })}
                </Box>
                <Button
                    onClick={() => setOpenCreateChatDialog(!openCreateChatDialog)}
                    startIcon={<Add/>}
                >
                    Create Chat
                </Button>
                <CreateChatDialog open={openCreateChatDialog} onClose={() => setOpenCreateChatDialog(false)} />
            </Box>
        </Box>
    );
}

export default ChatWindow;