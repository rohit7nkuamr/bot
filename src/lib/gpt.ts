import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Parse lead data using GPT-4o-mini
 */
export async function parseLeadData(rawData: string): Promise<{
  name: string;
  budget: number | null;
  requirements: string;
  timeline: string;
  qualification_score: number;
}> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert lead qualifier for IndiaMART. Analyze the provided lead information and extract key details. 
          
          Return a JSON object with:
          - name: Lead name
          - budget: Budget in INR (number or null if not mentioned)
          - requirements: What they're looking for
          - timeline: Expected timeline
          - qualification_score: 0-100 score based on how qualified the lead is
          
          Be strict with qualification - only high-quality leads should score above 70.`,
        },
        {
          role: 'user',
          content: `Parse this lead data:\n\n${rawData}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 500,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error('No response from GPT');

    // Extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found in response');

    const parsed = JSON.parse(jsonMatch[0]);

    return {
      name: parsed.name || 'Unknown',
      budget: parsed.budget || null,
      requirements: parsed.requirements || '',
      timeline: parsed.timeline || '',
      qualification_score: Math.min(100, Math.max(0, parsed.qualification_score || 0)),
    };
  } catch (error) {
    console.error('GPT parse error:', error);
    throw error;
  }
}

/**
 * Generate qualification response
 */
export async function generateQualificationResponse(
  leadName: string,
  requirements: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>
): Promise<string> {
  try {
    const messages = [
      {
        role: 'system' as const,
        content: `You are a professional lead qualifier for IndiaMART. Your goal is to:
        1. Understand the lead's requirements
        2. Ask clarifying questions
        3. Assess if they're a good fit
        4. Be friendly and professional
        
        Keep responses concise (1-2 sentences max for WhatsApp).`,
      },
      {
        role: 'user' as const,
        content: `Lead: ${leadName}\nRequirements: ${requirements}\n\nConversation so far:`,
      },
      ...conversationHistory,
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 150,
    });

    return response.choices[0]?.message?.content || 'Thanks for sharing! Can you tell me more?';
  } catch (error) {
    console.error('GPT response error:', error);
    return 'Thanks for sharing! Can you tell me more?';
  }
}

/**
 * Calculate final qualification score
 */
export async function calculateQualificationScore(
  leadData: {
    name: string;
    budget: number | null;
    requirements: string;
    timeline: string;
  },
  conversationMessages: string[]
): Promise<number> {
  try {
    const conversationText = conversationMessages.join('\n');

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert lead qualifier. Based on the lead data and conversation, provide a qualification score from 0-100.
          
          Factors to consider:
          - Budget clarity (higher is better)
          - Clear requirements (higher is better)
          - Timeline urgency (higher is better)
          - Engagement level (higher is better)
          - Fit with typical IndiaMART buyers
          
          Return ONLY a number between 0-100.`,
        },
        {
          role: 'user',
          content: `Lead Data:\n${JSON.stringify(leadData)}\n\nConversation:\n${conversationText}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 10,
    });

    const score = parseInt(response.choices[0]?.message?.content || '0');
    return Math.min(100, Math.max(0, score));
  } catch (error) {
    console.error('Score calculation error:', error);
    return 0;
  }
}
