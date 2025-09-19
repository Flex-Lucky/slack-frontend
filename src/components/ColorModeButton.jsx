import { useContext } from "react";
import { Button, ColorModeContext } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import icons from "src/constants/icons";

const ColorModeButton = () => {
    const { colorMode } = useContext(ColorModeContext);
    const { toggleColorMode } = useColorMode();
    return (
        <Button onClick={toggleColorMode} size="50px" _focus={{outline: "none"}} _dark={{bg:"#fff"}}>
            {colorMode == "light" ? icons.dark : icons.light}
        </Button>
    );
};

export default ColorModeButton;
