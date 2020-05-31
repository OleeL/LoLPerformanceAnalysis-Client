import * as signalR from "@microsoft/signalr";

let connection: signalR.HubConnection | null = null;

const handleConnection = async () => {
    
    if (connection && connection.state === signalR.HubConnectionState.Connected) {
        return true;
    }
    
    try {

        connection = new signalR.HubConnectionBuilder()
            .withUrl(`https://${window?.location?.hostname}:5001/ClientHub`)
            .build();
        
        connection.serverTimeoutInMilliseconds = 100000; // 100 second

        const startSignalRConnection = connection => connection.start()
            .then(() => console.info('Websocket Connection Established'))
            .catch(err => console.error('SignalR Connection Error: ', err));

        // re-establish the connection if connection dropped
        connection.onclose(() => setTimeout(startSignalRConnection(connection), 5000));
        
        await startSignalRConnection(connection);
            
        return true;
    }
    catch {
        return false
    }
}

export const SendRequest = async (funcName: string, parameters: any): Promise<any> => {
    try {
        if (!connection) {
            throw('Could not connect to API');
        }
        if (connection.state !== signalR.HubConnectionState.Connected) {
            return;
        }
        if (connection && connection.state === signalR.HubConnectionState.Connected) {
            const result = await connection.invoke<void>(funcName, ...parameters);
            return result;
        }    
    }
    catch {
        return;
    }
}

export default handleConnection;