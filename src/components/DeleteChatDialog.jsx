import { useContext } from "react";
import { ChatContext } from "../context/chatContext";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const DeleteChatDialog = ({open, onClose, chatId}) => {
    const { handleDeleteChat } = useContext(ChatContext);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Chat</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Warning! If you delete this chat, you and all other participants in this chat will no longer have a record of this chat.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button 
                    onClick={() => {
                        console.log("Delete Chat: ", chatId);
                        handleDeleteChat(chatId);
                        onClose();
                    }}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteChatDialog;