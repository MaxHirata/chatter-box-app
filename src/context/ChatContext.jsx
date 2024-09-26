import { createContext, useState } from "react"
import { v4 as uuid } from "uuid";

export const ChatContext = createContext({});

const ChatContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [userHash, setUserHash] = useState({});
    const [chatLogHash, setChatLogHash] = useState({});

    const handleSelectCurrentUser = (userId) => { setCurrentUser(userId) }

    const handleCreateUser = (name) => {
        const userId = uuid();
        const newUser = {
            id: userId,
            name: name,
            deleted: false // Going to mimic a soft delete approach when deleting users
        }
        let updatedUserHash = {...userHash};
        updatedUserHash[userId] = newUser;
        setUserHash(updatedUserHash);
    }

    const handleDeleteUser = (userId) => {
        let updatedUserHash = {...userHash};
        updatedUserHash[userId].deleted = true;
        setUserHash(updatedUserHash);
    }

    const handleCreateChat = (userIds) => {
        const chatId = uuid();
        const newChat = {
            id: chatId,
            participantIds: [...userIds],
            chatLogs: []
        }
        let updatedChatLogHash = {...chatLogHash};
        updatedChatLogHash[chatId] = newChat;
        setChatLogHash(updatedChatLogHash);
    }

    const handleDeleteChat = (chatId) => {
        let updatedChatLogHash = {...chatLogHash};
        delete updatedChatLogHash[chatId];
        setChatLogHash(updatedChatLogHash);
    }

    const handleSendMessage = (chatId, userId, message) => {
        const newMessage = {
            senderName: userHash[userId].name,
            message: message,
            timeStamp: Date.now() //TODO: format this into a readable timestamp
        }

        let updatedChatLogHash = {...chatLogHash};
        updatedChatLogHash[chatId].chatLogs.push(newMessage);
        setChatLogHash(updatedChatLogHash);
    }


    return (
        <ChatContext.Provider value={{
            currentUser,
            userHash,
            chatLogHash,
            handleSelectCurrentUser,
            handleCreateUser,
            handleDeleteUser,
            handleCreateChat,
            handleDeleteChat,
            handleSendMessage
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatContextProvider;