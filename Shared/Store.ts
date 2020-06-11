
import {observable} from 'mobx';
import { Summoner } from './GameInterfaces';

export const createStore = () => {
    const store = observable({
        summoner: {} as Summoner,
        setSummoner: (id: Summoner) => {
            store.summoner = id;
        }
    });
    
    return store;
};

export type TStore = ReturnType<typeof createStore>;
