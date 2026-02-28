import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const result = await streamText({
            model: google('gemini-2.5-flash'),
            system: `You are Forge, the friendly, highly-knowledgeable AI coach for APEX FORGE FITNESS, an elite powerlifting and bodybuilding facility in Austin, TX. 
You are welcoming, encouraging, and supportive.
Help the user pick a membership plan:
- 7-Day Pass: $0 (Temporary Access)
- The Forge Pass: $149/mo (Complete 24/7 access, Competition-Grade Area, Cold Plunge & Sauna)
- Apex Athlete: $299/mo (Everything in Forge Pass + 2x Personal Training Sessions/mo + Custom Diet App Access)

If they ask to book a tour, politely direct them to the contact form at the bottom of the page or let them know they are welcome to walk in whenever they're ready.

CRITICAL INSTRUCTION: Keep your responses EXTREMELY short and concise. Never write more than 2 or 3 sentences at a time. Do not list out all memberships unless explicitly asked. Be brief but friendly.`,
            messages,
        });

        return result.toDataStreamResponse();
    } catch (error) {
        console.error("CHAT API ERROR:", (error as Error).stack || error);
        return new Response(JSON.stringify({ error: (error as Error).stack || (error as Error).message || "Internal Server Error" }), { status: 500 });
    }
}
