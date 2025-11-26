
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

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
  const contents = [{
    inlineData: {
      mimeType: 'image/png',
      data: base64image,
    },
  }]

const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", 
      config: { 
        systemInstruction: {
          parts: [
            { 
              text:`You are a precise handwriting recognition and math solving engine. 
Your task is to transcribe the math problem from the image and append the correct solution.

STRICT OUTPUT RULES:
1. **Format:** Return the [Original Expression] = [Final Answer] in LaTeX.
2. **No Text:** Do not include words like "Solution:", "Answer:", or markdown ticks (\`\`\`). 
3. **LaTeX Only:** The entire output must be a single valid LaTeX string.
4. **Equations:** If the problem asks to solve for a variable (e.g., 2x = 10), use \\Rightarrow or = to show the value of the variable.`

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

  return NextResponse.json({ solution: text }, { status: 200 });
   
  } catch (error) {

    console.log("Error in api/calculate", error);

    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    
    
  }

  

}