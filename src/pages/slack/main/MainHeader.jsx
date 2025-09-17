import React, { useContext, useEffect, useState } from "react";
import propTypes from "prop-types";

import { HStack, Text, Icon, Box, Image } from "@chakra-ui/react";
import icons from "src/constants/icons";

import { AuthContext } from "src/contexts/AuthProvider";
import { SocketContext } from "src/contexts/SocketProvider";

const MainHeader = () => {
    const { auth } = useContext(AuthContext);
    const { selectedCurChannel, allUsers } = useContext(SocketContext);

    const [name, setName] = useState("");

    useEffect(() => {
        if (selectedCurChannel) {
            let tmpname;
            tmpname =
                selectedCurChannel &&
                (selectedCurChannel.isDm === false
                    ? selectedCurChannel.name
                    : selectedCurChannel.members
                          ?.filter((v) => v != auth._id)
                          .map((member) => {
                              return allUsers.filter((user) => user._id == member)[0];
                          }));

            typeof tmpname == "string" ? setName(tmpname) : typeof tmpname == "object" && setName(tmpname[0].username);
        }
    }, [selectedCurChannel]);

    return (
        <HStack w={"100%"} h={"60px"} p={4} justify={"space-between"} color={"#000"}>
            <HStack fontWeight={"bold"} gap={1}>
                <Text>#</Text>
                <Text>{name}</Text>
            </HStack>
            <HStack gap={4} align={"center"}>
                <HStack w={"60px"} justify={"space-between"} h={"24px"}>
                    <Box pos={"relative"} w={"48px"} h={"100%"} border={"0.3px solid #0008"}>
                        {selectedCurChannel.members &&
                            allUsers.map((user) => {
                                return selectedCurChannel.members.map((member, index) => {
                                    if (user._id == member) {
                                        if (index < 2) {
                                            const avatar = user._id == member ? user.avatar : "default.gif";
                                            return (
                                                <Image
                                                    top={0}
                                                    w={"24px"}
                                                    h={"24px"}
                                                    rounded={8}
                                                    key={index}
                                                    pos={"absolute"}
                                                    left={index * 5}
                                                    src={`${process.env.REACT_APP_BASE_URL}/avatar/${avatar ? avatar : "default.gif"}`}
                                                />
                                            );
                                        }
                                    }
                                });
                            })}
                    </Box>
                    <Text>{selectedCurChannel.members && selectedCurChannel.members.length}</Text>
                </HStack>
                <Icon fontSize={"20px"} pt={0.5} cursor={"pointer"}>
                    {icons.earphone}
                </Icon>
                <Icon fontSize={"20px"} pt={0.5} cursor={"pointer"}>
                    {icons.more}
                </Icon>
            </HStack>
        </HStack>
    );
};

export default MainHeader;
