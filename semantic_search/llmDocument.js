import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { MistralAIEmbeddings } from '@langchain/mistralai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';


const loader = new PDFLoader('../Unifize Backend Developer Assignment.pdf');

const docs = await loader.load();

const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
});
const splitDocs = await textSplitter.splitDocuments(docs);
console.log(`splitdocs`,splitDocs, splitDocs.length, docs.length);

const embeddings = new MistralAIEmbeddings({
    modelName: 'mistral-embed',
    apiKey: 'I6tnOfx2rfq7IEPd97NIwi3eY5uBIO8K'
});

const vector1 = await embeddings.embedQuery(splitDocs[0].pageContent);
const vector2 = await embeddings.embedQuery(splitDocs[1].pageContent);
console.assert(vector1.length === vector2.length);
console.log(`Generated vectors of length ${vector1.length}\n`);
console.log(vector1.slice(0, 10));

const vectorStore = new MemoryVectorStore(embeddings)
await vectorStore.addDocuments(splitDocs);
const query = 'How will i create DiscountPrice';
const results = await vectorStore.similaritySearch(query);
console.log(results);
