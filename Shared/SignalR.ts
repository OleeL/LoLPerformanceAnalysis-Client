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
        
        await connection.start().then(() => connection.invoke("send", "HelloWorld"));
        
        // connection.on("send", data => {
        //     console.log(data);
        // });
            
        return true;
    }
    catch {
        return false
    }
}

export default handleConnection;