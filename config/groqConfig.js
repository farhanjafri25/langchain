import { ChatGroq } from "@langchain/groq";

const model = new ChatGroq({
    model: 'llama-3.3-70b-versatile',
    temperature: 0,
    apiKey: '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'
})

export { model }