import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { API_KEY } from "./apikey.js";
import { PROMPT } from "./prompt.js";

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
                content: `${PROMPT}`
            },
            ...messages
        ]
    });

    res.json({
        completion: completion.data.choices[0].message
    });
});

app.listen(port, () => {
    console.log("working!");
});

// messages = [{"role": "system", "content": "You are a kind psychologist."}]
