
import {observable} from 'mobx';

export const createStore = () => {
    const store = observable({
        playerId: "" as string,
        
        setPlayerId: (id: string) => {
            store.playerId = id;
        }
    });
    
    return store;
};

export type TStore = ReturnType<typeof createStore>;
