import { Box } from "@mui/material"
import ChatWindow from "./ChatWindow";
import LeftNav from "./LeftNav";

const ChatView = () => {
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
            <ChatWindow/>
        </Box>
    )
};

export default ChatView;