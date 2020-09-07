
import create from 'zustand';
import { ISummoner } from './GameInterfaces';

type IStore = {
    connected: boolean;
    setConnected: (status: boolean) => void;
    receivedData: boolean;
    setReceivedData: (status: boolean) => void;
    summoner: ISummoner;
    region: string;
    setSummoner: (summoner: ISummoner, region: string) => void;
}

export const useStore = create<IStore>((set, get) => ({
    connected: false as boolean,
    setConnected: (status: boolean): void => set(({ connected: status })),
    receivedData: false as boolean,
    setReceivedData: (status: boolean): void => set(({ receivedData: status })),
    summoner: null as ISummoner,
    region: null as string,
    setSummoner: (summoner: ISummoner, region: string): void => set(() => ({
        summoner: summoner,
        region: region,
        receivedData: true
    }))
}));