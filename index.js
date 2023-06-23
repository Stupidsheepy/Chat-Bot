// import module so that I should use type="module" in html
import config from './config.js';

let chat_area = document.querySelector('.chat-area');
let messsage_area = document.querySelector('.message-area');
let apiKey = config.apiKey;
let url = config.url;
// temperature for responses
let temperature = 0.7;
// generateCounts: 1, 2, 3, 4, 5 for how many responses you want to generate
let generateCounts = 1;

// connect is the method, header and body of the request
let connect = {
    method: 'POST',
    headers: {
        Authorization: apiKey,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [],
        "temperature": temperature,
        "n": generateCounts,
    })
};

// add new message to the body
let addNewMessage = (message, role) => {
    // get the previous messages and add new message to it
    let newMessage = { "role": role, "content": message };
    let previousMessages = JSON.parse(connect['body'])['messages'];
    previousMessages.push(newMessage);
    let newBody = JSON.parse(connect.body);
    newBody['messages'] = previousMessages;
    connect.body = JSON.stringify(newBody);
}

// create message bubble
let createMessageBubble = (message, role) => {
    let messageBubble = document.createElement('div');
    messageBubble.classList.add('message-bubble');
    messageBubble.classList.add(role);
    messageBubble.textContent = message;
    messsage_area.appendChild(messageBubble);
}


// send message to openai api and so on 
let sendMessages = () => {
    fetch(url, connect)
        .then(res => res.json())
        .then(text => {
            // console.log(JSON.stringify(text, null, 4));
            // console.log(text['choices'][0]['message']);
            let assistant = text['choices'][0]['message']['content'];
            addNewMessage(assistant, 'assistant');
            createMessageBubble(assistant, 'assistant')
        })

}

// when user press enter, send message
chat_area.onkeydown = (e) => {
    // console.log("what you press down is", e.code);
    if (e.code !== 'Enter') return;
    let userMessages = chat_area.value.trim();
    if (userMessages === '') {
        alert('Please input something');
        return;
    }
    addNewMessage(userMessages, 'user')
    // console.log(userMessages);
    createMessageBubble(userMessages, 'user');
    sendMessages();
    chat_area.value = '';
    // let chat area out of focus
    chat_area.blur();
}

// fetch(url, connect)
//     .then(res => res.json())
//     .then(text => {
//         console.log(JSON.stringify(text, null, 4));
//         let assistant = text['choices'][0]['message'];
//         let previousMessages = JSON.parse(connect['body'])['messages'];
//         let anotherMessage = { "role": "user", "content": "And do you know who I am?" }
//         previousMessages.push(assistent);
//         previousMessages.push(anotherMessage);
//         let newBody = JSON.stringify({ "model": "gpt-3.5-turbo", "messages": previousMessages, "temperature": 0.7 });
//         console.log(connect['body']);
//         console.log(previousMessages);
//         connect['body'] = newBody;
//         fetch(url, connect)
//             .then(res => res.json())
//             .then(text => {
//                 console.log(JSON.stringify(text, null, 4));
//             })
//     })
