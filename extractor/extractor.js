import { z } from "zod";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { model } from "../config/groqConfig.js";

const personSchema = z.object({
    name: z.optional(z.string().describe("The name of the person")),
    hair_colour: z.optional(z.string().describe("The hair colour of the person")),
    heigth_in_meters: z.optional(z.number().describe("The height of the person in meters")),
})

const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", `You are an expert extraction algorithm.
Only extract relevant information from the text.
If you do not know the value of an attribute asked to extract,
return null for the attribute's value.`],
["human", "{text}"]
]);

const structuredllm = model.withStructuredOutput(personSchema);

const prompt = await promptTemplate.invoke({
    text: "Alan Smith is 6 feet tall and has blond hair."
})

const result = await structuredllm.invoke(prompt);
console.log(result);