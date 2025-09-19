import { useContext, useEffect, useState } from "react";

import { VStack, HStack, Image, Box, Text, Wrap, Flex } from "@chakra-ui/react";

import MessageView from "src/components/MessageView";
import { SocketContext } from "src/contexts/SocketProvider";
import icons from "src/constants/icons";

const MainContent = () => {
    const { allUsers, selectedChMsg, status } = useContext(SocketContext);

    const [files, setFiles] = useState([]);
    const [pins, setPins] = useState([]);

    useEffect(() => {
        if (selectedChMsg.length) {
            setFiles(selectedChMsg.map((msg) => msg.files));
            setPins(selectedChMsg.filter((msg) => msg.isPined.length != 0));
        }
    }, [selectedChMsg]);

    return (
        <>
            {status == "Messages" ? (
                selectedChMsg.length ? (
                    <VStack w={"100%"} _dark={{ color: "#fff" }} flex={"1 1 0"} overflowY={"auto"} gap={2} p={4}>
                        {selectedChMsg.map((msg, index) => {
                            const curUser = allUsers?.filter((user) => user._id === msg.sender)[0];
                            return <MessageView msg={msg} key={index} curUser={curUser} />;
                        })}
                    </VStack>
                ) : (
                    <VStack w={"100%"} _dark={{ color: "#fff" }} flex={"1 1 0"} overflowY={"auto"} gap={2} p={4}></VStack>
                )
            ) : status == "Files" ? (
                files.length && (
                    <HStack
                        p={4}
                        gap={4}
                        w={"100%"}
                        wrap={"wrap"}
                        flex={"1 1 0"}
                        overflow={"auto"}
                        align={"flex-start"}
                        minH={"calc(100% - 280px)"}
                    >
                        <HStack wrap={"wrap"} justify={"center"} gap={4}>
                            {files.map((file) => {
                                return file.map((f, i) => {
                                    return (
                                        <Flex flexWrap={"wrap"} key={i} w={"100px"} minW={"100px"}>
                                            <Image
                                                src={`${process.env.REACT_APP_BASE_URL}/files/${f.filename}`}
                                                w={"100%"}
                                                h={"100px"}
                                                rounded={8}
                                            />
                                            <HStack fontSize={"14px"} w={"100%"} color={"#000"} justifyContent={"space-between"}>
                                                <Text>{f.originalname}</Text>
                                                <a href={`${process.env.REACT_APP_BASE_URL}/files/donwload/${f.filename}`}>
                                                    {icons.download}
                                                </a>
                                            </HStack>
                                        </Flex>
                                    );
                                });
                            })}
                        </HStack>
                    </HStack>
                )
            ) : status == "Pined" ? (
                pins.length && (
                    <VStack w={"100%"} flex={"1 1 0"} overflowY={"auto"} gap={2} p={4}>
                        {pins.map((pinMsg, index) => {
                            const curUser = allUsers?.filter((user) => user._id == pinMsg.sender)[0];
                            return <MessageView msg={pinMsg} key={index} curUser={curUser} />;
                        })}
                    </VStack>
                )
            ) : null}
        </>
        // <VStack w={"100%"} flex={"1 1 0"} overflowY={"auto"} gap={2} p={4} >
        //     {status == "Messages"
        //         ? selectedChMsg.length &&
        //           selectedChMsg.map((msg, index) => {
        //               const curUser = allUsers?.filter((user) => user._id === msg.sender)[0];
        //               return <MessageView msg={msg} key={index} curUser={curUser} />;
        //           })
        //         : status == "Files"
        // ? files.length &&
        //   files.map((file) => {
        //       return file.map((f, i) => {
        //           return (
        //               <Wrap key={i} w={"100px"}>
        //                   <Image src={`${process.env.REACT_APP_BASE_URL}/files/${f.filename}`} w={"100%"} h={"100px"} rounded={8} />
        //                   <HStack fontSize={"14px"} w={"100%"} color={"#000"} justifyContent={"space-between"}>
        //                     <Text>{f.originalname}</Text>
        //                       <a href={`${process.env.REACT_APP_BASE_URL}/files/donwload/${f.filename}`}>{icons.download}</a>
        //                   </HStack>
        //               </Wrap>
        //           );
        //       });
        //   })
        //         : status == "Pined"
        // ? pins.length &&
        //   pins.map((pinMsg, index) => {
        //       const curUser = allUsers?.filter((user) => user._id == pinMsg.sender)[0];
        //       return <MessageView msg={pinMsg} key={index} curUser={curUser} />;
        //   })
        //         : null}
        // </VStack>
    );
};

export default MainContent;
