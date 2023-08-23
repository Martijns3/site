import { useRouteError } from "react-router-dom";
import { ButtonA } from "./ui/Button1";
import { Flex, Box, Text } from "@chakra-ui/react";

const ErrorBoundary = () => {
    const error = useRouteError();

    return (
        <Flex
            direction="column"
            w="100vw"
            h="100vh"
            justify="center"
            align="center"
        >
            <Box align="center">
                <Text fontSize="20" color="red">
                    Ooppss...Something went wrong
                </Text>
                <Text>{error?.status}</Text>
                <Text>{error?.message}</Text>
            </Box>
            <br></br>
            <ButtonA
                borderColor="gray.500"
                bgColor="gray.200"
                color="gray.900"
                onClick={() => window.location.replace(`/`)}
            >
                Take me back!
            </ButtonA>
        </Flex>
    );
};

export default ErrorBoundary;
