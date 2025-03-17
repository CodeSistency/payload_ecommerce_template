import { GlobalConfig } from "payload";

export const Header: GlobalConfig = {
  slug: "header",
  access: {
    read: () => true, // Publicly readable
    update: ({ req: { user } }) => user?.role === "admin", // Admin-only updates
  },
  fields: [
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "navLinks",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "type",
          type: "radio",
          options: ["internal", "external"],
          defaultValue: "internal",
        },
        {
          name: "url",
          type: "text",
          required: true,
          admin: {
            condition: (data, siblingData) => siblingData.type === "external",
          },
        },
        {
          name: "reference",
          type: "relationship",
          relationTo: ["products", "categories"],
          admin: {
            condition: (data, siblingData) => siblingData.type === "internal",
          },
        },
      ],
    },
    {
      name: "ctaButton",
      type: "group",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "url",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};