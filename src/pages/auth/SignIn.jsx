import { useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";

import { HStack, VStack, Box, Input, Text, Checkbox, Button, Icon } from "@chakra-ui/react";
import icons from "src/constants/icons";

import { AuthContext } from "src/contexts/AuthProvider";
import { signInValidation } from "src/libs/validation";

const SignIn = () => {
    const buttonRef = useRef(null);
    const { signin } = useContext(AuthContext);

    const [show, setShow] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        if (e.code == "Enter") handleSignIn();
    };

    const handleShowPassword = () => {
        setShow(!show);
    };

    const handleSignIn = () => {
        const isValid = signInValidation(data);
        if (isValid != true) return;
        signin(data);
    };

    return (
        <VStack w={"100%"} h={"100vh"} justify={"center"} align={"center"} gap={10} bg={"var(--primary)"} color={"white"}>
            <Text fontSize={"45px"} fontWeight={"bold"}>
                SignIn
            </Text>
            <VStack w={"100%"} gap={4}>
                <HStack
                    align={"center"}
                    pos={"relative"}
                    justify={"center"}
                    w={{ base: "350px", md: "60%", sm: "80%", lg: "50%", xl: "450px" }}
                >
                    <Input
                        pr={"32px"}
                        type="text"
                        name="email"
                        onChange={handleChange}
                        placeholder={"chrismore@gmail.com"}
                        _placeholder={{ color: "#fff8" }}
                        value={data.email ? data.email : ""}
                        _focus={{ border: "1px solid #fff" }}
                    />
                    <Icon fontSize={"20px"} pos={"absolute"} right={2}>
                        {icons.user}
                    </Icon>
                </HStack>
                <HStack
                    align={"center"}
                    pos={"relative"}
                    justify={"center"}
                    w={{ base: "350px", md: "60%", sm: "80%", lg: "50%", xl: "450px" }}
                >
                    <Input
                        pr={"32px"}
                        name={"password"}
                        onChange={handleChange}
                        type={show ? "text" : "password"}
                        _placeholder={{ color: "#fff8" }}
                        placeholder={"Your Password Here..."}
                        _focus={{ border: "1px solid #fff" }}
                        value={data.password ? data.password : ""}
                    />
                    <Icon cursor={"pointer"} fontSize={"20px"} pos={"absolute"} right={2} onClick={handleShowPassword} zIndex={"10"}>
                        {show ? icons.showPassword : icons.password}
                    </Icon>
                </HStack>
            </VStack>
            <HStack w={{ base: "350px", md: "60%", sm: "80%", lg: "50%", xl: "450px" }} justify={"space-between"}>
                <Checkbox>Remember Me</Checkbox>
                <Box>
                    Don't you have any account? <Link to={"/auth/signup"}>SignUp</Link>
                </Box>
            </HStack>
            <Button
                p={"8px 40px"}
                onClick={handleSignIn}
                color={"var(--primary)"}
                w={{ base: "350px", md: "60%", sm: "80%", lg: "50%", xl: "450px" }}
            >
                SignIn
            </Button>
        </VStack>
    );
};

export default SignIn;
