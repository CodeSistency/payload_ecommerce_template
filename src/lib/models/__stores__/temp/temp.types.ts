import { EntityModelType, ExtendsKeyEntityModelType, KeyEntityModelType } from "../..";


export interface ModelTempStoreType {
	data: EntityModelType;

	actions: {
		setModelTemp: <T extends KeyEntityModelType>(
			system: T,
			data: ExtendsKeyEntityModelType<T>[],
		) => void;

		addModelTemp: <T extends KeyEntityModelType>(
			system: T,
			data: ExtendsKeyEntityModelType<T>[],
		) => void;

		createModelTemp: <
			T extends KeyEntityModelType,
			U extends keyof ExtendsKeyEntityModelType<T>,
		>(
			system: T,
			idPropFrom: U,
			id: string | number,
			data: ExtendsKeyEntityModelType<T>,
		) => void;

		deleteModelTemp: <
			T extends KeyEntityModelType,
			U extends keyof ExtendsKeyEntityModelType<T>,
		>(
			system: T,
			idPropFrom: U,
			id: string | number,
		) => void;

		updateModelTemp: <
			T extends KeyEntityModelType,
			U extends keyof ExtendsKeyEntityModelType<T>,
		>(
			system: T,
			idPropFrom: U,
			id: string | number,
			data: ExtendsKeyEntityModelType<T>,
		) => void;

		// Additional checkout actions
		setCheckoutInfo: (info: Record<string, any>) => void;
		loadCheckoutInfo: () => void;
		clearCheckoutInfo: () => void;
	};
}
