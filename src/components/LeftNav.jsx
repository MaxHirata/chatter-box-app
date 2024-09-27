import { Box, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/chatContext";
import CreateChatDialog from "./CreateChatDialog";
import { Add } from "@mui/icons-material";

const LeftNav = () => {

    const { 
        currentUser,
        currentChat,
        userHash,
        chatHash,
        handleSelectCurrentChat,
    } = useContext(ChatContext);

    const [currentChatLogs, setCurrentChatLogs] = useState(chatHash[currentChat] ?? []);
    const [openCreateChatDialog, setOpenCreateChatDialog] = useState(false);

    useEffect(() => {
        setCurrentChatLogs(chatHash[currentChat])
    }, [currentChat, chatHash])

    const userIds = Object.keys(userHash);
    const currUser = userHash[currentUser];

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '30%',
                border: '5px solid #5c6169',
                background: '#5c6169',
                color: 'white'
            }}
        >
            <Box>
                <Box sx={{ fontWeight: 600, marginTop: 2, marginBottom: 2 }}>User List</Box>
                { userIds.map((userId) => {
                    const user = userHash[userId];
                    return (
                        <Box
                            key={userId}
                            sx={{
                                border: '3px solid red',
                                borderRadius: '12px',
                                padding: 1,
                                margin: '8px 4px'
                            }}
                        >{user.name}</Box>
                    )
                })}
            </Box>
            <Box sx={{ height: '50%' }}>
                <Box sx={{ fontWeight: 600, marginTop: 2, marginBottom: 2 }}>Chat List</Box>

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

                <Box>
                    <Button
                        onClick={() => setOpenCreateChatDialog(!openCreateChatDialog)}
                        startIcon={<Add/>}
                    >
                        Create Chat
                    </Button>
                    <CreateChatDialog open={openCreateChatDialog} onClose={() => setOpenCreateChatDialog(false)} />
                </Box>
            </Box>
        </Box>
    );
}

export default LeftNav;