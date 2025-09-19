import { useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";

import { HStack, VStack, Input, Text, Button, Icon, Avatar } from "@chakra-ui/react";
import icons from "src/constants/icons";

import { AuthContext } from "src/contexts/AuthProvider";
import { signUpValidation } from "src/libs/validation";

const SignUp = () => {
    const fileRef = useRef(null);
    const buttonRef = useRef(null);
    const { signup } = useContext(AuthContext);

    const [show, setShow] = useState(false);
    const [file, setFile] = useState();
    const [data, setData] = useState({
        userInfo: {
            email: "",
            avatar: "",
            password: "",
            username: "",
            status: -1,
        },
        confirm: "",
    });

    const handleChange = (e) => {
        if (e.target.name === "avatar") {
            const newUrl = URL.createObjectURL(e.target.files[0]);
            console.log("%csrcpagesauthSignUp.jsx:28 newUrl", "color: #007acc;", newUrl);
            setFile(e.target.files[0]);
            setData({ ...data, userInfo: { ...data.userInfo, avatar: newUrl } });
        } else if (e.target.name === "confirm") {
            setData({ ...data, confirm: e.target.value });
        } else {
            setData({ ...data, userInfo: { ...data.userInfo, [e.target.name]: e.target.value } });
        }
        if (e.code == "Enter") handleSignUp();
    };

    const handleShowPassword = () => {
        setShow(!show);
    };

    const handleSignUp = () => {
        const isValid = signUpValidation({
            confirm: data.confirm,
            email: data.userInfo.email,
            username: data.userInfo.username,
            password: data.userInfo.password,
        });
        if (isValid != true) return;
        const formData = new FormData();
        formData.append("avatar", file);
        for (const key in data.userInfo) {
            formData.append(key, data.userInfo[key]);
        }
        signup(formData);
    };

    return (
        <VStack w={"100%"} h={"100vh"} justify={"center"} align={"center"} gap={6} bg={"var(--primary)"} color={"white"}>
            <Avatar
                size="xl"
                onClick={() => fileRef.current.click()}
                src={data.userInfo.avatar ? data.userInfo.avatar : `${process.env.REACT_APP_BASE_URL}/avatar/default.gif`}
            />
            <Input ref={fileRef} type="file" name="avatar" onChange={handleChange} hidden />
            <Text fontSize={"45px"} fontWeight={"bold"}>
                SignUp
            </Text>
            <VStack w={"100%"} gap={4}>
                <HStack
                    pos={"relative"}
                    align={"center"}
                    justify={"center"}
                    w={{ base: "350px", md: "60%", sm: "80%", lg: "40%", xl: "450px" }}
                >
                    <Input
                        pr={"32px"}
                        type="text"
                        name="username"
                        onChange={handleChange}
                        placeholder={"ChrisMore"}
                        _placeholder={{ color: "#fff8" }}
                        _focus={{ border: "1px solid #fff" }}
                        value={data.userInfo.username ? data.userInfo.username : ""}
                    />
                    <Icon fontSize={"20px"} pos={"absolute"} right={2}>
                        {icons.user}
                    </Icon>
                </HStack>
                <HStack
                    pos={"relative"}
                    align={"center"}
                    justify={"center"}
                    w={{ base: "350px", md: "60%", sm: "80%", lg: "40%", xl: "450px" }}
                >
                    <Input
                        pr={"32px"}
                        type="text"
                        name="email"
                        onChange={handleChange}
                        _placeholder={{ color: "#fff8" }}
                        placeholder={"chrismore@gmail.com"}
                        _focus={{ border: "1px solid #fff" }}
                        value={data.userInfo.email ? data.userInfo.email : ""}
                    />
                    <Icon fontSize={"20px"} pos={"absolute"} right={2}>
                        {icons.user}
                    </Icon>
                </HStack>
                <HStack
                    pos={"relative"}
                    align={"center"}
                    justify={"center"}
                    w={{ base: "350px", md: "60%", sm: "80%", lg: "40%", xl: "450px" }}
                >
                    <Input
                        pr={"32px"}
                        name="password"
                        onChange={handleChange}
                        type={show ? "text" : "password"}
                        _placeholder={{ color: "#fff8" }}
                        placeholder={"Your Password Here..."}
                        _focus={{ border: "1px solid #fff" }}
                        value={data.userInfo.password ? data.userInfo.password : ""}
                    />
                    <Icon cursor={"pointer"} fontSize={"20px"} pos={"absolute"} right={2} onClick={handleShowPassword} zIndex={"10"}>
                        {show ? icons.showPassword : icons.password}
                    </Icon>
                </HStack>
                <HStack
                    pos={"relative"}
                    align={"center"}
                    justify={"center"}
                    w={{ base: "350px", md: "60%", sm: "80%", lg: "40%", xl: "450px" }}
                >
                    <Input
                        pr={"32px"}
                        name={"confirm"}
                        onChange={handleChange}
                        type={show ? "text" : "password"}
                        _placeholder={{ color: "#fff8" }}
                        placeholder={"Your Confirm Here..."}
                        _focus={{ border: "1px solid #fff" }}
                        value={data.confirm ? data.confirm : ""}
                    />
                    <Icon cursor={"pointer"} fontSize={"20px"} pos={"absolute"} right={2} onClick={handleShowPassword} z={"10"}>
                        {show ? icons.showPassword : icons.password}
                    </Icon>
                </HStack>
            </VStack>
            <Button
                p={"8px 40px"}
                onClick={handleSignUp}
                color={"var(--primary)"}
                w={{ base: "350px", md: "60%", sm: "80%", lg: "40%", xl: "450px" }}
            >
                SignUp
            </Button>
            <HStack w={{ base: "300px", md: "50%", sm: "70%", lg: "30%", xl: "400px" }} justify={"space-between"}>
                <Text>Have already account?</Text>
                <Link to={"/"}>SignIn</Link>
            </HStack>
        </VStack>
    );
};

export default SignUp;
