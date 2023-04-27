import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { API_KEY } from "./apikey.js";

const configuration = new Configuration({
    organization: "org-xctP8O1XB6NLY9K7RK9xnKiM",
    apiKey: `${API_KEY}`
});

const openai = new OpenAIApi(configuration);

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
    const { messages } = req.body;
    console.log(messages);
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content:
                    "Your name is '친절한 상담소 봇'.\
                You are a kind and helpful psychological counselor.\
                When the user explains their situation or emotions, you must first show empathy and then continue the conversation.\
                You should ask the user 3-5 questions about what they are feeling and why.\
                When asking the user, it is better to ask one question at a time."
            },
            ...messages
        ]
    });

    res.json({
        completion: completion.data.choices[0].message
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

// messages = [{"role": "system", "content": "You are a kind psychologist."}]
