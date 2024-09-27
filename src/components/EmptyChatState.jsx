import { Chat } from "@mui/icons-material";
import { Box } from "@mui/material";

const EmptyChatState = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 3,
                width: 400
            }}
        >
            <Chat sx={{ fontSize: 80 }}/>
            <Box sx={{ fontSize: 24, fontWeight: 600, margin: "10px 0px" }}>No Chats are present...</Box>
            <Box>Please create a chat in order to start chatting again!</Box>
        </Box>
    );
}

export default EmptyChatState;