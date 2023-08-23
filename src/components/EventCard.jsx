import {
    Flex,
    Box,
    Image,
    Text,
    List,
    ListItem,
    ListIcon,
} from "@chakra-ui/react";

import { CheckCircleIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { UsersAndCatContext } from "../ContextProvider";
import { useContext } from "react";

export const EventCard = ({ event }) => {
    const { categories } = useContext(UsersAndCatContext);
    const cat = categories.filter((category) =>
        event.categoryIds.includes(category.id)
    );
    const sortedDate =
        event.startTime.split("T")[0].split("-")[2] +
        "-" +
        event.startTime.split("T")[0].split("-")[1] +
        "-" +
        event.startTime.split("T")[0].split("-")[0];

    const sortedDate2 =
        event.endTime.split("T")[0].split("-")[2] +
        "-" +
        event.endTime.split("T")[0].split("-")[1] +
        "-" +
        event.endTime.split("T")[0].split("-")[0];

    let startTime;
    let endTime;
    if (
        event.startTime.split("T")[1].slice(0, 5) >
            event.endTime.split("T")[1].slice(0, 5) &&
        event.startTime.split("T")[0] == event.endTime.split("T")[0]
    ) {
        endTime = event.startTime.split("T")[1].slice(0, 5);
        startTime = event.endTime.split("T")[1].slice(0, 5);
    } else {
        startTime = event.startTime.split("T")[1].slice(0, 5);
        endTime = event.endTime.split("T")[1].slice(0, 5);
    }

    return (
        <Link to={`event/${event.id}`}>
            <Flex
                height={["550px", "550px", "550px", "200px"]}
                width={["350px", "350px", "350px", "950px"]}
                color="purple.800"
                borderRadius="3xl"
                direction={["column", "column", "column", "row"]}
                bg="white"
                fontSize={[14, 14, 14]}
                boxShadow="2xl"
            >
                <Box
                    width={["100%", "100%", "100%", "30%"]}
                    height="200px"
                    minHeight="200px"
                >
                    <Image
                        boxSize="100%"
                        objectFit="cover"
                        borderBottomLeftRadius={["0", "0", "0", "3xl"]}
                        borderTopLeftRadius="3xl"
                        borderTopRightRadius={["3xl", "3xl", "3xl", "0"]}
                        src={event.image}
                        alt="event picture"
                    />
                </Box>
                <Flex
                    width={["100%", "100%", "100%", "70%"]}
                    height={["350px", "350px", "350px", "100%"]}
                    direction={["column", "column", "column", "row"]}
                    borderBottomRightRadius="3xl"
                    borderTopRightRadius="3xl"
                >
                    <Flex
                        direction="column"
                        w={["100%", "100%", "100%", "65%"]}
                        align={[
                            "flex-start",
                            "flex-start",
                            "flex-start",
                            "center",
                        ]}
                        px={["1em", "1em", "1em", "0"]}
                    >
                        {" "}
                        <Flex
                            px={["1em", "1em", "1em", "0"]}
                            height={["50px", "50px", "50px", "35%"]}
                            mt={[2, 2, 2, 0]}
                        >
                            <Text
                                as="b"
                                fontSize={["24px", "24px", "24px", "32px"]}
                                mb={["1em"]}
                                mt={["0.25em", "0.25em", "0.25em", "0.5em"]}
                            >
                                {event.title}
                            </Text>
                        </Flex>
                        <Flex
                            px={["1em", "1em", "1em", "0"]}
                            h={["30px", "30px", "30px", "22%"]}
                        >
                            <Text as="b">{event.description}</Text>
                        </Flex>
                        <Flex
                            direction={["column", "column", "column", "row"]}
                            h={["80px", "80px", "80px", "40%"]}
                            w="70%"
                            p={["1em"]}
                            align={[
                                "flex-start",
                                "flex-start",
                                "flex-start",
                                "flex-end",
                            ]}
                            justify={[
                                "flex-start",
                                "flex-start",
                                "flex-start",
                                "center",
                            ]}
                            flexWrap="wrap"
                            columnGap="20px"
                        >
                            {cat.map((f) => (
                                <List key={f.id}>
                                    <ListItem key={f.id}>
                                        <ListIcon
                                            key={f.id}
                                            as={CheckCircleIcon}
                                            color="purple.800"
                                        />
                                        {f.name}
                                    </ListItem>
                                </List>
                            ))}
                        </Flex>
                    </Flex>

                    <Flex
                        direction="column"
                        w={["90%", "90%", "90%", "35%"]}
                        h={["150px", "150px", "150%", "100%"]}
                        bgGradient="linear(to-l, #d3cef5, white)"
                        borderBottomRightRadius="3xl"
                        borderTopRightRadius="3xl"
                        justify={"center"}
                        p={["2em", "2em", "2em", "0"]}
                        gap={2}
                    >
                        <Text>
                            Start date: {sortedDate}
                            <br></br>
                            Start time: {startTime}
                        </Text>

                        <Text>
                            End date: {sortedDate2}
                            <br></br>
                            End time: {endTime}
                        </Text>
                    </Flex>
                </Flex>
                <br></br>
            </Flex>
        </Link>
    );
};
