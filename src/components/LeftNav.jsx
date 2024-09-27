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
                            key={idx}
                            sx={{ display: 'flex',justifyContent: 'flex-start', alignItems: 'center' }}
                        >
                            <Box 
                                sx={{
                                    border: `2px solid ${chatId === currentChat ? 'red' : '#515761'}`,
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

                <Box>
                    <Button
                        variant="contained"
                        onClick={() => setOpenCreateChatDialog(!openCreateChatDialog)}
                        startIcon={<Add/>}
                    >
                        Create Chat
                    </Button>
                </Box>
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