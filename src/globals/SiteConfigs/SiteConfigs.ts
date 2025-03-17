import { createColorField } from "@/app/fields/colorPicker/CreateColorPicker";
import { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
    slug: "site-settings",
    access: {
      read: () => true,
      update: ({ req: { user } }) => user?.role === "admin",
    },
    fields: [
      {
        name: "siteName",
        type: "text",
        required: true,
        defaultValue: "E-commerce Template",
      },
      {
        name: "colors",
        type: "group",
        fields: [
          {
            name: "lightMode",
            type: "group",
            fields: [
              createColorField("primary", "Primary", "#000000", "Primary color for light mode"),
              createColorField("secondary", "Secondary", "#666666", "Secondary color for light mode"),
              createColorField("accent", "Accent", "#333333", "Accent color for light mode"),
              createColorField("background", "Background", "#FFFFFF", "Background color for light mode"),
            ],
          },
          {
            name: "darkMode",
            type: "group",
            fields: [
              createColorField("primaryDark", "Primary Dark", "#FFFFFF", "Primary color for dark mode"),
              createColorField("secondaryDark", "Secondary Dark", "#999999", "Secondary color for dark mode"),
              createColorField("accentDark", "Accent Dark", "#CCCCCC", "Accent color for dark mode"),
              createColorField("backgroundDark", "Background Dark", "#000000", "Background color for dark mode"),
            ],
          },
        ],
      },
      {
        name: "favicon",
        type: "upload",
        relationTo: "media",
      },
    ],
  };