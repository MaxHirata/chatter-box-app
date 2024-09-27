import { Box } from "@mui/material"
import ChatWindow from "./ChatWindow";
import LeftNav from "./LeftNav";
import { useContext } from "react";
import { ChatContext } from "../context/chatContext";
import EmptyChatState from "./EmptyChatState";

const ChatView = () => {

    const { currentChat } = useContext(ChatContext);

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
            <LeftNav/>
            {currentChat ? <ChatWindow/> : <EmptyChatState/>}
        </Box>
    )
};

export default ChatView;