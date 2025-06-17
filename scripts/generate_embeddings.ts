import { GoogleGenerativeAI } from '@google/generative-ai';
import { MongoClient } from 'mongodb';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
import * as dotenv from 'dotenv';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = 'climate_agent';
const COLLECTION_NAME = 'climate_articles';

if (!GEMINI_API_KEY || !MONGO_URI) {
  throw new Error('Missing GEMINI_API_KEY or MONGO_URI in .env.local');
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'embedding-001' });

const client = new MongoClient(MONGO_URI);

async function generateAndStoreEmbeddings() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Clear existing documents to avoid duplicates on re-runs
    await collection.deleteMany({});
    console.log('Cleared existing documents in the collection.');

    const dataPath = path.resolve(__dirname, '../data/climate_news_dataset.json');
    const fileContent = await fs.readFile(dataPath, 'utf-8');
    const articles = JSON.parse(fileContent);

    console.log(`Found ${articles.length} articles to process.`);

    for (const article of articles) {
      const textToEmbed = `${article.title}: ${article.summary}`;
      
      console.log(`Generating embedding for: "${article.title}"...`);
      const result = await model.embedContent(textToEmbed);
      const embedding = result.embedding.values;

      const documentToInsert = {
        ...article,
        embedding,
        createdAt: new Date(),
      };

      await collection.insertOne(documentToInsert);
      console.log(`Successfully inserted "${article.title}" with its embedding.`);
    }

    console.log('\nAll articles have been processed and stored with embeddings.');

    // Optional: Create a vector search index
    console.log('\nCreating a vector search index...');
    const indexName = 'vector_index';
    const existingIndexes = await collection.listIndexes().toArray();
    if (!existingIndexes.some(idx => idx.name === indexName)) {
      await db.command({
        createIndexes: COLLECTION_NAME,
        indexes: [
          {
            name: indexName,
            key: {
              embedding: 'cosmos.vector',
            },
            cosmosOptions: {
              kind: 'vector-ivf',
              numLists: 1,
              similarity: 'COS',
              dimensions: 768,
            },
          },
        ],
      });
      console.log(`Vector search index "${indexName}" created successfully.`);
    } else {
      console.log(`Index "${indexName}" already exists.`);
    }

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed.');
  }
}

generateAndStoreEmbeddings();
