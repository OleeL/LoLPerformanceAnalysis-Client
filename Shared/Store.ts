
import create from 'zustand';
import { ISummoner } from './GameInterfaces';

export const useStore = create ((set, get) => ({
    connected: false as boolean,
    setConnected: (status: boolean) => set(({connected: status})),
    receivedData: false as boolean,
    setReceivedData: (status: boolean) => set(({receivedData: status})),
    summoner: null as ISummoner,
    region: null as string,
    setSummoner: (summoner: ISummoner, region: string): void => set(() => ({
        summoner: summoner,
        region: region,
        receivedData: true
    }))
}));