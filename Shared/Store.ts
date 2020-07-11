
import create from 'zustand';
import { ISummoner } from './GameInterfaces';

export const [useStore] = create (set => ({
    connected: false,
    receivedData: false,
    summoner: null as ISummoner,
    region: null as string,
    setSummoner: (summoner: ISummoner, region: string) => {
        const update = {
            summoner: summoner,
            region: region,
            receivedData: true
        }
        Object.assign(useStore, update);
    }
}));