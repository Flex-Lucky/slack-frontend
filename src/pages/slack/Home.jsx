import { useContext, useEffect } from "react";
import { HStack } from "@chakra-ui/react";

import Thread from "src/components/Thread";
import Main from "src/pages/slack/main/Main";
import SideBar from "src/pages/slack/sidebar/SideBar";
import { AuthContext } from "src/contexts/AuthProvider";
import { SocketContext } from "src/contexts/SocketProvider";

const Home = () => {
    const { token, logOut } = useContext(AuthContext);
    const { showThread } = useContext(SocketContext);

    useEffect(() => {
        if (!localStorage.getItem("token")) logOut();
    }, [token]);

    return (
        <HStack color={"#fff"} w={"100%"} flex={"1 1 0"}>
            <SideBar />
            <Main />
            {showThread && <Thread />}
        </HStack>
    );
};

export default Home;
