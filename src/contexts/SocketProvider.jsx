import { createContext, useContext, useEffect, useMemo, useState } from "react";
import propTypes from "prop-types";
import { io } from "socket.io-client";

import api from "src/libs/axios";
import { AuthContext } from "src/contexts/AuthProvider";
import socketEvents, { status } from "src/constants/socketEvents";

export const SocketContext = createContext();

const SocketProvider = (props) => {
    // const { users } = useUsers()
    const { auth, setAuth } = useContext(AuthContext);
    const socket = useMemo(
        () => auth._id && io(`${process.env.REACT_APP_BASE_URL}`, { extraHeaders: { token: localStorage.getItem("token") } }),
        [auth._id]
    );

    const [allDms, setAllDms] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [showImage, setShowImage] = useState("");
    const [showThread, setShowThread] = useState("");
    const [allChannels, setAllChannels] = useState([]);
    const [selectedChMsg, setSelectedChMsg] = useState([]);
    const [selectedThread, setSelectedThread] = useState([]);
    const [selectedCurChannel, setSelectedCurChannel] = useState({});
    const [messageInfo, setMessageInfo] = useState({
        sender: null,
        channelId: null,
        mentions: [],
        message: "",
        files: [],
        emoticons: [],
        isPinned: "",
        parentId: null,
    });

    useEffect(() => {
        if (socket) {
            socket.on(socketEvents.CHANGESTATUS, (state, data) => {
                if (state == status.ON) {
                    if (data._id == auth._id) setAuth(data);
                    api.get("/user")
                        .then((res) => {
                            setAllUsers(res.data);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            });

            // Channel
            socket.on(socketEvents.READALLCHANNEL, (state, data) => {
                if (state == status.ON) {
                    let tmp_channels = [];
                    let tmp_dms = [];
                    data.forEach((curChannel) => {
                        if (curChannel.isDm == false) tmp_channels.push(curChannel);
                        else tmp_dms.push(curChannel);
                    });
                    setAllDms(tmp_dms);
                    setAllChannels(tmp_channels);
                }
            });
            socket.on(socketEvents.CREATECHANNEL, (state) => {
                if (state == status.ON) socket.emit(socketEvents.READALLCHANNEL);
            });
            socket.on(socketEvents.READCHANNEL, (state, data) => {
                if (state == status.ON) setSelectedCurChannel(data);
            });
            socket.on(socketEvents.UPDATECHANNEL, (state) => {
                if (state === status.ON) socket.emit(socketEvents.READALLCHANNEL);
            });
            socket.on(socketEvents.DELETECHANNEL, (state) => {
                if (state === status.ON) socket.emit(socketEvents.READALLCHANNEL);
            });

            // Message
            socket.on(socketEvents.READALLMESSAGE, (state, data) => {
                if (state == status.ON) {
                    let tmp_threads = [];
                    let tmp_messages = [];
                    data.forEach((curMessage) => {
                        if (curMessage.parentId != null) tmp_threads.push(curMessage);
                        else tmp_messages.push(curMessage);
                    });
                    setSelectedChMsg(tmp_messages);
                    setSelectedThread(tmp_threads);
                }
            });
            socket.on(socketEvents.CREATEMESSAGE, (state, data) => {
                if (state == status.ON) {
                    if (data.parentId != null) setSelectedThread([...selectedThread, data]);
                    else setSelectedChMsg([...selectedChMsg, data]);
                }
            });
            socket.on(socketEvents.READMESSAGE, (state, data) => {
                if (state === status.ON) setSelectedThread(data);
            });
            socket.on(socketEvents.UPDATEMESSAGE, (state, data) => {
                if (state === status.ON) {
                    if (data.parentId !== null) setSelectedThread(selectedThread.map((thread) => (thread._id == data._id ? data : thread)));
                    else setSelectedChMsg(selectedChMsg.map((msg) => (msg._id == data._id ? data : msg)));
                }
            });
            socket.on(socketEvents.DELETEMESSAGE, (state, data) => {
                if (state === status.ON) {
                    if (data.parentId == null) setSelectedChMsg(selectedChMsg.filter((msg) => msg._id != data._id));
                    else setSelectedThread(selectedThread.filter((thread) => thread._id != data._id));
                }
            });
        }
        return () => {
            if (socket) {
                socket.removeListener(socketEvents.CHANGESTATUS);

                socket.removeListener(socketEvents.READALLCHANNEL);
                socket.removeListener(socketEvents.CREATECHANNEL);
                socket.removeListener(socketEvents.READCHANNEL);
                socket.removeListener(socketEvents.UPDATECHANNEL);
                socket.removeListener(socketEvents.DELETECHANNEL);

                socket.removeListener(socketEvents.READALLMESSAGE);
                socket.removeListener(socketEvents.CREATEMESSAGE);
                socket.removeListener(socketEvents.READMESSAGE);
                socket.removeListener(socketEvents.UPDATEMESSAGE);
                socket.removeListener(socketEvents.DELETEMESSAGE);
            }
        };
    });

    useEffect(() => {
        if (auth._id) {
            socket.emit(socketEvents.CHANGESTATUS, { id: auth._id, status: 1 });
            socket.emit(socketEvents.READALLCHANNEL);
        }
    }, [auth._id]);

    useEffect(() => {
        if (allChannels.length > 0) socket.emit(socketEvents.READCHANNEL, allChannels[0]);
    }, [allChannels]);

    useEffect(() => {
        if (selectedCurChannel._id) socket.emit(socketEvents.READALLMESSAGE, selectedCurChannel._id);
    }, [selectedCurChannel]);

    return (
        <SocketContext.Provider
            value={{
                allDms,
                socket,
                allUsers,
                showImage,
                showThread,
                allChannels,
                messageInfo,
                setShowImage,
                selectedChMsg,
                setShowThread,
                setMessageInfo,
                selectedThread,
                setSelectedThread,
                selectedCurChannel,
            }}
        >
            {props.children}
        </SocketContext.Provider>
    );
};

SocketProvider.propTypes = {
    children: propTypes.node.isRequired,
};

export default SocketProvider;
