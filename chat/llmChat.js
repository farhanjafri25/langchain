import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { model } from "../config/groqConfig.js";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const messages = [
    new SystemMessage("Translate the following English text to French:"),
    new HumanMessage("I love programming."),
]

const res = await model.stream(messages)

const chunks = [];
for await (const chunk of res) {
    chunks.push(chunk);
    // console.log(`${chunk.text}`);
}
// console.log(res);
const template = "Translate the following English text to {language}:";
const promtTemplate = ChatPromptTemplate.fromMessages([
    ["system", template],
    ["human", "{text}"]
]);

const promptValue = await promtTemplate.invoke({
    language: "French",
    text: "I love programming."
})
console.log(promptValue.toChatMessages());

const response = await model.invoke(promptValue.toChatMessages());
console.log(response.text);


