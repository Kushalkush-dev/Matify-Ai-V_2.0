
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
      model: "gemini-2.5-flash", 
      config: { 
        systemInstruction: {
          parts: [
            { 
              text:promptWithDetailedSteps

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

  return NextResponse.json(  JSON.parse(text)   , { status: 200 });
   
  } catch (error) {

    console.log("Error in api/calculate", error);

    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    
    
  }

  

}