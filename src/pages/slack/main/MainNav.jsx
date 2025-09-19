import { useContext } from "react";
import propTypes from "prop-types";

import { HStack, Icon, Text } from "@chakra-ui/react";
import icons from "src/constants/icons";

import socketEvents from "src/constants/socketEvents";
import { AuthContext } from "src/contexts/AuthProvider";
import { SocketContext } from "src/contexts/SocketProvider";

const MainNav = (props) => {
    const { auth } = useContext(AuthContext);
    const { socket, status, setStatus } = useContext(SocketContext);

    const handleSetStatus = (state) => {
        setStatus(state);
    };

    return (
        <HStack
            p={2}
            gap={4}
            w={"100%"}
            h={"40px"}
            align={"center"}
            color={"#000"}
            fontSize={"20px"}
            _dark={{ color: "#fff" }}
            boxShadow={props.scroll ? "0px 4px 4px 0px #323232" : "none"}
        >
            <HStack
                gap={1}
                align={"center"}
                w={"fit-content"}
                cursor={"pointer"}
                onClick={() => handleSetStatus("Messages")}
                borderBottom={status == "Messages" ? "2px solid #323232" : "none"}
            >
                <Icon pt={1}>{icons.threads}</Icon>
                <Text>Messages</Text>
            </HStack>
            <HStack
                gap={1}
                align={"center"}
                w={"fit-content"}
                cursor={"pointer"}
                onClick={() => handleSetStatus("Files")}
                borderBottom={status == "Files" ? "2px solid #323232" : "none"}
            >
                <Icon pt={1}>{icons.file}</Icon>
                <Text>Files</Text>
            </HStack>
            <HStack
                gap={1}
                align={"center"}
                w={"fit-content"}
                cursor={"pointer"}
                onClick={() => handleSetStatus("Pined")}
                borderBottom={status == "Pined" ? "2px solid #323232" : "none"}
            >
                <Icon pt={1}>{icons.pinned}</Icon>
                <Text>Pin</Text>
            </HStack>
        </HStack>
    );
};

MainNav.propTypes = {
    scroll: propTypes.bool.isRequired,
};

export default MainNav;
