import {createContext, useState, useEffect} from "react";
import {baseUrl, getRequest, postRequest} from "../utils/services.js";

export const ChatContext = createContext();

export const ChatContextProvider = ({children, user}) => {
  const [userChats, setUserChats] = useState([null]);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatError, setUserChatsError] = useState(null);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {

        setIsUserChatsLoading(true);
        setUserChatsError(null);

        const response = await getRequest(`${baseUrl}/chats/${user._id}`);

        setIsUserChatsLoading(false);

        if (response.error) {
          return setUserChatsError(response.error);
        }

        setUserChats(response);
      }
    }
    getUserChats();
  }, [user]);

  return <ChatContext.Provider value={{
    userChats,
    isUserChatsLoading,
    userChatError,
  }}
  >
    {children}
  </ChatContext.Provider>
}