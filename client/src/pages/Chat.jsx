import { ChatContext } from "../context/ChatContext.jsx";
import { useContext } from "react";
import { Container, Stack } from "react-bootstrap";
import UserChats from "../components/chat/UserChat.jsx";
import PotentialChats from "../components/chat/PotentialChats.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

const Chat = () => {
    const { user } = useContext(AuthContext);
    const { userChats, isUserChatsLoading, userChatError } = useContext(ChatContext);

    console.log("UserChats: ", userChats);

    return (
        <Container>
            <PotentialChats />
            {userChats?.length < 1 ? null : (
                <Stack direction="horizontal" gap={4}
                    className="algin-items-start">
                    <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
                        {isUserChatsLoading && <p>Loading chats...</p>}
                        {userChats?.map((chat, index) => {
                            return (
                                <div key={index}>
                                    <UserChats chat={chat} user={user} />
                                </div>
                            )
                        })}

                    </Stack>
                    <p>Chatbox</p>
                </Stack>
            )
            }
        </Container >
    );
};

export default Chat;

