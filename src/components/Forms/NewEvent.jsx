import { Form } from "react-router-dom";
import { ButtonA } from "../ui/Button1";
import { eventIO } from "../eventActions";
import { useState, useContext } from "react";
import { UsersAndCatContext } from "../../ContextProvider";
import {
    FormControl,
    FormLabel,
    Flex,
    Text,
    Image,
    Box,
} from "@chakra-ui/react";
import { MultiSelect1 } from "../ui/MultiSelect";
import { InputA } from "../ui/Input";
import { Select1 } from "../ui/SingleSelect";
import { createStandaloneToast } from "@chakra-ui/react";
import { TextareaA } from "../ui/FormTextArea";

export const createNewEvent = async ({ request }) => {
    const { toast } = createStandaloneToast();
    const formData = Object.fromEntries(await request.formData());
    formData.startTime = `${formData.startDate}T${formData.sTime}`;
    formData.endTime = `${formData.endDate}T${formData.eTime}`;
    formData.categoryIds = `[${formData.categoryIds}]`;
    if (formData.startTime >= formData.endTime) {
        toast({
            title: "End of event must be later than start!",
            status: "warning",
            isClosable: true,
            duration: 3000,
        });
        return null;
    } else {
        [
            "sTime",
            "eTime",
            "startDate",
            "endDate",
            "category_list",
            "catIds",
        ].forEach((k) => delete formData[k]);

        eventIO(formData, "POST");
        return null;
    }
};

export const NewEvent = () => {
    const { categories, users } = useContext(UsersAndCatContext);

    const [selectedOptions, setSelectedOptions] = useState(null);

    function handleSelect(data) {
        setSelectedOptions(data);
    }

    let selectedCategories = [];
    try {
        selectedOptions.map((e) => selectedCategories.push(e.value));
    } catch {}
    let optionList = [];
    categories.map((category) =>
        optionList.push({ value: category.id, label: category.name })
    );
    const [value, setValue] = useState("/src/utils/field-of-sunflower.jpg");

    let imgLinkHeight;
    if (value.length > 0) {
        imgLinkHeight = Math.ceil(value.length / 36);
    } else {
        imgLinkHeight = 1;
    }
    console.log(value.length, imgLinkHeight);
    return (
        <Flex className="new-event" justify="center">
            <Flex direction="column" w="500px" mt="-1">
                <Text fontSize={["30px", "34px", "40px"]} mb="1em">
                    Create a new event
                </Text>
                <Form method="post" id="new-event-form">
                    <Flex direction="column" gap="0.5em" mt="-5">
                        <Flex align="center">
                            <FormLabel w="175px">User</FormLabel>
                            <FormControl isRequired>
                                <Select1 color="grey" name="createdBy" mb="0">
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
                                    required
                                    placeholder="max. 20 characters"
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
                                    maxLength="44"
                                    name="description"
                                    placeholder="max. 44 characters"
                                    aria-label="Body"
                                    rows="2"
                                />
                            </FormControl>
                        </Flex>
                        <Flex>
                            <FormLabel w="175px" pt={2}>
                                Link to image
                            </FormLabel>
                            <FormControl isRequired>
                                <TextareaA
                                    value={value}
                                    onChange={(event) =>
                                        setValue(event.target.value)
                                    }
                                    type="url"
                                    name="image"
                                    rows={imgLinkHeight}
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
                                    src={value}
                                />
                            </Box>
                        </Flex>

                        {/* onderstaande hidden input gebruik ik om via het form een array met alleen
                    de category ids te sturen die in het menu zijn geselecteerd. 
                    Dit, omdat de selectedOptions state via form submit 
                    alleen de laatst geselecteerde category doorgeeft */}

                        <input
                            type="hidden"
                            name="categoryIds"
                            defaultValue={selectedCategories}
                        ></input>
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
                                setValue="true"
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
                                    placeholder="max. 50 characters"
                                    aria-label="url"
                                    rows="2"
                                />
                            </FormControl>
                        </Flex>
                        <Flex align="center">
                            <FormLabel w="175px">Start date</FormLabel>
                            <FormControl isRequired>
                                <InputA type="date" name="startDate" />
                            </FormControl>
                        </Flex>
                        <Flex align="center">
                            <FormLabel w="175px">Start time</FormLabel>
                            <FormControl isRequired>
                                <InputA type="time" name="sTime" />
                            </FormControl>
                        </Flex>
                        <Flex align="center">
                            <FormLabel w="175px">End date</FormLabel>
                            <FormControl isRequired>
                                <InputA type="date" name="endDate" />
                            </FormControl>
                        </Flex>
                        <Flex align="center">
                            <FormLabel w="175px">End time</FormLabel>
                            <FormControl isRequired>
                                <InputA type="time" name="eTime" />
                            </FormControl>
                        </Flex>

                        <Flex mt="5" gap="2">
                            <ButtonA
                                type="submit"
                                borderColor="green.500"
                                bgColor="green.200"
                                color="green.900"
                            >
                                Save
                            </ButtonA>
                            <ButtonA
                                type="submit"
                                onClick={() => window.location.replace(`/`)}
                                borderColor="gray.500"
                                bgColor="gray.200"
                                color="gray.900"
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
