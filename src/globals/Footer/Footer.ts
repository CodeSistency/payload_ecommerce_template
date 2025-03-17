import { GlobalConfig } from "payload";

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: () => true, // Publicly readable
    update: ({ req: { user } }) => user?.role === "admin", // Admin-only updates
  },
  fields: [
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "copyrightText",
      type: "text",
      required: true,
      defaultValue: `© ${new Date().getFullYear()} Your E-commerce Store`,
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
          name: "url",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "socialLinks",
      type: "array",
      fields: [
        {
          name: "platform",
          type: "select",
          options: ["facebook", "twitter", "instagram", "linkedin"],
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