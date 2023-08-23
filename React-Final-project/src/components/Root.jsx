import React from "react";
import { Navigation } from "./Navigation";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

export const Root = () => {
    return (
        <Box
            w="100vw"
            direction="column"
            color="white"
            bgGradient="linear(to-b, #9a8ced, purple.100)"
            minHeight="100vh"
        >
            <Navigation />
            <Outlet />
        </Box>
    );
};
