import { Box, Image } from "@chakra-ui/react";
import propTypes from "prop-types";

import Badge from "src/components/Badge";

const BadgeAvatar = (props) => {
    return (
        <Box pos={"relative"} w={props.width ? props.width : "40px"} h={props.height ? props.height : "40px"}>
            <Image rounded={8} src={`${process.env.REACT_APP_BASE_URL}/avatar/${props.src}`} />
            <Badge status={props.status} bottom={"0"} />
        </Box>
    );
};

BadgeAvatar.propTypes = {
    width: propTypes.string,
    height: propTypes.string,
    src: propTypes.string.isRequired,
    status: propTypes.number.isRequired,
};

export default BadgeAvatar;
