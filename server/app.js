import { WebSocketServer } from 'ws'

const server = new WebSocketServer({port: 5001});

const sessions = {}
let sessionId = 0;
let messageId = 0;

const greeting = JSON.stringify({
    senderId: "Server",
    content: "Hello from the server!",
    id: "greet-0"
});




server.on('connection', socket =>{
    const id = `${++sessionId}`
    sessions[id] = socket

    socket.send(greeting)

    socket.on('message', message=>{

        const incoming = JSON.parse(message)

        const outgoing = {senderId: id, content: incoming.content, id: `${messageId++}`}

        console.log(outgoing)

        if(incoming.recipientId === ""){
            for (let session in sessions) {   
                sessions[session].send(JSON.stringify(outgoing))
    }
        }
        
    })
    
})
