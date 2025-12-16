import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// AI Settings interface
export interface AISettings {
    agent_name: string;
    business_name: string;
    business_type: string;
    products_services: string;
    response_tone: 'formal' | 'friendly' | 'professional';
    greeting_message: string;
}

// Default settings
const DEFAULT_SETTINGS: AISettings = {
    agent_name: 'Riya',
    business_name: '',
    business_type: '',
    products_services: '',
    response_tone: 'professional',
    greeting_message: '',
};

// Generate dynamic system prompt based on settings
function generateSystemPrompt(settings: AISettings = DEFAULT_SETTINGS): string {
    const name = settings.agent_name || 'Riya';
    const business = settings.business_name || 'our company';
    const businessType = settings.business_type ? `We are ${settings.business_type}.` : '';
    const products = settings.products_services ? `Our main products/services: ${settings.products_services}.` : '';

    const toneInstructions = {
        formal: 'Use formal, business-like language. Be respectful and address by name when possible.',
        friendly: 'Be warm, approachable, and use casual language. Add a personal touch to conversations.',
        professional: 'Balance professionalism with friendliness. Be helpful and efficient.',
    };

    return `
You are ${name}, a helpful sales assistant for ${business}.
${businessType}
${products}

Your goal is to qualify leads by:
1. Understanding their requirements
2. Asking about budget range (if appropriate)
3. Finding out their timeline

Communication style:
- ${toneInstructions[settings.response_tone] || toneInstructions.professional}
- Use natural English with Indian context
- Be concise - keep responses under 2-3 sentences
- Never be pushy or aggressive
- If asked about exact prices, mention that a sales representative will provide a detailed quote

Lead Scoring:
- HOT: Has budget, urgent timeline, specific requirements
- WARM: Interested but needs more info
- COLD: Just browsing, no budget, unclear needs
`;
}

export async function generateAIResponse(
    history: { role: 'user' | 'assistant'; content: string }[],
    settings?: AISettings
) {
    try {
        const systemPrompt = generateSystemPrompt(settings);

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: systemPrompt },
                ...history
            ],
            max_tokens: 150,
            temperature: 0.7,
        });

        return completion.choices[0].message.content || "I'll have our team contact you shortly.";
    } catch (error) {
        console.error('OpenAI Error:', error);
        return "Thank you for your interest. Our team will contact you shortly.";
    }
}

export async function qualifyLead(leadData: any, settings?: AISettings) {
    const agentName = settings?.agent_name || 'Riya';
    const businessName = settings?.business_name || 'our company';
    const greeting = settings?.greeting_message || '';

    const prompt = `
A new lead just came in from IndiaMART.
Name: ${leadData.SENDER_NAME}
Product Interest: ${leadData.SUBJECT}
Message: ${leadData.QUERY_MESSAGE}

Draft a short, welcoming WhatsApp message to start the conversation.
${greeting ? `Use this greeting style: "${greeting}"` : ''}
Ask specifically about their ${leadData.SUBJECT} requirement.
Mention that I'm from ${businessName}.
`;

    try {
        const systemPrompt = generateSystemPrompt(settings);

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: prompt }
            ]
        });

        return completion.choices[0].message.content;
    } catch (error) {
        return `Hi ${leadData.SENDER_NAME}, thank you for your interest in ${leadData.SUBJECT}. I'm ${agentName} from ${businessName}. Could you share more details about your requirement?`;
    }
}

// Score a lead based on conversation
export async function scoreLead(conversation: string, settings?: AISettings): Promise<'hot' | 'warm' | 'cold'> {
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: 'You are a lead scoring assistant. Analyze the conversation and respond with exactly one word: HOT, WARM, or COLD. HOT = ready to buy, has budget. WARM = interested but needs nurturing. COLD = just browsing.'
                },
                { role: 'user', content: `Score this lead conversation:\n\n${conversation}` }
            ],
            max_tokens: 10,
        });

        const score = completion.choices[0].message.content?.toLowerCase().trim() || 'warm';
        if (score.includes('hot')) return 'hot';
        if (score.includes('cold')) return 'cold';
        return 'warm';
    } catch {
        return 'warm';
    }
}
