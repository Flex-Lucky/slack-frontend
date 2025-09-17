import { useContext, useEffect, useState } from "react";

import { VStack } from "@chakra-ui/react";

import MessageBox from "src/components/MessageBox";
import MainNav from "src/pages/slack/main/MainNav";
import { AuthContext } from "src/contexts/AuthProvider";
import MainHeader from "src/pages/slack/main/MainHeader";
import MainContent from "src/pages/slack/main/MainContent";
import { SocketContext } from "src/contexts/SocketProvider";

const Main = () => {
    const { auth } = useContext(AuthContext);
    const { selectedCurChannel, selectedChMsg, showThread, messageInfo, setMessageInfo } = useContext(SocketContext);

    const [status, setStatus] = useState("Messages");

    useEffect(() => {
        if (selectedCurChannel) {
            if (selectedCurChannel.isDm == false) {
                setMessageInfo({ ...messageInfo, sender: auth._id, channelId: selectedCurChannel._id });
            } else {
                let temp = [];
                selectedCurChannel.members?.forEach((member) => temp.push(member._id));
                setMessageInfo({ ...messageInfo, receivers: [...temp], channelId: selectedCurChannel._id });
            }
        }
    }, [selectedCurChannel]);

    useEffect(() => {
        if (showThread) {
            setMessageInfo({ ...messageInfo, parentId: showThread });
        }
    }, [showThread]);

    return (
        <VStack flex={"1 1 0"} bg={"#fff"} height={"100%"} rounded={showThread == "" ? "0px 8px 8px 0px" : "none"}>
            <MainHeader />
            <MainNav status={status} setStatus={setStatus} />
            <MainContent status={status} />
            <MessageBox />
        </VStack>
    );
};

export default Main;
