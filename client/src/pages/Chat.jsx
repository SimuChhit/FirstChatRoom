import {ChatContext} from "../context/ChatContext.jsx";
import {useContext} from "react";

const Chat = () => {

    const {userChats, isUserChatsLoading, userChatError} = useContext(ChatContext);

    console.log("UserChats: ", userChats);

    return <>hier wird unser Chat implementiert</>;
};

export default Chat;

