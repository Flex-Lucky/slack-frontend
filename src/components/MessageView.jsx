import React, { useContext, useState } from "react";
import propTypes from "prop-types";

import { HStack, Image, VStack, Wrap, Text, Icon, Flex } from "@chakra-ui/react";
import icons from "src/constants/icons";

import Emoticons from "src/components/Emoticons";
import socketEvents from "src/constants/socketEvents";
import { AuthContext } from "src/contexts/AuthProvider";
import { SocketContext } from "src/contexts/SocketProvider";

const MessageView = (props) => {
    const { curUser, msg } = props;

    const { auth } = useContext(AuthContext);
    const { setShowThread, socket, selectedCurChannel, allUsers } = useContext(SocketContext);

    const [show, setShow] = useState("");
    const [view, setView] = useState("");

    const handleShow = (id) => {
        setShow(id);
    };

    const handleLeave = () => {
        setShow("");
    };

    const handleV = () => {
        setView("");
    };

    const handleView = () => {
        setView("view");
    };

    const handlePin = () => {
        let temp = msg.isPined?.includes(auth._id) ? msg.isPined.filter((pinId) => pinId != auth._id) : [...msg.isPined, auth._id];
        socket.emit(socketEvents.UPDATEMESSAGE, { id: msg._id, message: { ...msg, isPined: [...temp], sender: msg.sender } });
    };

    const handleThread = (id) => {
        setShowThread(id);
        socket.emit(socketEvents.READMESSAGE, id);
    };

    const handleEdit = () => {};

    const handleEmoticon = (emoticon) => {
        let temp = [];
        if (msg.emoticons.length) {
            temp = msg.emoticons.find((emo) => emo.code === emoticon)
                ? msg.emoticons.map((emo) => {
                      if (emo.code === emoticon) {
                          return {
                              ...emo,
                              recommenders: emo.recommenders.includes(auth._id)
                                  ? emo.recommenders.filter((recommender) => recommender != auth._id)
                                  : [...emo.recommenders, auth._id],
                          };
                      } else {
                          return emo;
                      }
                  })
                : [...msg.emoticons, { recommenders: [auth._id], code: emoticon }];
        } else {
            temp = [
                {
                    recommenders: [auth._id],
                    code: emoticon,
                },
            ];
        }
        socket.emit(socketEvents.UPDATEMESSAGE, { id: msg._id, message: { ...msg, emoticons: [...temp] } });
    };

    const handleDelete = (id) => {
        socket.emit(socketEvents.DELETEMESSAGE, id);
    };

    return (
        <HStack
            py={2}
            gap={4}
            w={"100%"}
            color={"#000"}
            h={"fit-content"}
            align={"flex-start"}
            onMouseLeave={() => handleLeave()}
            onMouseOver={() => handleShow(msg._id)}
        >
            <Image w={"40px"} rounded={8} h={"40px"} src={`${process.env.REACT_APP_BASE_URL}/avatar/${curUser.avatar}`} />
            <VStack flex={"1 1 0"} h={"100%"} gap={2}>
                <VStack h={"40px"} w={"100%"}>
                    <HStack w={"100%"} justify={"space-between"} pos={"relative"}>
                        <Text>{curUser.username}</Text>
                        <HStack
                            p={2}
                            gap={1}
                            right={0}
                            pos={"absolute"}
                            w={"fit-content"}
                            fontSize={"20px"}
                            border={"1px solid #ddd"}
                            display={show == msg._id ? "flex" : "none"}
                        >
                            <Icon cursor={"pointer"} onClick={() => handlePin(msg)}>
                                {msg.isPined.includes(auth._id) ? icons.pinned : icons.pin}
                            </Icon>
                            <HStack pos={"relative"} onMouseOver={handleView} onMouseLeave={handleV}>
                                <Icon cursor={"pointer"}>{icons.emoticon}</Icon>
                                <Flex
                                    right={0}
                                    p={"8px"}
                                    zIndex={10}
                                    top={"20px"}
                                    bg={"#fff"}
                                    minW={"200px"}
                                    maxH={"160px"}
                                    align={"center"}
                                    pos={"absolute"}
                                    justify={"center"}
                                    border={"1px solid #ccc"}
                                    display={view ? "flex" : "none"}
                                    boxShadow={"0px 0px 5px 0px #323232"}
                                >
                                    <Emoticons handleRecommend={handleEmoticon} msg={msg} />
                                </Flex>
                            </HStack>
                            <Icon
                                cursor={"pointer"}
                                onClick={() => handleThread(msg._id)}
                                display={selectedCurChannel.isDm == false ? "flex" : "none"}
                            >
                                {icons.threads}
                            </Icon>
                            <HStack display={curUser._id == auth._id ? "flex" : "none"}>
                                <Icon cursor={"pointer"} onClick={() => handleEdit(msg._id)}>
                                    {icons.edit}
                                </Icon>
                                <Icon cursor={"pointer"} onClick={() => handleDelete(msg._id)}>
                                    {icons.delete}
                                </Icon>
                            </HStack>
                        </HStack>
                    </HStack>
                    <HStack w={"100%"} gap={2}>
                        {allUsers.map((user, index) => {
                            if (msg.receivers.includes(user._id)) {
                                return (
                                    <Text key={index} bg={"#ddd"}>
                                        @{user.username}
                                    </Text>
                                );
                            }
                        })}
                    </HStack>
                </VStack>
                <Wrap flex={"1 1 0"} w={"100%"}>
                    <Text>{msg.message}</Text>
                </Wrap>
                <HStack w={"100%"} gap={2} fontSize={"18px"}>
                    {msg.emoticons?.map((value, index) => {
                        return (
                            <HStack
                                key={index}
                                justify={"flex-start"}
                                cursor={"pointer"}
                                onClick={() => handleEmoticon(value.code)}
                                display={value?.recommenders.length ? "flex" : "none"}
                            >
                                <Text>{value?.recommenders.length ? value?.code : ""}</Text>
                                <Text>{value?.recommenders.length ? value?.recommenders.length : ""}</Text>
                            </HStack>
                        );
                    })}
                </HStack>
            </VStack>
        </HStack>
    );
};

MessageView.propTypes = {
    curUser: propTypes.object,
    msg: propTypes.object.isRequired,
};

export default MessageView;
