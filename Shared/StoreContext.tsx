import {useLocalStore} from 'mobx-react-lite';
import React, {createContext, useContext} from 'react';
import {createStore, TStore} from './Store';

const storeContext = createContext<TStore | null>(null);
let store = null as TStore | null;

export const StoreProvider = ({children}) => {
    store = useLocalStore(createStore);
    return (
        <>{children}</>
    );
};

export const useStore = () => {
    if (!store) {
        throw new Error('No context found');
    }
    return store;
};