import i18next from "i18next";
import { z as zod } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import translation from "zod-i18n-map/locales/es/zod.json";

i18next.init({
	lng: "es",
	resources: {
		es: { zod: translation },
	},
});

zod.setErrorMap(zodI18nMap);

export const z = zod;