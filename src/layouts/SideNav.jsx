import { useContext } from "react";

import {
    Box,
    Icon,
    Text,
    VStack,
    HStack,
    Popover,
    PopoverBody,
    PopoverArrow,
    PopoverTrigger,
    PopoverContent,
    PopoverCloseButton,
} from "@chakra-ui/react";

import Badge from "src/components/Badge";
import BadgeAvatar from "src/components/BadgeAvatar";
import socketEvents from "src/constants/socketEvents";
import { sidenav } from "src/layouts/sidenavconstants";
import { AuthContext } from "src/contexts/AuthProvider";
import { SocketContext } from "src/contexts/SocketProvider";

const statusList = [
    { status: -1, displayText: "Logout" },
    { status: 0, displayText: "Busy" },
    { status: 1, displayText: "Active" },
];

const SideNav = () => {
    const { socket } = useContext(SocketContext);
    const { auth, logOut } = useContext(AuthContext);

    const handleChangeStatus = (status) => {
        if (status === -1) logOut();
        socket.emit(`${socketEvents.CHANGESTATUS}`, { id: auth._id, status: status });
    };

    return (
        <VStack w={"72px"} h={"100%"} p={"48px 14px 14px 14px"} justify={"space-between"}>
            <VStack gap={4} w={"full"}>
                {sidenav.map((item, index) => {
                    return (
                        <VStack key={index} w={"full"} color={"#fff"} bg={"transparent"} gap={1}>
                            <Icon fontSize={"20px"} bg={"transparent"}>
                                {item.icon}
                            </Icon>
                            <Text>{item.name}</Text>
                        </VStack>
                    );
                })}
            </VStack>
            <VStack w={"100%"}>
                <Popover>
                    <PopoverTrigger>
                        <Box w={"100%"}>
                            <BadgeAvatar src={auth.avatar ? auth.avatar: "default.gif"} status={auth.status < 2 && auth.status > -2 ? auth.status : -1} />
                        </Box>
                    </PopoverTrigger>
                    <PopoverContent w={"fit-content"}>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                            <VStack w={"120px"} h={"fit-content"} color={"#000"} p={2}  _dark={{ bg: "#fff2", color: "#fff" }}>
                                {statusList.map((item, index) => {
                                    if (item.status !== auth.status) {
                                        return (
                                            <HStack
                                                p={2}
                                                w={"100%"}
                                                key={index}
                                                pos={"relative"}
                                                cursor={"pointer"}
                                                onClick={() => handleChangeStatus(item.status)}
                                            >
                                                <Badge status={item.status} bottom={""} />
                                                <Text>{item.displayText}</Text>
                                            </HStack>
                                        );
                                    }
                                })}
                            </VStack>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </VStack>
        </VStack>
    );
};

export default SideNav;
