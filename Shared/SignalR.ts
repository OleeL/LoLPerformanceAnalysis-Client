import * as signalR from "@microsoft/signalr";
import { OnGameUpdate } from "./SignalRListeners";
import { useStore } from "./Store";

export let connection: signalR.HubConnection | null = null;

const handleConnection = async (triggerListener) => {

    
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
            })
            .catch(err => console.error('SignalR Connection Error: ', err));

        // re-establish the connection if connection dropped
        connection.onclose(() => OnDisconnect(triggerListener));
        CreateListeners();
        await startSignalRConnection(connection);
            
        return true;
    }
    catch {
        return false
    }
}

const CreateListeners = () => {
    connection.on('PlayerInGame', update => OnGameUpdate(update));
}

const OnDisconnect = (triggerListener) => {
    connection = null;
    triggerListener(false);
    setTimeout(() => SignalRReconnect(triggerListener), 500);
}

export const SignalRReconnect = async (triggerListener) => {
    while (!connection || connection.state !== signalR.HubConnectionState.Connected) {
        console.log("Reconnecting to API");
        triggerListener(await handleConnection(triggerListener));
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