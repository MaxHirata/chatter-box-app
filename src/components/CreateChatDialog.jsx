import { 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    TextField 
} from "@mui/material";
import { useContext, useState } from "react";
import { ChatContext } from "../context/chatContext";

const CreateChatDialog = ({open, onClose}) => {

    const { 
        currentUser,
        handleCreateChat 
    } = useContext(ChatContext);

    const [chatTitle, setChatTitle] = useState('');

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create New Chat</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter a title for the New Chat
                </DialogContentText>
                <TextField
                    onChange={ e => setChatTitle(e.target.value) }
                />
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button 
                    onClick={() => handleCreateChat([currentUser], chatTitle)}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateChatDialog;