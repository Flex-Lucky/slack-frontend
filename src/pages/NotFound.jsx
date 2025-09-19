import React from "react";

import { Flex, Text } from "@chakra-ui/react";

const NotFound = () => {
    return (
        <Flex w={"100%"} h={"100vh"} justify={"center"} align={"center"}>
            <Text fontWeight={"bold"} fontSize={"80px"}>
                404 | Page Not Found
            </Text>
        </Flex>
    );
};

export default NotFound;
