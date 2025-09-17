// // import React, { useRef, useState } from "react";
// // import {
// //     ChakraProvider,
// //     Input,
// //     Button,
// //     Modal,
// //     ModalOverlay,
// //     ModalContent,
// //     ModalHeader,
// //     ModalCloseButton,
// //     ModalBody,
// //     ModalFooter,
// //     Text,
// // } from "@chakra-ui/react";

// // const Test = () => {
// //     const inputRef = useRef(null);
// //     const [modalVisible, setModalVisible] = useState(false);
// //     const [cursorPosition, setCursorPosition] = useState(0);

// //     const handleCursorPosition = (e) => {
// //         console.log('%csrc\pages\test\Test.jsx:22 e.key', 'color: #007acc;', e.key);
// //         if (e.key == "@") {
// //             if (inputRef.current) {
// //                 const position = inputRef.current.selectionStart;
// //                 setCursorPosition(position);
// //                 setModalVisible(true);
// //             }
// //         }
// //     };

// //     const closeModal = () => {
// //         setModalVisible(false);
// //     };

// //     return (
// //         // <ChakraProvider>
// //         //     <div style={{ padding: "20px" }}>
// //         //         <Input
// //         //             ref={inputRef}
// //         //             placeholder="Type something here..."
// //         //             /* onClick={handleCursorPosition} */ onKeyUp={handleCursorPosition}
// //         //         />
// //         //         <Modal isOpen={modalVisible} onClose={closeModal}>
// //         //             <ModalOverlay />
// //         //             <ModalContent>
// //         //                 <ModalHeader>Cursor Position</ModalHeader>
// //         //                 <ModalCloseButton />
// //         //                 <ModalBody>
// //         //                     <Text>Current Cursor Position: {cursorPosition}</Text>
// //         //                 </ModalBody>
// //         //                 <ModalFooter>
// //         //                     <Button colorScheme="blue" onClick={closeModal}>
// //         //                         Close
// //         //                     </Button>
// //         //                 </ModalFooter>
// //         //             </ModalContent>
// //         //         </Modal>
// //         //     </div>
// //         // </ChakraProvider>

// //     );
// // };

// // export default Test;

// // import React, { useState } from 'react';
// // import {
// //     Input,
// //     List,
// //     ListItem,
// //     Box,
// //     VStack,
// //     useDisclosure,
// // } from '@chakra-ui/react';

// // const Autocomplete = () => {
// //     const [inputValue, setInputValue] = useState('');
// //     const [filteredOptions, setFilteredOptions] = useState([]);
// //     const { isOpen, onOpen, onClose } = useDisclosure();

// //     // Sample options for the autocomplete
// //     const options = ['Apple', 'Banana', 'Cherry', 'Date', 'Fig', 'Grape', 'Kiwi'];

// //     const handleInputChange = (event) => {
// //         const value = event.target.value;
// //         setInputValue(value);
// //         if (value) {
// //             const filtered = options.filter(option =>
// //                 option.toLowerCase().includes(value.toLowerCase())
// //             );
// //             setFilteredOptions(filtered);
// //             onOpen();
// //         } else {
// //             setFilteredOptions([]);
// //             onClose();
// //         }
// //     };

// //     const handleOptionClick = (option) => {
// //         setInputValue(option);
// //         setFilteredOptions([]);
// //         onClose();
// //     };

// //     return (
// //         <VStack spacing={4} align="stretch">
// //             <Box>
// //                 <Input
// //                     placeholder="Type to search..."
// //                     value={inputValue}
// //                     onChange={handleInputChange}
// //                 />
// //                 {isOpen && filteredOptions.length > 0 && (
// //                     <List spacing={1} border="1px" borderColor="gray.200" borderRadius="md" mt={1}>
// //                         {filteredOptions.map(option => (
// //                             <ListItem
// //                                 key={option}
// //                                 onClick={() => handleOptionClick(option)}
// //                                 p={2}
// //                                 cursor="pointer"
// //                                 _hover={{ bg: 'gray.100' }}
// //                             >
// //                                 {option}
// //                             </ListItem>
// //                         ))}
// //                     </List>
// //                 )}
// //             </Box>
// //         </VStack>
// //     );
// // };

// // export default Autocomplete;

// import React, { useState } from 'react';
// import {
//     Modal,
//     ModalOverlay,
//     ModalContent,
//     ModalHeader,
//     ModalCloseButton,
//     ModalBody,
//     Input,
//     Button,
//     Box,
//     useDisclosure,
// } from '@chakra-ui/react';

// const App = () => {
//     const { isOpen, onOpen, onClose } = useDisclosure();
//     const [inputValue, setInputValue] = useState('');
//     const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

//     const handleInputChange = (event) => {
//         setInputValue(event.target.value);
//     };

