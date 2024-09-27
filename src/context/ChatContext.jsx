import { createContext, useState } from "react"
import { v4 as uuid } from "uuid";

export const ChatContext = createContext({});

const ChatContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);
    const [userHash, setUserHash] = useState({});
    const [chatHash, setChatHash] = useState({});

    const init = () => {
        console.log("init!!");
        const userKeys = Object.keys(userHash);
        if(userKeys.length) {
            const firstUserId = userKeys[0];
            const user = userHash[firstUserId];
            setCurrentUser(user.id);

            console.log("init current user obj: ", user);

            // then set the first chat as the default selected
            if(user.involvedChats?.length > 0) {
                
                const firstChatId = user.involvedChats[0];
                console.log("Setting currentChat on init: ", firstChatId);
                setCurrentChat(firstChatId);
            }
        }
    }

    const handleSelectCurrentUser = (userId) => { setCurrentUser(userId) }

    const handleSelectCurrentChat = (chatId) => { setCurrentChat(chatId) }

    const handleCreateUser = (name) => {
        const chatId = uuid();
        const userId = uuid();

        // Create a self private chat so the new user can chat to them selves
        const selfChat = {
            id: chatId,
            name: 'self private chat',
            participantIds: [userId],
            chatLogs: []
        }

        // Create New User
        const newUser = {
            id: userId,
            name: name,
            involvedChats: [chatId],
            deleted: false // Going to mimic a soft delete approach when deleting users
        }

        let updatedChatHash = {...chatHash};
        updatedChatHash[chatId] = selfChat;
        setChatHash(updatedChatHash);

        let updatedUserHash = {...userHash};
        updatedUserHash[userId] = newUser;
        setUserHash(updatedUserHash);

        // After create set the new user as current and new chat as current
        setCurrentUser(userId);
        setCurrentChat(chatId);
    }

    const handleSwitchUser = (userId) => {
        if(userId) {
            const user = userHash[userId];
            setCurrentUser(user.id);

            // then set the first chat as the default selected
            if(user.involvedChats?.length) {
                const firstUserChatId = user.involvedChats[0];
                setCurrentChat(firstUserChatId);
            } else {
                setCurrentChat(null);
            }

        } else {
            setCurrentUser(null);
            setCurrentChat(null);
        }
    }

    const handleDeleteUser = (userId) => {
        let updatedUserHash = {...userHash};
        updatedUserHash[userId].deleted = true;
        setUserHash(updatedUserHash);
    }

    const handleCreateChat = (userIds, chatName) => {
        const chatId = uuid();
        const newChat = {
            id: chatId,
            name: chatName,
            participantIds: [...userIds],
            chatLogs: []
        }
        let updatedChatHash = {...chatHash};
        updatedChatHash[chatId] = newChat;

        let updatedUserHash = {...userHash};
        userIds.forEach(userId => {
            updatedUserHash[userId].involvedChats.push(chatId);
        })

        setUserHash(updatedUserHash);
        setChatHash(updatedChatHash);
        setCurrentChat(chatId); // After chat is create it becomes the new current chat
    }

    const handleDeleteChat = (chatId) => {
        let updatedChatHash = {...chatHash};
        let updatedUserHash = {...userHash};

        // Remove the chatId in each of the chat's participant's users' involvedChat list
        updatedChatHash[chatId].participantIds.forEach(participantId => {
            let userInvolvedChatList = updatedUserHash[participantId].involvedChats;
            const deletedChatIdIndex = userInvolvedChatList.indexOf(chatId);
            const updatedInvolvedChatList = userInvolvedChatList.splice(deletedChatIdIndex, 1);
            updatedUserHash[participantId].involvedChats = updatedInvolvedChatList;
        })

        // delete the chat object 
        delete updatedChatHash[chatId];

        setUserHash(updatedUserHash);
        setChatHash(updatedChatHash);
    }

    const handleSendMessage = (userId, chatId, message) => {
        const newMessage = {
            senderName: userHash[userId].name,
            message: message,
            timeStamp: Date.now() //TODO: format this into a readable timestamp
        }

        let updatedChatHash = {...chatHash};
        updatedChatHash[chatId].chatLogs.push(newMessage);
        setChatHash(updatedChatHash);
    }


    return (
        <ChatContext.Provider value={{
            currentUser,
            currentChat,
            userHash,
            chatHash,
            init,
            handleSwitchUser,
            handleSelectCurrentUser,
            handleSelectCurrentChat,
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