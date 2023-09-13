import { Server, Socket } from "socket.io"
import { DefaultEventsMap } from "socket.io/dist/typed-events"

type activeUsersType = {
    userId: string,
    socketId: string
}

let activeUsers: activeUsersType[] = []

const socketConfig = (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    
    io.on("connection", (socket) => {

        socket.on('new-user-add', (newUserId: string) => {
            if (!activeUsers.some((user) => user.userId === newUserId)) {
                activeUsers.push({ userId: newUserId, socketId: socket.id })
            }
            io.emit('get-users', activeUsers);
        });

        socket.on('send-message', (data) => {
            const { receiverId } = data;
            const user = activeUsers.find((user) => user.userId === receiverId );
            if(user) {
                io.to( user.socketId ).emit("receive-message", data )
            }
        })

        // Video call socket
        socket.emit('notification', socket.id);

        socket.on('notification-send ', (data) => {
            const { receiverId } = data;
            const user = activeUsers.find((user) => user.userId === receiverId);
            if (user) {
                io.to(user.socketId).emit("notification-receive", data)
            }
        })

        // socket.on('answerCall', (data) => {
        //     io.to(data.to).emit('callAccepted', data.signal )
        // })


        socket.on('disconnect', () => {
            activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
            io.emit('get-users', activeUsers);
        });
    });
}

export default socketConfig;
