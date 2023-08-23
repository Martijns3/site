import { Button as Button1 } from "@chakra-ui/react";

export const ButtonA = ({ ...props }) => (
    <Button1
        w={["100px", "100px", "100px", "150px"]}
        border="2px"
        borderColor="purple.500"
        bgColor="purple.200"
        color="purple.900"
        fontSize={[9, 9, 9, 14]}
        {...props}
    >
        {props.children}
    </Button1>
);
