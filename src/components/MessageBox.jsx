import React, { useContext, useRef, useState } from "react";
import propTypes from "prop-types";
import toast from "src/libs/toast";

import { Menu, Text, Icon, List, Input, VStack, HStack, Textarea, ListItem, MenuItem, MenuList, MenuButton } from "@chakra-ui/react";
import icons from "src/constants/icons";

import upload from "src/api/upload";
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
    const [mentionNames, setMentionNames] = useState([]);

    const [filteredOptions, setFilteredOptions] = useState([]);
    const [position, setPosition] = useState({
        bottom: 0,
        left: 0,
    });

    const handleInputChange = (e) => {
        let value = e.target.value;
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
                    ? messageInfo.mentions.filter((receiver) => receiver != option)
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
        setFiles([]);
        setMessage("");
        setMentionNames([]);
        setMessageInfo({ ...messageInfo, message: "", mentions: [], files: [] });

        const formData = new FormData();
        files.forEach((file) => {
            formData.append("files", file);
        });
        upload(formData)
            .then((res) => {
                socket.emit(socketEvents.CREATEMESSAGE, { ...messageInfo, files: res.payload });
            })
            .catch((err) => {
                toast.error("Upload Failed");
            });
    };

    return (
        <VStack w={"95%"} h={"180px"} color={"#000"}  _dark={{ bg: "#fff2", color: "#fff"}} justify={"center"} align={"center"}>
            <HStack width={"100%"} fontSize={"22px"} bg={"#0001"} p={2} gap={4}>
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
                _focus={{ border: "0.5px solid #0004" }}
                ref={reftype == "main" ? mainRef : threadRef}
            />
            <HStack w={"100%"} justify={"space-between"} fontSize={"22px"} bg={"#0001"} p={2} gap={4}>
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
                                        <MenuItem p={2} px={4} key={index} onClick={() => handleOptionClick(user._id, user.username)}>
                                            <BadgeAvatar src={user.avatar} status={user.status} />
                                            <Text>{user.username}</Text>
                                        </MenuItem>
                                    );
                                }
                            })}
                        </MenuList>
                    </Menu>
                    <Icon>{icons.emoticon}</Icon>
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

            {showImage && showImage != "dbImage" && <ShowImage path={path} />}

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
                                    bg={"#fff"}
                                    minW={"200px"}
                                    key={user._id}
                                    display={"flex"}
                                    cursor={"pointer"}
                                    alignItems={"center"}
                                    color={"var(--primary)"}
                                    _hover={{ bg: "#525e", color: "#fff" }}
                                    onClick={
                                        user.mentions?.includes(user._id) ? () => {} : () => handleOptionClick(user._id, user.username)
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
