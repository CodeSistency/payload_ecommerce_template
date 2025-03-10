import { EntityModelType, ExtendsKeyEntityModelType, KeyEntityModelType } from "../../types";


export interface ModelDataStoreType {
	data: EntityModelType;

	actions: {
		setModelData: <T extends KeyEntityModelType>(
			system: T,
			data: ExtendsKeyEntityModelType<T>[],
		) => void;

		createModelData: <
			T extends KeyEntityModelType,
			U extends keyof ExtendsKeyEntityModelType<T>,
		>(
			system: T,
			idPropFrom: U,
			id: string | number,
			data: ExtendsKeyEntityModelType<T>,
		) => void;

		deleteModelData: <
			T extends KeyEntityModelType,
			U extends keyof ExtendsKeyEntityModelType<T>,
		>(
			system: T,
			idPropFrom: U,
			id: string | number,
		) => void;

		updateModelData: <
			T extends KeyEntityModelType,
			U extends keyof ExtendsKeyEntityModelType<T>,
		>(
			system: T,
			idPropFrom: U,
			id: string | number,
			data: ExtendsKeyEntityModelType<T>,
		) => void;

	
	};
}
