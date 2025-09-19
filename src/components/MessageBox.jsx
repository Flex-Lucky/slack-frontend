import React, { useContext, useRef, useState } from "react";
import propTypes from "prop-types";
import toast from "src/libs/toast";

import { Flex, Menu, Text, Icon, List, Input, VStack, HStack, Textarea, ListItem, MenuItem, MenuList, MenuButton } from "@chakra-ui/react";
import icons from "src/constants/icons";

import upload from "src/api/upload";
import Emoticons from "src/components/Emoticons";
import ShowImage from "src/components/ShowImage";
import BadgeAvatar from "src/components/BadgeAvatar";
import socketEvents from "src/constants/socketEvents";
import { AuthContext } from "src/contexts/AuthProvider";
import { SocketContext } from "src/contexts/SocketProvider";

const MessageBox = (props) => {
    const { reftype } = props;

    const fileRef = useRef(null);
    const mainRef = useRef(null);
    const threadRef = useRef(null);
    const buttonRef = useRef(null);

    const { auth } = useContext(AuthContext);
    const { messageInfo, setMessageInfo, socket, showThread, allUsers, showImage, setShowImage } = useContext(SocketContext);

    const [code, setCode] = useState("");
    const [path, setPath] = useState("");
    const [files, setFiles] = useState([]);
    const [message, setMessage] = useState("");
    const [showEmo, setShowEmo] = useState(false);
    const [mentionNames, setMentionNames] = useState([]);

    const [filteredOptions, setFilteredOptions] = useState([]);
    const [position, setPosition] = useState({
        bottom: 0,
        left: 0,
    });

    const handleInputChange = (e) => {
        let value = e.target.value;
        if (value == "") {
            console.log("empty");
            setMessageInfo({ ...messageInfo, mentions: [], message: "", emoticons: [] });
            setMentionNames([]);
            setFilteredOptions([]);
        }
        if (value.endsWith("@")) {
            if ((reftype == "main" ? mainRef : threadRef).current) {
                const rect = (reftype == "main" ? mainRef : threadRef).current.getBoundingClientRect();
                setPosition({
                    top: rect.top + window.scrollY,
                    left: rect.left + window.scrollX,
                });
                setFilteredOptions(allUsers);
            }
        } else {
            setFilteredOptions([]);
            mentionNames.forEach((mention) => {
                if (value.includes(mention)) value = value.replace(mention, " ");
            });
            setMessageInfo({ ...messageInfo, message: value, parentId: reftype == "main" ? null : showThread });
        }
        setMessage(e.target.value);
    };

    const handleEnter = (e) => {
        setCode(e.code);
        if ((code == "ControlRight" || code == "ControlLeft") && e.code == "Enter") handleSend();
    };

    const handleOptionClick = (option, username) => {
        setMessageInfo({
            ...messageInfo,
            mentions: messageInfo.mentions.length
                ? messageInfo.mentions.includes(option)
                    ? [...messageInfo.mentions]
                    : [...messageInfo.mentions, option]
                : [option],
        });
        (reftype == "main" ? mainRef : threadRef).current.focus();
        if (message.endsWith("@")) {
            setMessage(message + "" + username + " ");
        } else {
            setMessage(message + "@" + username + " ");
        }
        setFilteredOptions([]);
        setMentionNames([...mentionNames, `@${username}`]);
    };

    const handleFile = (e) => {
        setFiles([...files, e.target.files[0]]);
    };

    const handleShowImage = (file) => {
        setShowImage(file);
        setPath(URL.createObjectURL(file));
    };

    const handleSend = () => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("files", file);
        });
        upload(formData)
            .then((res) => {
                socket.emit(socketEvents.CREATEMESSAGE, { ...messageInfo, files: res.payload });
                setFiles([]);
                setMessage("");
                setMentionNames([]);
                setMessageInfo({ ...messageInfo, message: "", mentions: [], files: [], emoticons: [] });
            })
            .catch((err) => {
                toast.error("Send Failed");
            });
    };

    const handleShowEmoticon = () => {
        setShowEmo(!showEmo);
    };

    const handleEmoticon = (emoticon) => {
        let temp = [];
        if (messageInfo.emoticons.length) {
            temp = messageInfo.emoticons.find((emo) => emo.code === emoticon)
                ? messageInfo.emoticons.map((emo) => {
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
                : [...messageInfo.emoticons, { recommenders: [auth._id], code: emoticon }];
        } else {
            temp = [
                {
                    recommenders: [auth._id],
                    code: emoticon,
                },
            ];
        }
        setMessageInfo({ ...messageInfo, emoticons: temp });
        setShowEmo(false);
        setMessage(message + `${emoticon}`);
    };

    return (
        <VStack w={"95%"} h={"180px"} color={"#000"} justify={"center"} align={"center"}>
            <HStack width={"100%"} fontSize={"22px"} bg={"#0001"} p={2} gap={4} _dark={{ bg: "#fff2", color: "#fff" }}>
                <Icon>{icons.typeBold}</Icon>
                <Icon>{icons.typeStrikeThrough}</Icon>
                <Icon>{icons.typeItalic}</Icon>
                <Icon>{icons.typeUnderline}</Icon>
                <Icon>{icons.typeListBulleted}</Icon>
                <Icon>{icons.typeListNumbered}</Icon>
            </HStack>
            <Textarea
                id={"1"}
                rows={3}
                width={"100%"}
                resize={"none"}
                borderRadius={"none"}
                onKeyDown={handleEnter}
                onChange={handleInputChange}
                value={message ? message : ""}
                _dark={{ bg: "#fff5", color: "#fff" }}
                _focus={{ border: "0.5px solid #0004" }}
                ref={reftype == "main" ? mainRef : threadRef}
            />
            <HStack
                p={2}
                gap={4}
                w={"100%"}
                bg={"#0001"}
                fontSize={"22px"}
                justify={"space-between"}
                _dark={{ bg: "#fff2", color: "#fff" }}
            >
                <HStack gap={4}>
                    <Icon onClick={() => fileRef.current.click()}>{icons.plus}</Icon>
                    <Input ref={fileRef} type={"file"} onChange={handleFile} hidden />
                    <Menu>
                        <MenuButton>
                            <Icon>{icons.atmark}</Icon>
                        </MenuButton>
                        <MenuList>
                            {allUsers.map((user, index) => {
                                if (user._id != auth._id) {
                                    return (
                                        <MenuItem
                                            p={2}
                                            px={4}
                                            key={index}
                                            bg={messageInfo.mentions.includes(user._id) ? "#ddd" : "none"}
                                            onClick={
                                                messageInfo.mentions?.includes(user._id)
                                                    ? () => {}
                                                    : () => handleOptionClick(user._id, user.username)
                                            }
                                        >
                                            <BadgeAvatar src={user.avatar} status={user.status} />
                                            <Text>{user.username}</Text>
                                        </MenuItem>
                                    );
                                }
                            })}
                        </MenuList>
                    </Menu>
                    <HStack position={"relative"}>
                        <Icon onClick={handleShowEmoticon}>{icons.emoticon}</Icon>
                        <Flex
                            left={0}
                            p={"8px"}
                            zIndex={10}
                            bg={"#fff"}
                            minW={"200px"}
                            maxH={"160px"}
                            bottom={"25px"}
                            align={"center"}
                            pos={"absolute"}
                            justify={"center"}
                            border={"1px solid #ccc"}
                            display={showEmo ? "flex" : "none"}
                            boxShadow={"0px 0px 5px 0px #323232"}
                        >
                            <Emoticons handleRecommend={handleEmoticon} msg={messageInfo} />
                        </Flex>
                    </HStack>
                    <Icon>{icons.camera}</Icon>
                    <Icon>{icons.voice}</Icon>
                </HStack>
                <HStack justify={"flex-start"} flex={"1 1 0"} gap={2} fontSize={"14px"}>
                    {files.map((file, index) => (
                        <HStack key={index} align={"center"} h={"100%"}>
                            <Text>{file.name}</Text>
                            <Icon fontSize={"20px"} pt={1.5} pl={1} onClick={() => handleShowImage(file)}>
                                {icons.password}
                            </Icon>
                        </HStack>
                    ))}
                </HStack>
                <Icon onClick={handleSend} reftype={buttonRef}>
                    {icons.send}
                </Icon>
            </HStack>

            {showImage != "dbImage" && <ShowImage path={path} />}

            {position && filteredOptions.length > 0 && (
                <List
                    mt={1}
                    spacing={1}
                    border={"1px"}
                    borderRadius={"md"}
                    position={"absolute"}
                    borderColor={"gray.200"}
                    transform={"translate(0%, -100%)"}
                    style={{ top: position.top, left: position.left }}
                >
                    {allUsers.map((user) => {
                        if (user._id != auth._id) {
                            return (
                                <ListItem
                                    p={2}
                                    pl={6}
                                    gap={3}
                                    minW={"200px"}
                                    key={user._id}
                                    display={"flex"}
                                    cursor={"pointer"}
                                    alignItems={"center"}
                                    _hover={{ bg: "#525e", color: "#fff" }}
                                    bg={messageInfo.mentions?.includes(user._id) ? "#5c275cff" : "#fff"}
                                    color={messageInfo.mentions?.includes(user._id) ? "#fff" : "var(--primary)"}
                                    onClick={
                                        messageInfo.mentions?.includes(user._id)
                                            ? () => {}
                                            : () => handleOptionClick(user._id, user.username)
                                    }
                                >
                                    <BadgeAvatar status={user.status} src={user.avatar} />
                                    {user.username}
                                </ListItem>
                            );
                        }
                    })}
                </List>
            )}
        </VStack>
    );
};

MessageBox.propTypes = {
    reftype: propTypes.string.isRequired,
};

export default MessageBox;
