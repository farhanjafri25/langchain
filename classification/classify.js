import { ChatPromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";
import { model } from "../config/groqConfig.js";

const taggingPrompt = ChatPromptTemplate.fromTemplate(
    `Extract the desired information from the following passage and return it as a structured JSON object by calling the 'extract' function. Ensure the output matches the following schema:
    - sentiment: string (e.g., "positive", "negative", "neutral")
    - aggressiveness: integer (a score from 0 to 10)
    - language: string (e.g., "English", "French", "Spanish")
  
    Passage:
    {input}
    `
  );
  

  const classificationSchema = z.object({
    sentiment: z.string().describe("The sentiment of the passage, e.g., positive, negative, neutral"),
    aggressiveness: z.number().int().describe("A score from 0 to 10 indicating the aggressiveness of the passage"),
    language: z.string().describe("The language of the passage, e.g., English, French, Spanish"),
  });
  

const llmWithStructuredOutput = model.withStructuredOutput(classificationSchema, {
    name: 'extract'
});

const prompt1 = await taggingPrompt.invoke({
    input: "Saale pel ke rkh dunga.",
  });

  const result = await llmWithStructuredOutput.invoke(prompt1);
  console.log(result);
