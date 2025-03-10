import { create } from "zustand";
import { ModelTempStoreType } from "./temp.types";
import { initialValues } from "../..";

export const useModelTempStore = create<ModelTempStoreType>((set, get) => ({
	data: initialValues,

	actions: {
		setModelTemp: (system, data) =>
			set((state) => ({
				data: {
					...state.data,
					[system]: data,
				},
			})),

		addModelTemp: (system, data) => {
			set((state) => ({
				data: {
					...state.data,
					[system]: [...state.data[system], ...data],
				},
			}));
		},

		createModelTemp: (system, idPropFrom, id, data) => {
			const createTemp = get().data[system];

			const newTemp = {
				[idPropFrom]: id,
				...data,
			};

			const updateTemp = [...createTemp, newTemp];

			set((state) => ({
				data: {
					...state.data,
					[system]: updateTemp,
				},
			}));
		},

		deleteModelTemp: (system, idPropFrom, id) => {
			const deleteTemp = get().data[system];

			const index = deleteTemp.findIndex(
				(obj) => obj[idPropFrom as keyof typeof obj] === id,
			);

			if (index !== -1) {
				deleteTemp.splice(index, 1);
			}

			set((state) => ({
				data: {
					...state.data,
					[system]: [...deleteTemp],
				},
			}));
		},

		updateModelTemp: (system, idPropFrom, id, data) => {
			const updateTemp = get().data[system];

			const index = updateTemp.findIndex(
				(obj) => obj[idPropFrom as keyof typeof obj] === id,
			);

			if (index !== -1) {
				updateTemp[index] = data;
			}

			set((state) => ({
				data: {
					...state.data,
					[system]: [...updateTemp],
				},
			}));
		},
		

		// We have to fix the types
		// New methods for checkout info
		setCheckoutInfo: (info: any) => {
			set((state) => ({
			  data: { ...state.data, checkoutInfo: info },
			}));
			localStorage.setItem("checkoutInfo", JSON.stringify(info)); // Save to localStorage
		  },
		  loadCheckoutInfo: () => {
			const savedInfo = localStorage.getItem("checkoutInfo");
			if (savedInfo) {
			  set((state) => ({
				data: { ...state.data, checkoutInfo: JSON.parse(savedInfo) },
			  }));
			}
		  },
		  clearCheckoutInfo: () => {
			set((state) => ({
			  data: { ...state.data, checkoutInfo: {} },
			}));
			localStorage.removeItem("checkoutInfo");
		  },
	},
}));
