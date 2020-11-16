//dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');

//add new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(error => console.log(error))
});

//class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('gaming', 'jas');

//get chats and render
chatroom.getChats(data => chatUI.render(data));