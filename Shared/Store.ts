
import {observable} from 'mobx';
import { Summoner } from './GameInterfaces';

export const createStore = () => {
    const store = observable({
        connected: false,
        setConnected: (status: boolean) => store.connected = status,
        
        summoner: null as Summoner,
        region: null as string,
        setSummoner: (summoner: Summoner, region: string) => {
            const update = {
                summoner: summoner,
                region: region
            }
            Object.assign(store, update);
            console.log(store.summoner);
        }
    });
    
    return store;
};

export type TStore = ReturnType<typeof createStore>;
