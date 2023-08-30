import { Form, useLocation, useNavigate } from "react-router-dom";
import { ButtonA } from "../ui/Button1";
import { eventIO } from "../eventActions";
import { useState, useContext } from "react";
import React from "react";
import { MultiSelect1 } from "../ui/MultiSelect";
import { InputA } from "../ui/Input";
import { Select1 } from "../ui/SingleSelect";
import {
    FormControl,
    FormLabel,
    Flex,
    Text,
    Box,
    Image,
} from "@chakra-ui/react";
import { UsersAndCatContext } from "../../ContextProvider";
import { createStandaloneToast } from "@chakra-ui/react";
import { TextareaA } from "../ui/FormTextArea";

export const editEvent = async (formData) => {
    const { toast } = createStandaloneToast();

    function checkLength(item) {
        return item.length == 0;
    }
    if (Object.values(formData).some(checkLength)) {
        null;
    } else {
        formData.startTime = `${formData.startDate}T${formData.sTime}`;
        formData.endTime = `${formData.endDate}T${formData.eTime}`;
        formData.categoryIds = `[${formData.catIds}]`;
    }
    if (formData.startTime >= formData.endTime) {
        toast({
            title: "End of event must be later than start!",
            status: "warning",
            isClosable: true,
            duration: 3000,
        });
    } else {
        [
            "sTime",
            "eTime",
            "startDate",
            "endDate",
            "catIds",
            "selectedCategories",
        ].forEach((k) => delete formData[k]);

        eventIO(formData, "PUT", formData.id);
        return null;
    }
};
export const EditEvent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let start_time = location.state.start_time;
    let end_time = location.state.end_time;
    if (
        location.state.end_time < location.state.start_time &&
        location.state.startDate == location.state.endDate
    ) {
        end_time = location.state.start_time;
        start_time = location.state.end_time;
    }

    const [formInput, setFormInput] = useState({
        id: location.state.id,
        createdBy: location.state.user,
        title: location.state.title,
        description: location.state.description,
        image: location.state.img,
        selectedCategories: location.state.selectedCategories,
        location: location.state.event_location,
        startDate: location.state.startDate,
        endDate: location.state.endDate,
        sTime: start_time,
        eTime: end_time,
        catIds: "",
    });

    const { categories, users } = useContext(UsersAndCatContext);

    let optionList = [];
    categories.map((category) =>
        optionList.push({ value: category.id, label: category.name })
    );

    let defaultCat = [];
    formInput.selectedCategories.map((category) =>
        defaultCat.push({ value: category.id, label: category.name })
    );

    const [selectedOptions, setSelectedOptions] = useState(defaultCat);

    function handleSelect(data) {
        setSelectedOptions(data);
    }

    let data2 = [];
    try {
        selectedOptions.map((e) => data2.push(e.value));
        formInput.catIds = data2;
    } catch {}

    let imgLinkHeight;
    if (formInput.image.length > 0) {
        imgLinkHeight = Math.ceil(formInput.image.length / 36);
    } else {
        imgLinkHeight = 1;
    }

    return (
        <Flex
            className="edit-event"
            justify={["flex-start", "flex-start", "flex-start", "center"]}
            px={[3, 3, 3, 6]}
        >
            <Flex
                direction="column"
                w={["100%", "100%", "500px", "500px"]}
                mt="-1"
                mb={[2, 2, 2, 2]}
            >
                <Text fontSize={["30px", "34px", "40px"]} mb="1em">
                    Edit event
                </Text>
                <Form
                    onSubmit={(event) => {
                        event.preventDefault();
                    }}
                    method="put"
                    id="edit-event-form"
                >
                    <Flex direction="column" gap="0.5em" mt="-5">
                        <Flex align="center">
                            <FormLabel w="175px">User</FormLabel>
                            <FormControl isRequired>
                                <Select1
                                    mb="0"
                                    color="grey"
                                    name="createdBy"
                                    defaultValue={formInput.createdBy}
                                    onChange={(e) =>
                                        setFormInput({
                                            ...formInput,
                                            createdBy: e.target.value,
                                        })
                                    }
                                >
                                    {users.map((user) => (
                                        <option value={user.id} key={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </Select1>
                            </FormControl>
                        </Flex>
                        <Flex align="center">
                            <FormLabel w="175px">Title</FormLabel>
                            <FormControl isRequired>
                                <InputA
                                    maxLength="20"
                                    defaultValue={formInput.title}
                                    onChange={(e) =>
                                        setFormInput({
                                            ...formInput,
                                            title: e.target.value,
                                        })
                                    }
                                    aria-label="Title"
                                    type="text"
                                    name="title"
                                />
                            </FormControl>
                        </Flex>
                        <Flex>
                            <FormLabel w="175px" pt={2}>
                                Description
                            </FormLabel>
                            <FormControl isRequired>
                                <TextareaA
                                    name="description"
                                    aria-label="Body"
                                    maxLength="44"
                                    rows={2}
                                    defaultValue={formInput.description}
                                    onChange={(e) =>
                                        setFormInput({
                                            ...formInput,
                                            description: e.target.value,
                                        })
                                    }
                                />
                            </FormControl>
                        </Flex>
                        <Flex>
                            <FormLabel pt={2} w="175px">
                                Link to image
                            </FormLabel>

                            <FormControl isRequired>
                                <TextareaA
                                    type="url"
                                    name="image"
                                    rows={imgLinkHeight}
                                    defaultValue={formInput.image}
                                    onChange={(e) =>
                                        setFormInput({
                                            ...formInput,
                                            image: e.target.value,
                                        })
                                    }
                                />
                            </FormControl>
                        </Flex>

                        <Flex paddingTop="0.5em" paddingBottom="0.5em">
                            <FormLabel w="128px" pt={2}>
                                Image preview
                            </FormLabel>
                            <Box width="200px" height="150px">
                                <Image
                                    boxSize="100%"
                                    objectFit="cover"
                                    borderRadius="3xl"
                                    src={formInput.image}
                                />
                            </Box>
                        </Flex>

                        <Flex align="center">
                            <FormLabel w="175px">Category</FormLabel>

                            <MultiSelect1
                                required="true"
                                name="category_list"
                                isMulti
                                value={selectedOptions}
                                onChange={handleSelect}
                                options={optionList}
                                placeholder="Select categories"
                                allowCustomValue="true"
                            />
                        </Flex>
                        <Flex>
                            <FormLabel w="175px" pt={2}>
                                Location
                            </FormLabel>
                            <FormControl isRequired>
                                <TextareaA
                                    maxLength="50"
                                    name="location"
                                    aria-label="text"
                                    rows="2"
                                    defaultValue={formInput.location}
                                    onChange={(e) =>
                                        setFormInput({
                                            ...formInput,
                                            location: e.target.value,
                                        })
                                    }
                                />
                            </FormControl>
                        </Flex>
                        <Flex align="center">
                            <FormLabel w="175px">Start Date</FormLabel>
                            <FormControl isRequired>
                                <InputA
                                    type="date"
                                    name="startDate"
                                    defaultValue={formInput.startDate}
                                    onChange={(e) =>
                                        setFormInput({
                                            ...formInput,
                                            startDate: e.target.value,
                                        })
                                    }
                                />
                            </FormControl>
                        </Flex>
                        <Flex align="center">
                            <FormLabel w="175px">Start time</FormLabel>
                            <FormControl isRequired>
                                <InputA
                                    type="time"
                                    name="sTime"
                                    defaultValue={formInput.sTime}
                                    onChange={(e) =>
                                        setFormInput({
                                            ...formInput,
                                            sTime: e.target.value,
                                        })
                                    }
                                />
                            </FormControl>
                        </Flex>
                        <Flex align="center">
                            <FormLabel w="175px">End date</FormLabel>
                            <FormControl isRequired>
                                <InputA
                                    type="date"
                                    name="endDate"
                                    defaultValue={formInput.endDate}
                                    onChange={(e) =>
                                        setFormInput({
                                            ...formInput,
                                            endDate: e.target.value,
                                        })
                                    }
                                />
                            </FormControl>
                        </Flex>
                        <Flex align="center">
                            <FormLabel w="175px">End time</FormLabel>
                            <FormControl isRequired>
                                <InputA
                                    type="time"
                                    name="eTime"
                                    defaultValue={formInput.eTime}
                                    onChange={(e) =>
                                        setFormInput({
                                            ...formInput,
                                            eTime: e.target.value,
                                        })
                                    }
                                />
                            </FormControl>
                        </Flex>
                        <Flex mt="5" gap="2">
                            <ButtonA
                                type="submit"
                                onClick={() => {
                                    editEvent(formInput);
                                }}
                                borderColor="green.500"
                                bgColor="green.200"
                                color="green.900"
                            >
                                Save
                            </ButtonA>
                            <ButtonA
                                borderColor="gray.500"
                                bgColor="gray.200"
                                color="gray.900"
                                type="submit"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </ButtonA>
                        </Flex>
                    </Flex>
                </Form>
            </Flex>
        </Flex>
    );
};
