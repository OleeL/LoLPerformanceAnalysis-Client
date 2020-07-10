import * as signalR from "@microsoft/signalr";
import { TStore } from "./Store";
import { OnGameUpdate } from "./SignalRListeners";

export let connection: signalR.HubConnection | null = null;

const handleConnection = async (store: TStore) => {
    
    if (connection && connection.state === signalR.HubConnectionState.Connected) {
        return true;
    }
    
    try {

        connection = new signalR.HubConnectionBuilder()
            .withUrl(`https://${window?.location?.hostname}:5001/ClientHub`)
            .build();
        
        connection.serverTimeoutInMilliseconds = 100000; // 100 second

        const startSignalRConnection = connection => connection.start()
            .then(() => {
                console.info('Websocket Connection Established')
                store.connected = true;
            })
            .catch(err => console.error('SignalR Connection Error: ', err));

        // re-establish the connection if connection dropped
        connection.onclose(() => OnDisconnect(store));
        CreateListeners(store);
        await startSignalRConnection(connection);
            
        return true;
    }
    catch {
        return false
    }
}

const CreateListeners = (store: TStore) => {
    connection.on('PlayerInGame', update => OnGameUpdate(update, store));
}

const OnDisconnect = (store: TStore) => {
    store.connected = false;
    connection = null;
    setTimeout(() => SignalRReconnect(store), 500);
}

export const SignalRReconnect = async (store: TStore) => {
    while (!connection || connection.state !== signalR.HubConnectionState.Connected) {
        console.log("Reconnecting to API");
        await handleConnection(store);
        await Sleep(2000);
    }
}

const Sleep = (durationMs: number) =>
    new Promise((complete) => setTimeout(complete, durationMs));

export const SendRequest = async (funcName: string, parameters: any): Promise<any> => {
    try {
        if (!connection) {
            throw('Could not connect to API');
        }
        if (connection.state !== signalR.HubConnectionState.Connected) {
            return;
        }
        const result = await connection.invoke<void>(funcName, ...parameters);
        return result;
    }
    catch {
        return;
    }
}

export default handleConnection;