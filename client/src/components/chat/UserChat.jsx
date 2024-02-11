import React from 'react'; // Stelle sicher, dass React importiert wird, falls du JSX verwendest.
import { Stack } from 'react-bootstrap'; // Importiere Stack von react-bootstrap
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import avatar from "../../assets/Avatar_female.svg";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const UserChats = ({ chat, user }) => {
    const { recipientUser } = useFetchRecipientUser(chat, user);
    const { onlineUsers } = useContext(ChatContext);

    const isUserOnline = onlineUsers?.some((user) => user.userId === recipientUser?._id);

    return (
    <Stack 
    direction="horizontal" 
    gap={3} 
    className="user-card align-items-center p-2 justify-content-between"
    role = "button ">

        <div className="d-flex">
            <div className="me-2">
                <img src = {avatar} height="35px" />
            </div>
            <div className="text-contetn">
                <div className="name">{recipientUser?.name}</div>
                <div className="text">Text Message</div>
            </div>
        </div>
        <div className="d-flex flex-column align-items-end">
        <div className="date">09/02/2024</div>
        <div className="this-user-notifications">2</div>
        <span className= {isUserOnline ? "user-online" : ""}></span>
        </div>
    </Stack>
    );
};

export default UserChats;
