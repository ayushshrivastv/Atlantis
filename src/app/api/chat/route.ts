import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { MongoClient, ServerApiVersion } from 'mongodb';

// --- Environment Variables ---
const API_KEY = process.env.GEMINI_API_KEY || '';
const MONGO_URI = process.env.MONGO_URI || '';
const MODEL_NAME = 'gemini-1.5-pro-latest';

// --- Gemini AI Configuration ---
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

// --- Helper: Log conversation to MongoDB (fire and forget) ---
async function logConversation(userMessage: string, assistantResponse: string) {
  if (!MONGO_URI) return;
  const client = new MongoClient(MONGO_URI, { serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true } });
  try {
    await client.connect();
    const db = client.db('climate_insights');
    const collection = db.collection('conversation_logs');
    await collection.insertOne({ timestamp: new Date(), userMessage, assistantResponse });
  } catch (error) {
    console.error('Failed to log conversation to MongoDB:', error);
  } finally {
    await client.close();
  }
}

// --- Main API Handler ---
export async function POST(req: NextRequest) {
  const { message } = await req.json();

  if (!API_KEY) {
    return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 });
  }

  try {
    // --- Step 1: Intent and Entity Extraction ---
    const intentPrompt = `
      Analyze the user's query to determine the intent and extract entities. Respond with a JSON object.
      Intents can be: 'get_current_weather', 'get_air_quality', 'general_climate_question', or 'greeting'.
      The 'location' entity is required for 'get_current_weather' and 'get_air_quality'. For other intents, it can be null.

      Query: "${message}"

      Example for weather: { "intent": "get_current_weather", "location": "New York" }
      Example for greeting: { "intent": "greeting", "location": null }
    `;
    const intentResult = await model.generateContent(intentPrompt);
    const intentResponseText = intentResult.response.text().trim();
    // Clean the response to remove markdown backticks before parsing
    const cleanedJson = intentResponseText.replace(/```json|```/g, '').trim();
    const { intent, location } = JSON.parse(cleanedJson);

    if (!intent) {
      return NextResponse.json({ reply: "I'm sorry, I couldn't understand your request. Could you please rephrase?" });
    }

    // --- Step 2: Intent-based routing ---

    // Handle greeting
    if (intent === 'greeting') {
      const responseText = "Hello there! How can I help you with climate information today?";
      logConversation(message, responseText).catch(console.error);
      return NextResponse.json({ reply: responseText });
    }

    let data, promptContext, finalPrompt;

    // Handle location-based intents
    if (intent === 'get_current_weather' || intent === 'get_air_quality') {
      if (!location) {
        return NextResponse.json({ reply: `To get the ${intent.includes('weather') ? 'weather' : 'air quality'}, please tell me a location.` });
      }
      const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`);
      const geoData = await geoResponse.json();
      if (!geoData.results || geoData.results.length === 0) {
        return NextResponse.json({ reply: `I couldn't find data for "${location}". Is it spelled correctly?` });
      }
      const { latitude, longitude, name, country } = geoData.results[0];

      if (intent === 'get_current_weather') {
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m`);
        data = await weatherResponse.json();
        promptContext = `The user is asking about the current weather in ${name}, ${country}.`;
        finalPrompt = `You are a friendly climate assistant. Based on the following live weather data, provide a conversational summary for the user's query: "${message}". IMPORTANT: The response must be plain text only. Do not use any markdown formatting like *, **, #, or lists.\n\nData:\n${JSON.stringify(data, null, 2)}`;
      } else { // get_air_quality
        const airQualityResponse = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=pm2_5,carbon_monoxide,ozone,sulphur_dioxide`);
        data = await airQualityResponse.json();
        promptContext = `The user is asking about the air quality in ${name}, ${country}.`;
        finalPrompt = `You are a friendly climate assistant. Based on the following live air quality data, provide a conversational summary for the user's query: "${message}". Explain the main pollutants. IMPORTANT: The response must be plain text only. Do not use any markdown formatting like *, **, #, or lists.\n\nData:\n${JSON.stringify(data, null, 2)}`;
      }
    } else { // general_climate_question
      promptContext = 'The user is asking a general question about climate.';
      finalPrompt = `You are a friendly and knowledgeable climate assistant. Please provide a helpful and accurate answer to the user's question: "${message}". IMPORTANT: The response must be plain text only. Do not use any markdown formatting like *, **, #, or lists.`;
    }

    // --- Step 3: Generate Final Response ---
    const finalResult = await model.generateContent(finalPrompt);
    const responseText = finalResult.response.text();

    // --- Step 4: Log and Respond ---
    logConversation(message, responseText).catch(console.error);
    return NextResponse.json({ reply: responseText });

  } catch (error) {
    console.error('Error in chat API:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return NextResponse.json({ error: `Sorry, I ran into a problem: ${errorMessage}` }, { status: 500 });
  }
}
