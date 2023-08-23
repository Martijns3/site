import { useLoaderData, useNavigate } from "react-router-dom";
import {
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Flex,
    Box,
    Image,
    List,
    ListItem,
    ListIcon,
    Spacer,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useContext } from "react";

import { ButtonA } from "../ui/Button1";
import { eventIO } from "../eventActions";
import { UsersAndCatContext } from "../../ContextProvider";

export const loader = async ({ params }) => {
    const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
    return {
        event: await event.json(),
    };
};
export const action = async (id) => {
    eventIO({}, "DELETE", id);
};

export const EventPage = () => {
    const navigate = useNavigate();
    const { event } = useLoaderData();

    const { categories, users } = useContext(UsersAndCatContext);

    const user = users.filter((user) => event.createdBy == user.id);
    const cat = categories.filter((category) =>
        event.categoryIds.includes(category.id)
    );
    const { isOpen, onOpen, onClose } = useDisclosure();

    const toEdit = () => {
        navigate("/event/edit", {
            state: {
                id: event.id,
                title: event.title,
                description: event.description,
                startDate: event.startTime.split("T")[0],
                endDate: event.endTime.split("T")[0],
                start_time: event.startTime.split("T")[1].slice(0, 5),
                end_time: event.endTime.split("T")[1].slice(0, 5),
                event_location: event.location,
                img: event.image,
                user: user[0].id,
                selectedCategories: cat,
                users: users,
                categories: categories,
            },
        });
    };

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
        startTime = event.endTime.split("T")[1].slice(0, 5);
        endTime = event.startTime.split("T")[1].slice(0, 5);
    } else {
        startTime = event.startTime.split("T")[1].slice(0, 5);
        endTime = event.endTime.split("T")[1].slice(0, 5);
    }

    return (
        <Flex justify="center" align="center">
            <Flex
                className="event-detail"
                width={["350px", "350px", "90%", "45%"]}
                height={["100%", "90%", "100%"]}
                color="purple.800"
                bgColor="whiteAlpha.800"
                borderRadius="12"
                direction="column"
                my={[5, 2, 2, 2]}
                pb={8}
                boxShadow="2xl"
                bg="white"
            >
                {" "}
                <Box width="100%" height={["30vh", "30vh", "35vh"]}>
                    <Image
                        boxSize="100%"
                        objectFit="cover"
                        borderTopRadius="12"
                        src={event.image}
                    />
                </Box>
                <Flex
                    direction="column"
                    w="100%"
                    fontSize={[13, 13, 15]}
                    mt={3}
                >
                    <Flex direction="column" align="center" pb="2em">
                        <Text
                            as="b"
                            pb={[1, 1, 1, 0]}
                            fontSize={["24px", "24px", "24px", "36px"]}
                        >
                            {event.title}
                        </Text>
                        <Text as="i" fontSize={[14, 14, 24]}>
                            {" "}
                            {event.description}
                        </Text>
                    </Flex>
                    <Flex direction={"row"} width="100%" pb="3">
                        <Flex
                            w={["100", "100%", "100%", "50%"]}
                            display="border-box"
                            px={8}
                        >
                            <Text as="b" className="categories">
                                <h2>Categories:</h2>
                            </Text>
                            <Flex
                                direction="column"
                                h="50px"
                                minHeight={["78px", "78px", "90px", "90px"]}
                                wrap="wrap"
                                fontSize={[13, 13, 15, 15]}
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
                            <br></br>
                            <Spacer />
                            <Flex direction="column">
                                <Text as="b"> Created by:</Text>
                                <Box>
                                    {user.map((u) => (
                                        <p key={u.id}>
                                            {u.name}

                                            <Image
                                                mt={3}
                                                style={{
                                                    borderRadius: "100px",
                                                }}
                                                width={[
                                                    "75px",
                                                    "75px",
                                                    "75px",
                                                    "85px",
                                                ]}
                                                src={u.image}
                                            />
                                        </p>
                                    ))}
                                </Box>
                            </Flex>

                            <br />
                        </Flex>
                        <Flex
                            width={["100", "100%", "100%", "50%"]}
                            display="border-box"
                            px={[8, 8, 8, 10]}
                        >
                            <Text as="b">Start date: </Text>
                            <Text> {sortedDate}</Text>
                            <Text as="b">Start time: </Text>
                            <Text> {startTime}</Text>
                            <br></br>
                            <Text as="b">End date: </Text>
                            <Text> {sortedDate2}</Text>

                            <Text as="b">End time: </Text>
                            <Text> {endTime}</Text>
                            <br></br>
                            <Text as="b">Location:</Text>
                            <Text> {event.location} </Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex w="100%" px={8} gap={2}>
                    <ButtonA
                        type="submit"
                        onClick={() => window.location.replace(`/`)}
                    >
                        Back to mainpage
                    </ButtonA>
                    <ButtonA
                        onClick={() => {
                            toEdit();
                        }}
                    >
                        Edit Event
                    </ButtonA>
                    <ButtonA onClick={onOpen}>Delete Event</ButtonA>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Delete Event</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Text>
                                    Are you sure you want to delete this event?
                                </Text>
                            </ModalBody>

                            <ModalFooter>
                                <ButtonA
                                    borderColor="gray.500"
                                    bgColor="gray.200"
                                    color="gray.900"
                                    mr={3}
                                    onClick={onClose}
                                >
                                    Cancel
                                </ButtonA>
                                <ButtonA
                                    borderColor="red.500"
                                    bgColor="red.200"
                                    color="red.900"
                                    variant="ghost"
                                    onClick={() => action(event.id)}
                                >
                                    I'm sure!
                                </ButtonA>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Flex>
            </Flex>
        </Flex>
    );
};
