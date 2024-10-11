const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const {addNewPost} = require('./postSocket');
const {addNewPending} = require('./collaborationSocket');
const {addNewNotification} = require('./notificationSocket');

const setupWebSocketServer = () => {
    const wss = new WebSocket.Server({ port: 5001 });
    wss.on('connection', (ws, req) => {
        const token = req.url.split('token=')[1].split('%20')[1];
            if (token) {
                jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                    if (err) {
                        console.log('Token verification failed:', err);
                        ws.close();
                        return;
                    }
                ws.userId = decoded.id;
            });
        }
        console.log('Client connected');
        ws.on('message', async (message) => {
            const request = JSON.parse(message);
            const {type, data} = request;
            switch(type) {
                case 'new-post':
                    const newPost = await addNewPost({...data, authorId: ws.userId});
                    if(newPost) {
                        boardCast(wss, type, newPost);
                    }
                    break;
                case 'collaborate-pending':
                    const newPending = await addNewPending({...data, senderId: ws.userId});
                    const notification = {
                        senderId: newPending.senderId,
                        receiverId: newPending.receiverId,
                        type: "CollaborationRequest",
                        isRead: false,
                        message: newPending.message,
                        createdAt: newPending.createdAt
                    };
                    const newNotification = await addNewNotification(notification);
                    if(newPending && newNotification) {
                        broadCastToMe(ws, "collaborate-pending", newPending);
                        broadCastToOther(wss, "receive-collaboration-request", newNotification, newNotification.notification.receiverId);
                    }
                    break;
                default:
                    return;
            }
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });
};

const boardCast = (wss, type, data) => {
    wss.clients.forEach(socket => {
        socket.send(JSON.stringify({type, data}));
    });
};

const broadCastToMe = (ws, type, data) => {
    ws.send(JSON.stringify({type, data}));
}

const broadCastToOther = (wss, type, data, receiverId) => {
    const receiverIdString= receiverId.toString();
    console.log(receiverIdString);
    wss.clients.forEach(socket => {
        if(socket.userId === receiverIdString) {
            console.log("sent");
            socket.send(JSON.stringify({type, data}));
        }
    });
}

module.exports = setupWebSocketServer;