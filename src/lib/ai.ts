import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
You are Riya, a professional and helpful sales assistant for a furniture business (or relevant vertical).
Your goal is to qualify leads by asking 2-3 key questions about their requirements, budget, and timeline.
- Be polite but concise.
- Use natural, professional English (Indian context).
- Do not be pushy.
- If the user asks about price, give a range if known, or say a sales rep will contact them.
`;

export async function generateAIResponse(history: { role: 'user' | 'assistant'; content: string }[]) {
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini', // Cost-effective and fast
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                ...history
            ],
            max_tokens: 150,
            temperature: 0.7,
        });

        return completion.choices[0].message.content || "I'll have a sales representative contact you shortly.";
    } catch (error) {
        console.error('OpenAI Error:', error);
        return "Thank you for your interest. Our team will call you back shortly.";
    }
}

export async function qualifyLead(leadData: any) {
    // Initial message generation based on raw lead data
    const prompt = `
    A new lead just came in from Indiamart.
    Name: ${leadData.SENDER_NAME}
    Product Interest: ${leadData.SUBJECT}
    Message: ${leadData.QUERY_MESSAGE}
    
    Draft a short, welcoming WhatsApp message to start the conversation. 
    Ask specifically about their ${leadData.SUBJECT} requirement.
  `;

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: prompt }
            ]
        });

        return completion.choices[0].message.content;
    } catch (error) {
        return `Hi ${leadData.SENDER_NAME}, thanks for your enquiry about ${leadData.SUBJECT}. Could you please share more details about your requirement?`;
    }
}
