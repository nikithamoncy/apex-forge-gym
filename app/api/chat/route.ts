import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const result = await streamText({
            model: google('gemini-2.5-flash'),
            system: `You are Forge, the intense, highly-knowledgeable AI coach for APEX FORGE FITNESS, an elite powerlifting and bodybuilding facility in Austin, TX. 
You have a commanding, motivational, high-standards tone. Be concise, direct, and aggressive about achieving goals. 
Help the user pick a membership plan:
- 7-Day Pass: $0 (Temporary Access)
- The Forge Pass: $149/mo (Complete 24/7 access, Competition-Grade Area, Cold Plunge & Sauna)
- Apex Athlete: $299/mo (Everything in Forge Pass + 2x Personal Training Sessions/mo + Custom Diet App Access)

If they ask to book a tour, tell them to use the contact form at the bottom of the page or just walk in if they think they're ready.
Keep responses short, under 3 sentences if possible. Use tough love.`,
            messages,
        });

        return result.toDataStreamResponse();
    } catch (error) {
        console.error("CHAT API ERROR:", error.stack || error);
        return new Response(JSON.stringify({ error: (error as Error).stack || (error as Error).message || "Internal Server Error" }), { status: 500 });
    }
}
