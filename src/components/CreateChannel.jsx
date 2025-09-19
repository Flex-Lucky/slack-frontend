import { useContext, useEffect, useState } from "react";
import propTypes from "prop-types";

import {
    Text,
    Input,
    Modal,
    VStack,
    HStack,
    Button,
    Checkbox,
    ModalBody,
    ModalHeader,
    ModalFooter,
    ModalContent,
    ModalOverlay,
} from "@chakra-ui/react";

import BadgeAvatar from "src/components/BadgeAvatar";
import socketEvents from "src/constants/socketEvents";
import { AuthContext } from "src/contexts/AuthProvider";
import { SocketContext } from "src/contexts/SocketProvider";

const CreateChannel = (props) => {
    const { open, setOpen, curChannel } = props;
    const { auth } = useContext(AuthContext);
    const { socket, allUsers } = useContext(SocketContext);

    const [curC, setCurC] = useState({
        name: "",
        creator: "",
        members: [],
    });

    useEffect(() => {
        if (auth?._id) setCurC({ ...curC, creator: auth._id });
    }, [auth]);

    useEffect(() => {
        if (open == "edit") {
            let temp = [];
            curChannel.members.forEach((member) => temp.push(member._id));
            setCurC({ ...curC, ...curChannel, members: temp });
        } else return;
    }, [open]);

    const handleChange = (e) => {
        setCurC({ ...curC, name: e.target.value });
    };

    const handleSelect = (member) => {
        setCurC({
            ...curC,
            members: curC.members.includes(member) ? curC.members.filter((curMember) => curMember !== member) : [...curC.members, member],
        });
    };

    const handleOk = () => {
        const data = { ...curC, members: curC.members.includes(auth._id) ? curC.members : [...curC.members, auth._id] };
        if (open == "create") {
            socket.emit(socketEvents.CREATECHANNEL, data);
        } else {
            socket.emit(socketEvents.UPDATECHANNEL, data);
        }
        handleClose();
    };

    const handleClose = () => {
        setOpen("");
    };

    return (
        <Modal isOpen={open} isCentered>
            <ModalOverlay />
            <ModalContent bg={"var(--primary)"} color={"#FFF"}>
                <ModalHeader>{open == "create" ? "Create Channel" : "Edit Channel"}</ModalHeader>
                <ModalBody>
                    <Input
                        p={"4px 8px"}
                        _focus={{ border: "1px solid #fff6" }}
                        placeholder={"Insert ChannelName Ex: myChannel"}
                        _placeholder={{ fontStyle: "italic", color: "#fff6" }}
                        value={curC.name ? curC.name : ""}
                        onChange={handleChange}
                    />
                    <VStack maxH={"500px"} minH={"400px"} overflowY={"auto"} p={4} gap={2}>
                        {allUsers &&
                            allUsers.map((user, index) => {
                                if (user._id !== auth._id) {
                                    return (
                                        <Checkbox
                                            py={1}
                                            px={4}
                                            w={"100%"}
                                            key={index}
                                            rounded={8}
                                            _hover={{ bg: "#5c275cff" }}
                                            onChange={() => handleSelect(user._id)}
                                            isChecked={curC.members.includes(user._id)}
                                            bg={curC.members.includes(user._id) ? "#5c275cff" : "none"}
                                        >
                                            <HStack w={"100%"} px={8} gap={2} justify={"space-between"}>
                                                <HStack gap={2}>
                                                    <BadgeAvatar status={user.status} src={user.avatar} />
                                                    <Text>{user.username}</Text>
                                                </HStack>
                                            </HStack>
                                        </Checkbox>
                                    );
                                }
                            })}
                    </VStack>
                </ModalBody>
                <ModalFooter gap={8} color={"var(--primary)"}>
                    <Button onClick={handleOk}>Ok</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

CreateChannel.PropsTypes = {
    open: propTypes.bool.isRequired,
    setOpen: propTypes.func.isRequired,
};

export default CreateChannel;
