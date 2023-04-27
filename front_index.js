const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

const BOT_MSGS = [
    "Hi, how are you?",
    "Ohh... I can't understand what you trying to say. Sorry!",
    "I like to play games... But I don't know how to play!",
    "Sorry if my answers are not relevant. :))",
    "I feel sleepy! :("
];

// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
const BOT_NAME = "심리 상담 봇";
const PERSON_NAME = "";

let messages = [];

// first message from bot
appendMessage(
    BOT_NAME,
    BOT_IMG,
    "left",
    "안녕하세요. 어떤 고민이 있으신가요? 편하게 말씀하세요."
);

msgerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const msgText = msgerInput.value;
    if (!msgText) return;

    appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
    msgerInput.value = "";

    botResponse();

    console.log(messages);
});

function appendMessage(name, img, side, text) {
    //   Simple solution for small apps
    const msgHTML = `
    <div class="msg ${side}-msg">
        <div class="msg-img" style="background-image: url(${img})"></div>

        <div class="msg-bubble">
        <div class="msg-info">
            <div class="msg-info-name">${name}</div>
            <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text" id="user">${text}</div>
        </div>
    </div>
    `;
    if (name === BOT_NAME) {
        const newMessage = { role: "assistant", content: `${text}` };
        messages.push(newMessage);
    } else {
        const newMessage = { role: "user", content: `${text}` };
        messages.push(newMessage);
    }

    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 500;
}

function botResponse() {
    // const r = random(0, BOT_MSGS.length - 1);
    // const msgText = BOT_MSGS[r];

    fetch("http://localhost:3000", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            messages
        })
    })
        .then((res) => res.json())
        .then((data) => {
            // let newAssistantMessage = {
            //     role: "assistant",
            //     content: `${data.completion.content}`
            // };
            // messages.push(newAssistantMessage);
            const delay = data.completion.content.split(" ").length * 100;
            setTimeout(() => {
                appendMessage(
                    BOT_NAME,
                    BOT_IMG,
                    "left",
                    data.completion.content
                );
            }, delay);
        });
}

// Utils
function get(selector, root = document) {
    return root.querySelector(selector);
}

function formatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();

    return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
