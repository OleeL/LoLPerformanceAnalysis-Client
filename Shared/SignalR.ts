import * as signalR from "@microsoft/signalr";
import { OnGameUpdate } from "./SignalRListeners";
import { _store } from "./Store";

export let connection: signalR.HubConnection | null = null;

const isConnected = () =>
    (connection && connection.state === signalR.HubConnectionState.Connected)

const handleConnection = async () => {

    if (isConnected()) return true;
    
    try {
        connection = new signalR.HubConnectionBuilder()
            .withUrl(`https://${window?.location?.hostname}:5001/ClientHub`)
            .build();
        
        connection.serverTimeoutInMilliseconds = 60000; // 60 seconds

        const startSignalRConnection = connection => connection.start()
            .then(() => {
                console.info('%cConnected to Olangutan Analytics API', "color: green")
            })

        // re-establish the connection if connection dropped
        connection.onclose(() => OnDisconnect());
        CreateListeners();
        await startSignalRConnection(connection);
        return true;
    }
    catch(err) {
        return false;
    }
}

const CreateListeners = () => {
    connection.on('PlayerInGame', update => OnGameUpdate(update));
}

const retryRate: number = 5000;

const OnDisconnect = () => {
    connection = null;
    _store.getState().setConnected(false);
    setTimeout(() => SignalRReconnect(), 1000);
}

export const SignalRReconnect = async () => {
    console.log("%cConnecting to API", "color: green");
    _store.getState.set
    while (!isConnected()) {
        const results = await handleConnection();
        _store.getState().setConnected(results);
        if (!results) {
            await Sleep(retryRate);
            console.log("%cTrying to reconnect to API", "color: yellow");
        }
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