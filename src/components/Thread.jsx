import React, { useContext } from "react";

import { HStack, Icon, Text, VStack } from "@chakra-ui/react";
import icons from "src/constants/icons";

import MessageBox from "src/components/MessageBox";
import MessageView from "src/components/MessageView";
import { SocketContext } from "src/contexts/SocketProvider";

const Thread = () => {
    const { allUsers, setShowThread, selectedThread } = useContext(SocketContext);

    return (
        <VStack w={"34%"} h={"100%"} bg={"#fff"} color={"#000"} rounded={"0px 8px 8px 0px"} boxShadow={"-3px 0px 0px 0px #ccc"}>
            <HStack w={"100%"} justify={"space-between"} p={"8px 16px"} fontSize={"20px"} h={"70px"}>
                <Text>Thread</Text>
                <Icon cursor={"pointer"} onClick={() => setShowThread("")}>
                    {icons.close}
                </Icon>
            </HStack>
            <VStack w={"100%"} maxH={"628px"} overflowY={"auto"} p={"16px 8px"} gap={2}>
                {selectedThread.length > 0 ? (
                    selectedThread.map((thread, index) => {
                        const curUser = allUsers?.filter((user) => user._id === thread.sender)[0];
                        return <MessageView msg={thread} key={index} curUser={curUser} />;
                    })
                ) : (
                    <></>
                )}
            </VStack>
            <MessageBox reftype={"thread"} />
        </VStack>
    );
};

export default Thread;
