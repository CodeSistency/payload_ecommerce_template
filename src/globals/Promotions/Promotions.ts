import { GlobalConfig } from "payload";

export const Promotions: GlobalConfig = {
  slug: "promotions",
  access: {
    read: () => true, // Publicly readable
    update: ({ req: { user } }) => user?.role === "admin", // Admin-only updates
  },
  fields: [
    {
      name: "activePromotions",
      type: "array",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "richText",
        },
        {
          name: "bannerImage",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "startDate",
          type: "date",
          required: true,
        },
        {
          name: "endDate",
          type: "date",
          required: true,
        },
        {
          name: "isActive",
          type: "checkbox",
          defaultValue: true,
        },
      ],
    },
  ],
};