import { useContext } from "react";
import { Button, ColorModeContext } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import icons from "src/constants/icons";

const ColorModeButton = () => {
    const { colorMode } = useContext(ColorModeContext);
    const { toggleColorMode } = useColorMode();
    return (
        <Button
            size="50px"
            bg={"none"}
            _hover={{ bg: "none" }}
            _active={{ bg: "none" }}
            onClick={toggleColorMode}
            _focus={{ outline: "none" }}
            transition={"all 0.3s ease"}
        >
            {colorMode == "light" ? icons.dark : icons.light}
        </Button>
    );
};

export default ColorModeButton;
