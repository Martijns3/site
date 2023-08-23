import { useState, useContext } from "react";
import { Flex } from "@chakra-ui/react";
import { EventsPage } from "./pages/EventsPage";
import { useLoaderData } from "react-router-dom";
import { Select1 } from "./ui/SingleSelect";
import { UsersAndCatContext } from "../ContextProvider";
import { InputA } from "./ui/Input";

export const loader = async () => {
    const events = await fetch("http://localhost:3000/events");

    return { events: await events.json() };
};

export const EventSearch = () => {
    const { categories } = useContext(UsersAndCatContext);
    const { events } = useLoaderData();
    const [searchField, setSearchField] = useState("");
    const [selectCategory, setSelectCategory] = useState("");

    const handleChange = (event) => {
        setSearchField(event.target.value);
    };

    const filteredCategories = events.filter((event) => {
        if (!selectCategory == "0") {
            return event.categoryIds.includes(Number(selectCategory));
        } else {
            return event.title.includes("");
        }
    });

    const matchedEvents = filteredCategories.filter((event) => {
        return (
            event.title.toLowerCase().includes(searchField.toLowerCase()) ||
            event.description
                .toLowerCase()
                .includes(searchField.toLowerCase()) ||
            String(
                categories
                    .filter((category) =>
                        event.categoryIds.includes(category.id)
                    )
                    .map((category) => category.name.toLowerCase())
            ).includes(searchField.toLowerCase())
        );
    });

    return (
        <>
            <Flex justify="center">
                <Flex
                    w="950px"
                    flexDir={["column", "column", "row"]}
                    py="2em"
                    pb={0}
                    align="center"
                    gap={5}
                >
                    <Flex width="250px">
                        <InputA
                            color="purple.500"
                            changeFn={handleChange}
                            w="250px"
                            mb={["1", "1", "3"]}
                            placeholder="search for events"
                        />
                    </Flex>

                    <Flex width="250px">
                        <Select1
                            name="selectCategory"
                            onChange={(e) => setSelectCategory(e.target.value)}
                        >
                            <option value="">-- all Categories --</option>
                            {categories.map((category) => (
                                <option
                                    style={{ color: "green.200" }}
                                    value={category.id}
                                    key={category.id}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </Select1>
                    </Flex>
                </Flex>
            </Flex>
            <EventsPage matchedEvents={matchedEvents} />
        </>
    );
};
