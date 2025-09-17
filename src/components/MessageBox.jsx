import React, { useContext, useEffect, useRef, useState } from "react";

import { Menu, Text, Icon, List, VStack, HStack, Textarea, ListItem, MenuItem, MenuList, MenuButton } from "@chakra-ui/react";
import icons from "src/constants/icons";

import BadgeAvatar from "src/components/BadgeAvatar";
import socketEvents from "src/constants/socketEvents";
import { SocketContext } from "src/contexts/SocketProvider";

const MessageBox = () => {
    const inputRef = useRef(null);
    const buttonRef = useRef(null);
    const { messageInfo, setMessageInfo, socket, showThread, allUsers } = useContext(SocketContext);

    const [code, setCode] = useState("");

    useEffect(() => {
        if (showThread) setMessageInfo({ ...messageInfo, parentId: showThread });
    }, [showThread]);

    //.
    const [mention, setMention] = useState("");
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [position, setPosition] = useState({
        bottom: 0,
        left: 0,
    });

    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        const value = e.target.value;
        setMention(value);

        if (value.endsWith("@")) {
            if (inputRef.current) {
                console.log(inputRef)
                const rect = inputRef.current.getBoundingClientRect();
                console.log(rect, window.scrollY);
                setPosition({
                    top: rect.top + window.scrollY,
                    left: rect.left + window.scrollX,
                });
                setFilteredOptions(allUsers);
            }
        } else {
            setFilteredOptions([]);
            setMessageInfo({ ...messageInfo, message: e.target.value });
        }
        setMessage(e.target.value);
    };

    const handleSend = () => {
        socket.emit(socketEvents.CREATEMESSAGE, messageInfo);
    };

    const handleEnter = (e) => {
        setCode(e.code);
        if ((code == "ControlRight" || code == "ControlLeft") && e.code == "Enter") handleSend();
    };

    const handleOptionClick = (option, username) => {
        setMessageInfo({
            ...messageInfo,
            receivers: messageInfo.receivers.length
                ? messageInfo.receivers.includes(option)
                    ? messageInfo.receivers.filter((receiver) => receiver != option)
                    : [...messageInfo.receivers, option]
                : [option],
        });
        inputRef.current.focus();
        setMessage(message + "" + username + " ");
        setFilteredOptions([]);
    };

    return (
        <VStack w={"95%"} h={"180px"} color={"#000"} justify={"center"} align={"center"}>
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
                ref={inputRef}
                resize={"none"}
                borderRadius={"none"}
                onKeyDown={handleEnter}
                onChange={handleInputChange}
                value={message ? message : ""}
                _focus={{ border: "0.5px solid #0004" }}
            />
            <HStack w={"100%"} justify={"space-between"} fontSize={"22px"} bg={"#0001"} p={2} gap={4}>
                <HStack gap={4}>
                    <Icon>{icons.plus}</Icon>
                    <Menu>
                        <MenuButton>
                            <Icon>{icons.atmark}</Icon>
                        </MenuButton>
                        <MenuList>
                            {allUsers.map((user, index) => {
                                return (
                                    <MenuItem p={2} px={4} key={index}>
                                        <BadgeAvatar src={user.avatar} status={user.status} />
                                        <Text>{user.username}</Text>
                                    </MenuItem>
                                );
                            })}
                        </MenuList>
                    </Menu>
                    <Icon>{icons.emoticon}</Icon>
                    <Icon>{icons.camera}</Icon>
                    <Icon>{icons.voice}</Icon>
                </HStack>
                <Icon onClick={handleSend} ref={buttonRef}>
                    {icons.send}
                </Icon>
            </HStack>

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
                        return (
                            <ListItem
                                p={2}
                                key={user._id}
                                cursor={"pointer"}
                                _hover={{ bg: "gray.100" }}
                                onClick={user.receivers?.includes(user._id) ? () => {} : () => handleOptionClick(user._id, user.username)}
                            >
                                <BadgeAvatar status={user.status} src={user.avatar} />
                                {user.username}
                            </ListItem>
                        );
                    })}
                </List>
            )}
        </VStack>
    );
};

export default MessageBox;
