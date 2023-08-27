import { Server, Socket } from "socket.io"
import { DefaultEventsMap } from "socket.io/dist/typed-events"

type activeUsersType = {
    userId: string,
    socketId: string
}

let activeUsers: activeUsersType[] = []

const socketConfig = (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    
    io.on("connection", (socket) => {

        // Messaging socket 
        console.log("Socket connected ----", socket.id);

        socket.on('new-user-add', (newUserId: string) => {
            if (!activeUsers.some((user) => user.userId === newUserId)) {
                activeUsers.push({ userId: newUserId, socketId: socket.id })
            }
            console.log("Connected users -", activeUsers);
            io.emit('get-users', activeUsers);
        });

        socket.on('send-message', (data) => {
            const { receiverId } = data;
            const user = activeUsers.find((user) => user.userId === receiverId );
            console.log("sending from socket -", receiverId );
            console.log(" data ", data);
            if(user) {
                io.to( user.socketId ).emit("receive-message", data )
            }
        })

        // Video call socket
        socket.emit('me', socket.id);

        socket.on('start-call', ( data ) => {
            console.log("call started - - - -", data )
            io.to(data.userToCall).emit('recieve-call', data )
        })

        // socket.on('answerCall', (data) => {
        //     io.to(data.to).emit('callAccepted', data.signal )
        // })


        socket.on('disconnect', () => {
            activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
            console.log("Users disconnected -", activeUsers);
            io.emit('get-users', activeUsers);
        });
    });
}

export default socketConfig;
