import { Field } from "payload";
import ColorPicker from "./ColorPicker";

interface ColorFieldAdmin {
    description?: string;
    components: {
        Field: string;
    };
}

export const createColorField = (
    name: string,
    label: string,
    defaultValue: string,
    description?: string
): Field => ({
    name,
    type: "text",
    label,
    defaultValue,
    required: true,
    validate: (val: unknown): true | string => {
        if (typeof val !== "string") {
            return "Invalid value type. Please enter a valid hex color (e.g., #FFFFFF or #FFF)";
        }
        const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        if (!hexRegex.test(val)) {
            return "Please enter a valid hex color (e.g., #FFFFFF or #FFF)";
        }
        return true;
    },
    admin: {
        description,
        components: {
            Field: "@/app/fields/colorPicker/ColorPicker",
        },
    } as ColorFieldAdmin,
});