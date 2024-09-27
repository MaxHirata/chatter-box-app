import { Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/chatContext";

const ChatWindow = () => {

    const {
        currentUser,
        currentChat,
        chatHash,
        handleSendMessage
    } = useContext(ChatContext);

    const [currentChatLogs, setCurrentChatLogs] = useState(chatHash[currentChat] ?? []);
    const [messageText, setMessageText] = useState('');

    useEffect(() => {
        setCurrentChatLogs(chatHash[currentChat])
    }, [currentChat, chatHash])

    const sendMessage = () => {
        if(messageText) {
            handleSendMessage(currentUser, currentChat, messageText);
            setMessageText('');
        }
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
                    border: '3px solid #4287f5',
                    borderRadius: '16px'
                }}
            >
                <Box 
                    sx={{ 
                        fontSize: 18, 
                        fontWeight: 600, 
                        textDecoration: 'underline',
                        marginBottom: '8px',
                    }} 
                >
                    {currentChatLogs.name}
                </Box>
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
        </Box>
    );
}

export default ChatWindow;