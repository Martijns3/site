import { Textarea as TextArea1 } from "@chakra-ui/react";

export const TextareaA = ({ ...props }) => {
    return (
        <TextArea1
            border={0}
            bgColor="white"
            color="grey"
            borderRadius="3xl"
            _placeholder={{
                opacity: 1,
                color: "gray.400",
            }}
            {...props}
        />
    );
};
