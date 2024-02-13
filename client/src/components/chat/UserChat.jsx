import React from 'react'; // Stelle sicher, dass React importiert wird, falls du JSX verwendest.
import { Stack } from 'react-bootstrap'; // Importiere Stack von react-bootstrap
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import avatar from "../../assets/Avatar_female.svg";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { unreadNotificationsFunc } from '../../utils/unreadNotifications';
import moment from "moment";
import { useFecthLatestMessage } from "../../hooks/useFetchLatestMessage";


const UserChats = ({ chat, user }) => {
    const { recipientUser } = useFetchRecipientUser(chat, user);
    const { onlineUsers, notifications, markThisUserNotificationsAsRead } = useContext(ChatContext);
    const { latestMessage } = useFecthLatestMessage(chat);
    const unreadNotifications = unreadNotificationsFunc(notifications)
    const thisUserNotifications = unreadNotifications?.filter(
        n => n.senderId === recipientUser?._id
    )

    const isUserOnline = onlineUsers?.some(
        (user) => user.userId === recipientUser?._id
    );

    const truncateText = (text) => {
        let shortText = text.substring(0, 20);

        if (text.length > 20) {
            shortText = shortText + "...";

            return shortText;
        }
    }

    return (
        <Stack
            direction="horizontal"
            gap={3}
            className="user-card align-items-center p-2 justify-content-between"
            role="button "
            onClick={() => {
                if (thisUserNotifications?.length !== 0) {
                    markThisUserNotificationsAsRead(thisUserNotifications, notifications);
                }
            }
            }
        >

            <div className="d-flex">
                <div className="me-2">
                    <img src={avatar} height="35px" />
                </div>
                <div className="text-contetn">
                    <div className="name">{recipientUser?.name}</div>
                    <div className="text">
                        {latestMessage?.text && 
                        (<span>{truncateText(latestMessage?.text)}</span>)}
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column align-items-end">
                <div className="date">{moment(latestMessage?.createdAt).calendar()}</div>
                <div className={
                    thisUserNotifications?.length > 0 ? "this-user-notifications" : ""
                }>
                    {thisUserNotifications?.length > 0
                        ? thisUserNotifications.length
                        : ""}
                </div>
                <span className={isUserOnline ? "user-online" : ""}></span>
            </div>
        </Stack>
    );
};

export default UserChats;
