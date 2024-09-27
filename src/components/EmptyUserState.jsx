import { Box, Button } from "@mui/material";
import { useContext, useState } from "react";
import { ChatContext } from "../context/chatContext";
import { Chat, PersonAdd } from "@mui/icons-material";
import CreateUserDialog from "./CreateUserDialog";

const EmptyUserState = () => {
    
    const [ openCreateUserDialog, setOpenCreateUserDialog ] = useState(false);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 3,
                width: 400,
                border: '3px solid #4287f5',
                borderRadius: '16px'
            }}
        >
            <Chat sx={{ fontSize: 80 }}/>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }} 
                mt={2}
            >
                <Box sx={{ fontSize: 30, fontWeight: 600, marginBottom: 1 }}>Welcome to Chatter Box!!!</Box>
                <Box sx={{ fontSize: 25, fontWeight: 400 }}>Please create a user first</Box>
                <Box sx={{ fontSize: 16, fontWeight: 400 }}>Then you can start chatting away!!!</Box>
            </Box>
            <Button 
                sx={{
                    marginTop: 4,
                    textTransform: 'none'
                }}
                variant="contained"
                startIcon={<PersonAdd/>}
                onClick={() => {setOpenCreateUserDialog(true);}}
            >
                Create User
            </Button>
            <CreateUserDialog open={openCreateUserDialog} onClose={() => setOpenCreateUserDialog(false)}/>
        </Box>
    );
}

export default EmptyUserState;