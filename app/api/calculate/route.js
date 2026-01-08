
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import {promptOne, promptWithDetailedSteps} from "../../_constants/Prompts.ts"

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY, 
});





export async function POST(request) {

  try {

    if(!process.env.GEMINI_API_KEY){
      console.error("GEMINI_API_KEY is not set");
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
    
    const body = await request.json();
    const { image } = body;

    
    if (!image) {
      return NextResponse.json({ message: "Image is required" }, { status: 400 });
    }
    
    const base64image = image.split(",")[1];


const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', 
   
      config: { 
        responseMimeType:"application/json",
        systemInstruction: {
          parts: [
            { 
              text: promptWithDetailedSteps

            }
          ]
        },


},

      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: "image/png",
                data: base64image,
              },
            },
          ],
        },
      ],
    });

  const text = response?.text || response?.candidates?.[0]?.content?.[0]?.text || response?.candidates?.[0]?.text;
  if (!text) {
    console.error("No text found in GenAI response:", response);
    return NextResponse.json({ message: "Error generating AI response" }, { status: 500 });
  }

  try {
    if(text){
      let parsedResponse;
      try {
        parsedResponse = JSON.parse(text);
      } catch (e) {
        // If JSON parsing fails, try to extract and fix the JSON
        console.error("Initial JSON parse failed, attempting to sanitize:", e.message);
        // Return the raw text as-is since it's already in the correct format
        parsedResponse = JSON.parse(text);
      }
      return NextResponse.json(parsedResponse, { status: 200 });
    }

  } catch (parseError) {

    try {
      parsedResponse=JSON.parse(text)
      
    } catch (error) {
      
      console.error("Error parsing AI response as JSON:", text, parseError);
      return NextResponse.json({ message: "Invalid response format from AI model" }, { status: 500 });
    }

  }
   
  } catch (error) {

    console.log("Error in api/calculate", error);
 // Handle API overload (503) errors specifically
    if (error.status === 503 || error.code === 'UNAVAILABLE') {

      

      return NextResponse.json(
        { message: "The AI model is currently overloaded. Please try again in a moment." },
        { status: 503 }
      );
    }

    // Handle authentication errors
    if (error.status === 401 || error.code === 'UNAUTHENTICATED') {
      return NextResponse.json(
        { message: "Authentication failed. Please check your API key." },
        { status: 401 }
      );
    }

    // Handle quota exceeded errors
    if (error.status === 429 || error.code === 'RESOURCE_EXHAUSTED') {
      return NextResponse.json(
        { message: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    
    
  }

  

}