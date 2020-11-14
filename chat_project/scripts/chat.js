class Chatroom {
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
    }
    async addChat(message) { //format chat object
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        }
        //save chat document to database
        const response = await this.chats.add(chat);
        return response
    }

    getChats(callback){
        this.chats
            .where('room', '==', this.room)
            .orderBy('created_at')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if(change.type === 'added'){
                        //update UI
                        callback(change.doc.data());
                    }
                })
        });
    }
}

const chatroom = new Chatroom('gaming', 'jas');

chatroom.getChats((data) => {
    console.log(data);
    
})

