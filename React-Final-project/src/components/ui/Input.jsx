import { Input as Input1 } from "@chakra-ui/react";

export const InputA = ({ changeFn, ...props }) => {
    return (
        <Input1
            isTruncated
            color="grey"
            borderRadius="3xl"
            backgroundColor={"white"}
            b="0"
            onChange={changeFn}
            _hover={{ borderColor: "purple.300" }}
            _focus={{ border: "0" }}
            _placeholder={{ opacity: 1, color: "gray.400" }}
            {...props}
        ></Input1>
    );
};
