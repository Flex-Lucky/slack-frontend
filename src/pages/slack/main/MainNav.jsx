import { useContext } from "react";

import { HStack, Icon, Text } from "@chakra-ui/react";
import icons from "src/constants/icons";

import socketEvents from "src/constants/socketEvents";
import { AuthContext } from "src/contexts/AuthProvider";
import { SocketContext } from "src/contexts/SocketProvider";

const MainNav = (props) => {
    const { status, setStatus } = props;
    const { auth } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);

    const handleMessages = (state) => {
        setStatus(state);
    };
    const handleFiles = (state) => {
        setStatus(state);
    };
    const handlePined = (state) => {
        setStatus(state);
        socket.emit(socketEvents.PINNED, auth._id);
    };

    return (
        <HStack w={"100%"} h={"40px"} p={2} color={"#000"} fontSize={"20px"} gap={4} align={"center"}>
            <HStack
                gap={1}
                align={"center"}
                w={"fit-content"}
                cursor={"pointer"}
                onClick={() => handleMessages("Messages")}
                borderBottom={status == "Messages" ? "2px solid black" : "none"}
            >
                <Icon pt={1}>{icons.threads}</Icon>
                <Text>Messages</Text>
            </HStack>
            <HStack
                gap={1}
                align={"center"}
                w={"fit-content"}
                cursor={"pointer"}
                onClick={() => handleFiles("Files")}
                borderBottom={status == "Files" ? "2px solid black" : "none"}
            >
                <Icon pt={1}>{icons.file}</Icon>
                <Text>Files</Text>
            </HStack>
            <HStack
                gap={1}
                align={"center"}
                w={"fit-content"}
                cursor={"pointer"}
                onClick={() => handlePined("Pin")}
                borderBottom={status == "Pin" ? "2px solid black" : "none"}
            >
                <Icon pt={1}>{icons.pinned}</Icon>
                <Text>Pin</Text>
            </HStack>
        </HStack>
    );
};

export default MainNav;
