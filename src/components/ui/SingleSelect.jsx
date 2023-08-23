import { Select as SelectA } from "@chakra-ui/react";

export const Select1 = ({ ...props }) => (
    <SelectA
        h="38px"
        border="0"
        mb="3"
        color="purple.500"
        backgroundColor={"white"}
        borderRadius="3xl"
        {...props}
    >
        {props.children}
    </SelectA>
);
