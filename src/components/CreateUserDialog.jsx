import { useContext, useState } from "react"
import { ChatContext } from "../context/chatContext"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";

const CreateUserDialog = ({ open, onClose }) => {
    const { handleCreateUser } = useContext(ChatContext);
    
    const [userName, setUserName] = useState('');

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create a New User</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter the name of the new user:
                </DialogContentText>
                <TextField
                    onChange={ e => setUserName(e.target.value) }
                />
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={() => onClose()}
                >
                    Cancel
                </Button>
                <Button 
                    onClick={() => { handleCreateUser(userName) }}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
 }

export default CreateUserDialog