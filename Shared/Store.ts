
import {observable} from 'mobx';

export const createStore = () => {
    const store = observable({
        
    });
    
    return store;
};

export type TStore = ReturnType<typeof createStore>;
