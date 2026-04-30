let step = 0;
let userData = {};
let aiMode = false;

const BACKEND_URL = "https://career-ai-31xm.onrender.com/chat"; // 🔴 PUT YOUR LINK HERE

const questions = [
    "Hi! I'm your AI Career Advisor 🤖\nWhat subjects do you enjoy the most?",
    "Great! What are your strengths? (e.g., problem-solving, creativity, communication)",
    "Do you prefer working with people, data, or ideas?",
    "What are your career goals or dreams?"
];

function startChat() {
    let chatbox = document.getElementById("chatbox");
    chatbox.innerHTML += "<p><b>AI:</b> " + questions[0] + "</p>";
}

async function sendMessage() {
    let input = document.getElementById("userInput").value;
    let chatbox = document.getElementById("chatbox");

    if (!input) return;

    chatbox.innerHTML += "<p><b>You:</b> " + input + "</p>";
    document.getElementById("userInput").value = "";

    // 🔵 IF AI MODE IS ON → CALL BACKEND
    if (aiMode) {
        try {
            let response = await fetch(BACKEND_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message: input })
            });

            let data = await response.json();

            chatbox.innerHTML += "<p><b>AI:</b> " + data.reply + "</p>";
            chatbox.scrollTop = chatbox.scrollHeight;

        } catch (error) {
            chatbox.innerHTML += "<p style='color:red;'>Error connecting to AI</p>";
            console.error(error);
        }

        return;
    }

    // 🟢 FAKE AI MODE (default)
    userData["step" + step] = input;
    step++;

    setTimeout(() => {
        let reply = "";

        if (step < questions.length) {
            reply = questions[step];
        } else {
            reply = generateCareer();
        }

        chatbox.innerHTML += "<p><b>AI:</b> " + reply + "</p>";
        chatbox.scrollTop = chatbox.scrollHeight;
    }, 500);
}

function generateCareer() {
    let answers = Object.values(userData).join(" ").toLowerCase();

    if (answers.includes("math") || answers.includes("logic")) {
        return "You seem analytical. Careers like Engineering, Data Science, or Defence services could suit you.";
    } 
    else if (answers.includes("biology")) {
        return "You may enjoy Medicine, Biotechnology, or Research careers.";
    } 
    else if (answers.includes("design") || answers.includes("creative")) {
        return "Creative careers like UI/UX Design, Animation, or Architecture would fit you.";
    } 
    else {
        return "Based on your answers, you should explore multiple domains and discover your strengths further.";
    }
}

function toggleMode() {
    aiMode = !aiMode;
    alert(aiMode ? "AI Mode Activated 🤖 (Backend Connected)" : "Basic Mode Activated");
}

window.onload = startChat;