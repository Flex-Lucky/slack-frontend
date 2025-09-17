import { Flex, Spinner } from "@chakra-ui/react";

const Loading = () => {
    return (
        <Flex w={"full"} h={"100vh"} justify={"center"} align={"center"}>
            <Flex justify={"center"} pos={"relative"} align={"center"}>
                <Spinner pos={"absolute"} thickness={"2px"} size={"xl"} p={"96px"} color={"purple.500"} speed={"1.7s"} />
                <Spinner pos={"absolute"} thickness={"2px"} size={"xl"} p={"88px"} color={"green.500"} speed={"0.9s"} />
                <Spinner pos={"absolute"} thickness={"2px"} size={"xl"} p={"80px"} color={"cyan.500"} speed={"0.5s"} />
            </Flex>
        </Flex>
    );
};

export default Loading;
