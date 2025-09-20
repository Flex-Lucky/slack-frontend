import { useContext, useState } from "react";

import { VStack, HStack, Text, Icon } from "@chakra-ui/react";
import icons from "src/constants/icons";

import CreateDM from "src/components/CreateDM";
import BadgeAvatar from "src/components/BadgeAvatar";
import socketEvents from "src/constants/socketEvents";
import { AuthContext } from "src/contexts/AuthProvider";
import CreateChannel from "src/components/CreateChannel";
import { SocketContext } from "src/contexts/SocketProvider";

const SideBar = () => {
    const { auth } = useContext(AuthContext);
    const { allChannels, socket, allDms, allUsers, selectedCurChannel } = useContext(SocketContext);

    const [showDm, setShowDm] = useState(true);
    const [showChannel, setShowChannel] = useState(true);
    const [showDMModal, setShowDMModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState("");
    const [selectedChannel, setSelectedChannel] = useState({});

    const handleSelectChannel = (id) => {
        socket.emit(socketEvents.READCHANNEL, id);
    };

    const handleShowChannel = () => {
        setShowChannel(!showChannel);
    };

    const handleShowDm = () => {
        setShowDm(!showDm);
    };

    const handleEdit = (id) => {
        setShowCreateModal("edit");
        setSelectedChannel(allChannels.filter((item) => item._id == id)[0]);
    };

    const handleDelete = (id) => {
        socket.emit(socketEvents.DELETECHANNEL, id);
    };

    const handleShowCreateModal = (id) => {
        setShowCreateModal("create");
    };

    const handleShowCreateDMModal = () => {
        setShowDMModal(!showDMModal);
    };
    console.log(allChannels);

    return (
        <VStack
            p={"16px"}
            h={"100%"}
            overflowY={"auto"}
            bg={"#5c275cff"}
            w={"var(--sidebar)"}
            rounded={"8px 0px 0px 8px"}
            _dark={{ bg: "#fff2", color: "#fff" }}
        >
            <VStack w={"full"} gap={8} px={"8px"} justify={"flex-start"} align={"flex-start"}>
                <HStack
                    w={"100%"}
                    rounded={4}
                    align={"center"}
                    cursor={"pointer"}
                    p={"2px 4px 2px 16px"}
                    justify={"space-between"}
                    _hover={{ bg: "#fff", color: "var(--primary)" }}
                >
                    <HStack gap={1}>
                        <Text>dogstarcoin</Text>
                        <Icon fontSize={"18px"} pt={"6px"}>
                            {icons.down}
                        </Icon>
                    </HStack>
                    <Icon fontSize={"20px"} pt={"4px"}>
                        {icons.edit}
                    </Icon>
                </HStack>
                <VStack w={"100%"}>
                    <HStack
                        gap={1}
                        w={"100%"}
                        rounded={4}
                        p={"2px 8px"}
                        cursor={"pointer"}
                        _hover={{ bg: "#fff", color: "var(--primary)" }}
                    >
                        <Icon transform={"rotateY(180deg)"} fontSize={"20px"} pt={"4px"}>
                            {icons.threads}
                        </Icon>
                        <Text>Threads</Text>
                    </HStack>
                </VStack>
                <VStack w={"100%"} gap={1}>
                    <HStack
                        gap={1}
                        w={"100%"}
                        rounded={4}
                        p={"2px 8px"}
                        cursor={"pointer"}
                        onClick={handleShowChannel}
                        _hover={{ bg: "#fff", color: "var(--primary)" }}
                    >
                        <Icon fontSize={"20px"} pt={"3px"}>
                            {showChannel ? icons.caretDown : icons.caretRight}
                        </Icon>
                        <Text>Channels</Text>
                    </HStack>
                    <VStack w={"100%"} gap={1} display={showChannel ? "flex" : "none"}>
                        {allChannels &&
                            allChannels.map((channel, index) => {
                                return (
                                    <HStack
                                        px={2}
                                        gap={2}
                                        py={0.5}
                                        w={"100%"}
                                        key={index}
                                        rounded={4}
                                        fontSize={"16px"}
                                        cursor={"pointer"}
                                        justify={"space-between"}
                                        _hover={{ bg: "#fff", color: "var(--primary)" }}
                                        bg={selectedCurChannel._id == channel._id ? "#fff" : "none"}
                                        color={selectedCurChannel._id === channel._id ? "var(--primary)" : "#fff"}
                                    >
                                        <HStack gap={2} onClick={() => handleSelectChannel(channel._id)}>
                                            <Text>#</Text>
                                            <Text>{channel.name}</Text>
                                        </HStack>
                                        <HStack gap={1} pt={1} display={channel.creator === auth._id ? "flex" : "none"}>
                                            <Icon onClick={() => handleEdit(channel._id)}>{icons.edit}</Icon>
                                            <Icon onClick={() => handleDelete(channel._id)}>{icons.delete}</Icon>
                                        </HStack>
                                    </HStack>
                                );
                            })}
                    </VStack>
                    <HStack
                        gap={1}
                        w={"100%"}
                        rounded={4}
                        p={"2px 8px"}
                        cursor={"pointer"}
                        onClick={handleShowCreateModal}
                        _hover={{ bg: "#fff", color: "var(--primary)" }}
                    >
                        <Icon fontSize={"20px"} pt={"4px"}>
                            {icons.plus}
                        </Icon>
                        <Text>Add Channels</Text>
                    </HStack>
                </VStack>
                <VStack w={"100%"} gap={1}>
                    <HStack
                        gap={1}
                        w={"100%"}
                        rounded={4}
                        p={"2px 8px"}
                        cursor={"pointer"}
                        onClick={handleShowDm}
                        _hover={{ bg: "#fff", color: "var(--primary)" }}
                    >
                        <Icon fontSize={"20px"} pt={"3px"}>
                            {showDm ? icons.caretDown : icons.caretRight}
                        </Icon>
                        <Text>Direct Messages</Text>
                    </HStack>
                    <VStack w={"100%"} gap={1} display={showDm ? "flex" : "none"}>
                        {allDms &&
                            allDms.map((dm) => {
                                return dm.members.map((member) => {
                                    if (member._id !== auth._id) {
                                        return allUsers.map((user, index) => {
                                            if (member._id == user._id)
                                                return (
                                                    <HStack
                                                        py={1}
                                                        gap={4}
                                                        w={"100%"}
                                                        key={index}
                                                        rounded={4}
                                                        p={"2px 8px"}
                                                        cursor={"pointer"}
                                                        justify={"space-between"}
                                                        onClick={() => handleSelectChannel(dm._id)}
                                                        _hover={{ bg: "#fff", color: "var(--primary)" }}
                                                        bg={selectedCurChannel._id == dm._id ? "#fff" : "none"}
                                                        color={selectedCurChannel._id === dm._id ? "var(--primary)" : "#fff"}
                                                    >
                                                        <HStack gap={2}>
                                                            <BadgeAvatar
                                                                width={"28px"}
                                                                height={"28px"}
                                                                src={user.avatar}
                                                                status={user.status * 1}
                                                            />
                                                            <Text>{user.username}</Text>
                                                        </HStack>
                                                        <Icon
                                                            pt={1}
                                                            fontSize={"18px"}
                                                            onClick={() => handleDelete(dm._id)}
                                                            display={user._id == auth._id ? "flex" : "nones"}
                                                        >
                                                            {icons.delete}
                                                        </Icon>
                                                    </HStack>
                                                );
                                        });
                                    }
                                });
                            })}
                    </VStack>
                    <HStack
                        gap={1}
                        w={"100%"}
                        rounded={4}
                        p={"2px 8px"}
                        cursor={"pointer"}
                        onClick={handleShowCreateDMModal}
                        _hover={{ bg: "#fff", color: "var(--primary)" }}
                    >
                        <Icon fontSize={"20px"} pt={"4px"}>
                            {icons.plus}
                        </Icon>
                        <Text>Invite People</Text>
                    </HStack>
                </VStack>
            </VStack>
            {showDMModal && <CreateDM open={showDMModal} setOpen={setShowDMModal} />}
            {showCreateModal && <CreateChannel open={showCreateModal} setOpen={setShowCreateModal} curChannel={selectedChannel} />}
        </VStack>
    );
};

export default SideBar;
