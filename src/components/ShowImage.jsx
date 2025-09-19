import React, { useContext } from "react";

import { Modal, ModalOverlay, ModalHeader, ModalContent, HStack, Text, Icon, Image } from "@chakra-ui/react";
import icons from "src/constants/icons";

import { SocketContext } from "src/contexts/SocketProvider";

const ShowImage = (props) => {
    const { showImage, setShowImage } = useContext(SocketContext);

    const handleClose = () => {
        setShowImage("");
    };

    return (
        <Modal isOpen={showImage ? true : false} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <HStack w={"100%"} justifyContent={"space-between"}>
                        <Text>{typeof showImage == "string" ? showImage.name : ""}</Text>
                        <Icon
                            pt={0.5}
                            pl={0.5}
                            rounded={4}
                            fontSize={"20px"}
                            onClick={handleClose}
                            outlineOffset={"3px"}
                            outline={"1px solid #ddd"}
                            _hover={{ outline: "2px solid #009fff" }}
                        >
                            {icons.close}
                        </Icon>
                    </HStack>
                </ModalHeader>
                <Image src={props.path} />
            </ModalContent>
        </Modal>
    );
};

export default ShowImage;
