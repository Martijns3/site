import { FormControl } from "@chakra-ui/react";
import Select from "react-select";

const colourStyles = {
    control: (base) => ({
        ...base,
        borderColor: "#372054",
        borderRadius: "25px",
        padding: "3px",
        display: "flex",
        width: "fit-content",
        border: 0,

        boxshadow: "none",

        color: "red",
    }),
    option: (styles, { isFocused }) => {
        return {
            ...styles,
            backgroundColor: isFocused ? "#c7dafc" : null,
            color: "grey",
            borderRadius: "7px",
        };
    },
};
export const MultiSelect1 = ({ ...props }) => (
    <FormControl isRequired>
        <Select
            className="multiSelect"
            styles={colourStyles}
            theme={(theme) => ({
                ...theme,
                borderRadius: "10px",
            })}
            {...props}
        >
            {" "}
            {props.children}
        </Select>
    </FormControl>
);
