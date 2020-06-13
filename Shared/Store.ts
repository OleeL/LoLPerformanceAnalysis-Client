
import {observable} from 'mobx';
import { ISummoner } from './GameInterfaces';

export const createStore = () => {
    const store = observable({
        connected: false,
        setConnected: (status: boolean) => store.connected = status,
        receivedData: false,
        setReceivedData: (received: boolean) => store.receivedData = received,
        summoner: null as ISummoner,
        region: null as string,
        setSummoner: (summoner: ISummoner, region: string) => {
            const update = {
                summoner: summoner,
                region: region,
                receivedData: true
            }
            Object.assign(store, update);
            console.log(store.summoner);
        }
    });
    
    return store;
};

export type TStore = ReturnType<typeof createStore>;
