import { create } from "zustand";
import { ModelDataStoreType } from "./data.types";
import { initialValues } from "../../__config__";

export const useModelDataStore = create<ModelDataStoreType>((set, get) => ({
	data: { ...initialValues },

	actions: {
		setModelData: (system, data) =>
			set((state) => ({
				data: {
					...state.data,
					[system]: data,
				},
			})),

		createModelData: (system, idPropFrom, id, data) => {
			const createData = get().data[system];

			const newData = {
				[idPropFrom]: id,
				...data,
			};

			const updateData = [...createData, newData];

			set((state) => ({
				data: {
					...state.data,
					[system]: updateData,
				},
			}));
		},

		deleteModelData: (system, idPropFrom, id) => {
			const deleteData = get().data[system];

			const index = deleteData.findIndex(
				(obj) => obj[idPropFrom as keyof typeof obj] === id,
			);

			if (index !== -1) {
				deleteData.splice(index, 1);
			}

			set((state) => ({
				data: {
					...state.data,
					[system]: [...deleteData],
				},
			}));
		},

		updateModelData: (system, idPropFrom, id, data) => {
			console.log("updateModelData", {
				system,
				idPropFrom,
				id,
				data,
			});

			set((state) => {
				const edit = get().data[system].map((obj) => {
					const valid_id = obj[idPropFrom as keyof typeof obj] === id;

					if (!valid_id) return obj;

					return data;
				});

				console.log("edit", edit);

				return {
					data: {
						...state.data,
						[system]: [...edit],
					},
				};
			});
		},

	
	},
}));
