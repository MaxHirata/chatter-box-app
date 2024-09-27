import { AppBar, Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/chatContext";

const ChatWindow = () => {

    const {
        currentUser,
        currentChat,
        userHash,
        chatHash,
        handleSendMessage
    } = useContext(ChatContext);

    // console.log({currentUser});
    // console.log({currentChat});
    // console.log({chatHash});
    const [currentChatLogs, setCurrentChatLogs] = useState(chatHash[currentChat]);
    const [messageText, setMessageText] = useState('');

    console.log({currentChatLogs});

    const sendMessage = () => {
        handleSendMessage(currentUser, currentChat, messageText);
        setMessageText('');    
    }

    useEffect(() => {

    }, [])

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
                {currentChatLogs.chatLogs.map( (chatLog, index) => {
                    const sender = chatLog.senderName;
                    const message = chatLog.message;
                    const timeStamp = chatLog.timeStamp;
                    return (
                        <Box
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
            
            <AppBar/>
        </Box>
    );
}

export default ChatWindow;