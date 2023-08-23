import { Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Navigation = () => {
    return (
        <Flex
            fontSize={["16px", "16px", "16px", "20px"]}
            gap={8}
            px={[3, 3, 3, 6]}
            py={[2, 2, 2, 4]}
        >
            <Link to="/">Home</Link>
            <Link to="/event/new">Create new event</Link>
        </Flex>
    );
};
