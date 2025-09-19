import React from "react";

import { Box, Wrap } from "@chakra-ui/react";
import { emoticons } from "src/constants/emoticons";

const Emoticons = (props) => {
    return (
        <Wrap minW={"100%"} h={"100px"} overflowY={"auto"}>
            {emoticons.map((value, index) => {
                return (
                    <Box
                        p={0.5}
                        key={index}
                        id={value.id}
                        cursor={"pointer"}
                        onClick={() => props.handleRecommend(value.icon)}
                        bg={props.msg.emoticons.includes(value.icon) ? "#ddd" : "none"}
                    >
                        {value.icon}
                    </Box>
                );
            })}
        </Wrap>
    );
};

export default Emoticons;
