import { useContext } from "react";
import propTypes from "prop-types";

import { VStack } from "@chakra-ui/react";

import MessageView from "src/components/MessageView";
import { SocketContext } from "src/contexts/SocketProvider";

const MainContent = (props) => {
    const { allUsers, selectedChMsg } = useContext(SocketContext);

    return (
        <VStack w={"100%"} flex={"1 1 0"} overflowY={"auto"} gap={2} p={4}>
            {props.status == "Messages" ? (
                selectedChMsg.length &&
                selectedChMsg.map((selectedChMsg, index) => {
                    const curUser = allUsers?.filter((user) => user._id === selectedChMsg.sender)[0];
                    return <MessageView msg={selectedChMsg} key={index} curUser={curUser} />;
                })
            ) : (
                <></>
            )}
        </VStack>
    );
};

MainContent.propTypes = {
    status: propTypes.string.isRequired,
};

export default MainContent;
