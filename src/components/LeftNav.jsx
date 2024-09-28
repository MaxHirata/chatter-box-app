import { Box, Button, IconButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/chatContext";
import CreateChatDialog from "./CreateChatDialog";
import { Add, Delete } from "@mui/icons-material";
import DeleteChatDialog from "./DeleteChatDialog";

const LeftNav = () => {

    const { 
        currentUser,
        currentChat,
        userHash,
        chatHash,
        handleSelectCurrentChat,
    } = useContext(ChatContext);

    const [openCreateChatDialog, setOpenCreateChatDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [chatToDelete, setChatToDelete] = useState(null);
    const [currUser, setCurrUser] = useState(userHash[currentUser]);

    useEffect(() => {
        setCurrUser(userHash[currentUser]);
    }, [currentUser, chatHash, userHash])

    const userIds = Object.keys(userHash);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '30%',
                borderRadius: '16px',
                color: 'white'
            }}
        >
            <Box
                sx={{
                    height: '20%', 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '16px 8px',
                    background: '#5c6169',
                    borderRadius: '16px',
                    marginBottom: '8px'
                }}
            >
                <Box sx={{ fontWeight: 600, marginTop: 2, marginBottom: 2 }}>User List</Box>
                { userIds.map((userId) => {
                    const user = userHash[userId];
                    return (
                        <Box
                            key={userId}
                            sx={{
                                width: '180px',
                                border: `3px solid ${userId === currentUser ? '#4287f5' : '#515761'}`,
                                borderRadius: '12px',
                                padding: 1,
                                margin: '8px 4px'
                            }}
                        >{user.name}</Box>
                    )
                })}
            </Box>
            <Box 
                sx={{ 
                    height: '70%', 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 8px',
                    background: '#5c6169',
                    borderRadius: '16px',
                }}
            >
                <Box>
                    <Box sx={{ fontWeight: 600, marginTop: 2, marginBottom: 2 }}>Chat List</Box>
                    {currUser.involvedChats.map((chatId, idx) => {
                    const chat = chatHash[chatId];
                    return(
                        <Box 
                            key={idx}
                            sx={{ display: 'flex',justifyContent: 'flex-start', alignItems: 'center' }}
                        >
                            <Box 
                                sx={{
                                    minWidth: '150px',
                                    border: `2px solid ${chatId === currentChat ? '#4287f5' : '#515761'}`,
                                    borderRadius: '6px',
                                    padding: '4px 8px',
                                    margin: '5px 10px'
                                }}
                                onClick={() => handleSelectCurrentChat(chatId)}
                            >
                              {chat.name}
                            </Box>
                            <IconButton
                                    size="small"
                                    onClick={() => {
                                        setChatToDelete(chatId);
                                        setOpenDeleteDialog(true);
                                    }}
                                >
                                <Delete fontSize="inherit"/>
                            </IconButton>
                        </Box>
                        );
                    })}
                </Box>

                <Button
                    sx={{ width: 180 }}
                    variant="contained"
                    onClick={() => setOpenCreateChatDialog(!openCreateChatDialog)}
                    startIcon={<Add/>}
                >
                    Create Chat
                </Button>
            </Box>
            <CreateChatDialog 
                open={openCreateChatDialog} 
                onClose={() => setOpenCreateChatDialog(false)} 
            />
            <DeleteChatDialog 
                chatId={chatToDelete} 
                open={openDeleteDialog} 
                onClose={() => {
                    setOpenDeleteDialog(false);
                    setChatToDelete(null);
                }} 
            />
        </Box>
    );
}

export default LeftNav;