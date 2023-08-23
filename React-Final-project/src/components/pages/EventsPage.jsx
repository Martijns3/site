import { Flex } from "@chakra-ui/react";
import { EventCard } from "../EventCard";

export const EventsPage = ({ matchedEvents }) => {
    matchedEvents.sort(function (a, b) {
        var keyA = new Date(a.startTime.split("T")[0]),
            keyB = new Date(b.startTime.split("T")[0]);
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });
    return (
        <Flex
            direction="column"
            align="center"
            // flexWrap="wrap"
            paddingTop={8}
            paddingBottom={6}
            gap={7}
        >
            {matchedEvents.map((event) => {
                return <EventCard event={event} key={event.id} />;
            })}
        </Flex>
    );
};
