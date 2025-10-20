import { NextResponse } from "next/server";
import { Client } from "@gradio/client";

interface PredictResponse {
  data: [string] | string[];
  [key: string]: any;
}

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: "Invalid input: text is required" },
        { status: 400 }
      );
    }

    const client = await Client.connect("davidvensilinr/SearchTokenModel");
    const result = await client.predict("/predict", { input_text: text }) as PredictResponse;
    
    // Ensure we have valid response data
    if (!result || !result.data || !Array.isArray(result.data) || result.data.length === 0) {
      throw new Error("Invalid response from model");
    }

    // Log the raw response for debugging
    console.log('Raw model response:', result.data);
    
    // Handle different response formats
    let responseText: string;
    
    if (Array.isArray(result.data)) {
      // If it's an array, join all elements with space
      responseText = result.data.map(String).join(' ');
    } else if (typeof result.data === 'object' && result.data !== null) {
      // If it's an object, try to get the first value
      const firstKey = Object.keys(result.data)[0];
      responseText = String(result.data[firstKey] || '');
    } else {
      // Fallback to string conversion
      responseText = String(result.data || '');
    }
    
    // Clean up and split the response
    const responses = responseText
      .trim()
      .split(/\s+/)  // Split by any whitespace
      .filter(Boolean)
      .slice(0, 3);

    console.log('Processed responses:', responses);
    return NextResponse.json({ responses });
  } catch (error) {
    console.error("Error in /api/predict:", error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "An unknown error occurred"
      },
      { status: 500 }
    );
  }
}