//     const handleKeyUp = (event) => {
//         if (event.key === '@') {
//             // Get the position of the input element
//             const inputElement = event.currentTarget.getBoundingClientRect();
//             setModalPosition({
//                 top: inputElement.bottom + window.scrollY, // Position below the input
//                 left: inputElement.left + window.scrollX, // Align with the left of the input
//             });
//             onOpen();
//         }
//     };

//     return (
//         <Box p={4}>
//             <Input
//                 placeholder="Type something..."
//                 value={inputValue}
//                 onChange={handleInputChange}
//                 onKeyUp={handleKeyUp}
//             />
//             <Modal isOpen={isOpen} onClose={onClose} isCentered={false}>
//                 <ModalOverlay />
//                 <ModalContent position="absolute" top={modalPosition.top} left={modalPosition.left}>
//                     <ModalHeader>Select an option</ModalHeader>
//                     <ModalCloseButton />
//                     <ModalBody>
//                         <Button onClick={() => { setInputValue(inputValue + '@option1'); onClose(); }}>Option 1</Button>
//                         <Button onClick={() => { setInputValue(inputValue + '@option2'); onClose(); }}>Option 2</Button>
//                         <Button onClick={() => { setInputValue(inputValue + '@option3'); onClose(); }}>Option 3</Button>
//                     </ModalBody>
//                 </ModalContent>
//             </Modal>
//         </Box>
//     );
// };

// export default App;

// import React, { useState, useRef } from "react";

// import { Input, List, ListItem, Box, VStack } from "@chakra-ui/react";

// const Autocomplete = () => {
//     const [inputValue, setInputValue] = useState("");
//     const [filteredOptions, setFilteredOptions] = useState([]);
//     const [position, setPosition] = useState({
//         top: 0,
//         left: 0,
//     });
//     const inputRef = useRef(null);

//     const options = ["Alice", "Bob", "Charlie", "David", "Eve"];

//     const handleInputChange = (event) => {
//         const value = event.target.value;
//         setInputValue(value);

//         if (value.endsWith("@")) {
//             // Get the position of the input element
//             if (inputRef.current) {
//                 const rect = inputRef.current.getBoundingClientRect();
//                 setPosition({
//                     top: rect.bottom + window.scrollY, // Position below the input
//                     left: rect.left + window.scrollX, // Align with the left of the input
//                 });
//                 // Filter options based on the input
//                 setFilteredOptions(options);
//             }
//         } else {
//             setFilteredOptions([]);
//             setPosition(null);
//         }
//     };

//     const handleOptionClick = (option) => {
//         const newValue = inputValue.slice(0, inputValue.length - 1) + option + " ";
//         setInputValue(newValue);
//         setFilteredOptions([]);
//         setPosition(null);
//     };

//     return (
//         <VStack spacing={4} align="stretch">
//             <Box>
//                 <Input placeholder="Type something..." value={inputValue} onChange={handleInputChange} ref={inputRef} />
//                 {position && filteredOptions.length > 0 && (
//                     <List
//                         mt={1}
//                         spacing={1}
//                         border="1px"
//                         borderRadius="md"
//                         position="absolute"
//                         borderColor="gray.200"
//                         style={{ top: position.top, left: position.left }}
//                     >
//                         {filteredOptions.map((option) => (
//                             <ListItem
//                                 p={2}
//                                 key={option}
//                                 cursor="pointer"
//                                 _hover={{ bg: "gray.100" }}
//                                 onClick={() => handleOptionClick(option)}
//                             >
//                                 {option}
//                             </ListItem>
//                         ))}
//                     </List>
//                 )}
//             </Box>
//         </VStack>
//     );
// };

// export default Autocomplete;

// src/Signup.js
import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Avatar, useToast } from "@chakra-ui/react";
import axios from "axios";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        avatar: null,
    });

    const toast = useToast();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "avatar") {
            setFormData({ ...formData, avatar: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append("username", formData.username);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("password", formData.password);
        if (formData.avatar) {
            formDataToSend.append("avatar", formData.avatar);
        }

        try {
            const response = await axios.post("/api/signup", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast({
                title: "Signup successful.",
                description: response.data.message,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "An error occurred.",
                description: error.response?.data?.message || "Signup failed.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box maxW="md" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="lg">
            <form onSubmit={handleSubmit}>
                <FormControl isRequired mb={4}>
                    <FormLabel>Username</FormLabel>
                    <Input type="text" name="username" value={formData.username} onChange={handleChange} />
                </FormControl>
                <FormControl isRequired mb={4}>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                </FormControl>
                <FormControl isRequired mb={4}>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" name="password" value={formData.password} onChange={handleChange} />
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel>Avatar</FormLabel>
                    <Input type="file" name="avatar" accept="image/*" onChange={handleChange} />
                    {formData.avatar && <Avatar mt={2} size="lg" src={URL.createObjectURL(formData.avatar)} />}
                </FormControl>
                <Button colorScheme="teal" type="submit">
                    Sign Up
                </Button>
            </form>
        </Box>
    );
};

export default Signup;
