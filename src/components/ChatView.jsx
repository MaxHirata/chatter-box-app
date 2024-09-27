import { Box } from "@mui/material"
import { ChatContext } from "../context/chatContext";
import { useContext, useEffect } from "react";
import ChatWindow from "./ChatWindow";

const ChatView = () => {
    const { 
        selectedUser,
        selectedChat,
        userHash,
        handleCreateUser,
        handleSwitchUser
    } = useContext(ChatContext);

    const userIds = Object.keys(userHash);

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}
        >
            <Box
                sx={{
                    width: '30%',
                    border: '5px solid #5c6169',
                    background: '#5c6169',
                    color: 'white'
                }}
            >
                <Box
                    sx={{
                        fontWeight: 600,
                        marginTop: 2,
                        marginBottom: 2
                    }}
                >User List</Box>
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
            <ChatWindow/>
        </Box>
    )
};

export default ChatView;