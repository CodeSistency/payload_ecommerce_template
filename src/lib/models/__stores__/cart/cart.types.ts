
export interface CartItem {
    productId: string;
    quantity: number;
    price: number;
    title: string;
    image?: string;
  }
  
  export interface EntityCartType {
    cart: CartItem[];
    [key: string]: any;
  }
  
  export type KeyEntityCartType = keyof EntityCartType;
  
  export type ExtendsKeyEntityCartType<T extends KeyEntityCartType> =
    T extends "cart" ? CartItem : any;
  
  export interface ModelCartStoreType {
    data: EntityCartType;
    actions: {
      setModelCart: <T extends KeyEntityCartType>(
        system: T,
        data: ExtendsKeyEntityCartType<T>[]
      ) => void;
      addModelCart: <T extends KeyEntityCartType>(
        system: T,
        data: ExtendsKeyEntityCartType<T>[]
      ) => void;
      createModelCart: <
        T extends KeyEntityCartType,
        U extends keyof ExtendsKeyEntityCartType<T>
      >(
        system: T,
        idPropFrom: U,
        id: string | number,
        data: ExtendsKeyEntityCartType<T>
      ) => void;
      deleteModelCart: <
        T extends KeyEntityCartType,
        U extends keyof ExtendsKeyEntityCartType<T>
      >(
        system: T,
        idPropFrom: U,
        id: string | number
      ) => void;
      updateModelCart: <
        T extends KeyEntityCartType,
        U extends keyof ExtendsKeyEntityCartType<T>
      >(
        system: T,
        idPropFrom: U,
        id: string | number,
        data: ExtendsKeyEntityCartType<T>
      ) => void;
      getCartTotal: () => number;
    };
  }