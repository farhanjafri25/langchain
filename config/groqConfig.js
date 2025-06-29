import { ChatGroq } from "@langchain/groq";

const model = new ChatGroq({
    model: 'llama-3.3-70b-versatile',
    temperature: 0,
    apiKey: ''
})

export { model }