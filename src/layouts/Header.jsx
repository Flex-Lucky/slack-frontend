import { Link } from "react-router-dom";

import { HStack, Icon, Input } from "@chakra-ui/react";
import icons from "src/constants/icons";

const Header = () => {
    return (
        <HStack h={"40px"} w={"full"} align={"center"}>
            <HStack w={"var(--sidebar)"} color={"#fff"} justify={"flex-end"} gap={1} pr={1}>
                <Icon fontSize={"18px"}>{icons.prev}</Icon>
                <Icon fontSize={"18px"}>{icons.next}</Icon>
                <Icon fontSize={"18px"}>{icons.history}</Icon>
            </HStack>
            <HStack flex={"1 1 0"} color={"#fff"} justify={"space-between"} pr={1}>
                <Input
                    w={"80%"}
                    h={"28px"}
                    type={"text"}
                    border={"none"}
                    borderRadius={4}
                    bg={"#6a3f6a"}
                    fontSize={"12px"}
                    fontStyle={"italic"}
                    p={"2px 32px 2px 8px"}
                    _focus={{ border: "none" }}
                    _placeholder={{ color: "#FFF8" }}
                    placeholder={"Search in dogstarcoin..."}
                />
                <Link to={"/service/icons"} target="_blank">
                    <Icon fontSize={"18px"}>{icons.question}</Icon>
                </Link>
            </HStack>
        </HStack>
    );
};

export default Header;
