// import module so that I should use type="module" in html
import config from "./config.mjs";

let chat_area = document.querySelector(".chat-area");
let messsage_area = document.querySelector(".message-area");
let bot_avatar = document.querySelector(".bot-avatar-ball");
let user_avatar = document.querySelector(".user-avatar-ball");
let apiKey = config.apiKey;
let url = config.url;
// temperature for responses
let temperature = 0.7;
// generateCounts: 1, 2, 3, 4, 5 for how many responses you want to generate
let generateCounts = 1;

// connect is the method, header and body of the request
let connect = {
    method: "POST",
    headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [],
        temperature: temperature,
        n: generateCounts,
    }),
};

// add new message to the body
let addNewMessage = (message, role) => {
    // get the previous messages and add new message to it
    let newMessage = { role: role, content: message };
    let previousMessages = JSON.parse(connect["body"])["messages"];
    previousMessages.push(newMessage);
    let newBody = JSON.parse(connect.body);
    newBody["messages"] = previousMessages;
    connect.body = JSON.stringify(newBody);
};

// create send or receive time
let createTimeBlock = () => {
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    if (month < 10) month = "0" + month.toString();
    let date = time.getDate();
    if (date < 10) date = "0" + date.toString();
    let hour = time.getHours();
    if (hour < 10) hour = "0" + hour.toString();
    let minute = time.getMinutes();
    if (minute < 10) minute = "0" + minute.toString();
    let current_time = `${year}/${month}/${date}:${hour}:${minute}`;
    console.log(current_time);

    let timeBlock = document.createElement("div");
    timeBlock.classList.add("timeBlock");
    timeBlock.textContent = current_time;
    return timeBlock;
};

// create message bubble
let createMessageBubble = (message, role) => {
    let roleBox = document.createElement("div");
    roleBox.classList.add("role");
    let messageBubble = document.createElement("div");
    messageBubble.classList.add("message-bubble");
    messageBubble.classList.add(role);
    messageBubble.textContent = message;
    let timeBlock = createTimeBlock();
    if (role === "user") {
        roleBox.appendChild(messageBubble);
        let userIcon = document.createElement("div");
        userIcon.classList.add("user-avatar-ball");
        userIcon.appendChild(timeBlock);
        roleBox.appendChild(userIcon);
    } else {
        let userIcon = document.createElement("div");
        userIcon.classList.add("bot-avatar-ball");
        userIcon.appendChild(timeBlock);
        roleBox.appendChild(userIcon);
        roleBox.appendChild(messageBubble);
    }
    messsage_area.appendChild(roleBox);
    // remove the readonly attribute
    chat_area.value = "";
    chat_area.removeAttribute("readonly");
    // auto scroll to the bottom
    roleBox.scrollIntoView(false);
};

// for debounce function
let chatAreaAfterSend = () => {
    chat_area.value = "Chat-bot is thinking now...";
    chat_area.style.color = "gray";
    chat_area.setAttribute("readonly", "");
};

// send message to openai api and so on
let sendMessages = () => {
    chatAreaAfterSend();
    fetch(url, connect)
        .then((res) => res.json())
        .then((text) => {
            // console.log(JSON.stringify(text, null, 4));
            // console.log(text['choices'][0]['message']);
            let assistant = text["choices"][0]["message"]["content"];
            addNewMessage(assistant, "assistant");
            createMessageBubble(assistant, "assistant");
        });
};

// when user press enter, send message
chat_area.onkeydown = (e) => {
    // console.log("what you press down is", e.code);
    if (e.code !== "Enter") return;
    let userMessages = chat_area.value.trim();
    if (userMessages === "") {
        alert("Please input something");
        return;
    }
    addNewMessage(userMessages, "user");
    // console.log(userMessages);
    createMessageBubble(userMessages, "user");
    sendMessages();
    // let chat area out of focus
    chat_area.blur();
};
