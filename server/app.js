import { WebSocketServer } from 'ws'

const server = new WebSocketServer({port: 5001});

const sessions = {}
let sessionId = 0;
let messageId = 0;

const greeting = JSON.stringify({
    senderId: "0",
    content: "Hello from the server!",
    id: "greet-0"
});




server.on('connection', socket =>{
    const id = ++sessionId
    sessions[id] = socket

    socket.send(greeting)

    socket.on('message', message=>{

        const msg = JSON.parse(message)
        msg.id = `${++messageId}`
        console.log(msg)

        if(msg.recipientId === ""){
            for (let session in sessions) {
                console.log(sessions[session]);
    
                sessions[session].send(JSON.stringify(msg))
    }
        }
        
    })
    
})
