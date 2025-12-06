import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Cache for parsed leads (cost optimization)
const parseCache = new Map<string, any>();

/**
 * Parse lead data using GPT-4o-mini with caching
 * COST OPTIMIZATION: Caches results to avoid duplicate API calls
 */
export async function parseLeadData(
  rawData: string,
  plan: 'starter' | 'business' | 'enterprise' = 'starter'
): Promise<{
  name: string;
  budget: number | null;
  requirements: string;
  timeline: string;
  qualification_score: number;
}> {
  try {
    // Check cache first (cost optimization)
    const cacheKey = rawData.substring(0, 100);
    if (parseCache.has(cacheKey)) {
      console.log('Using cached parse result');
      return parseCache.get(cacheKey);
    }

    const isAdvanced = plan === 'business' || plan === 'enterprise';

    const model = isAdvanced ? 'gpt-4-turbo' : 'gpt-4o-mini';

    const systemPrompt = isAdvanced
      ? `You are a world-class sales analyst specializing in the Indian market. Your task is to perform a deep analysis of the provided lead information from IndiaMART. Go beyond keywords and infer the lead's true purchase intent, urgency, and budget capacity based on language, sentiment, and context. Return a detailed JSON object with:
         - name: Lead name (1-2 words)
         - budget: Budget in INR (number or null). Infer if not stated.
         - requirements: A detailed summary of what they need.
         - timeline: Timeline (e.g., 'Immediate', 'Next Quarter').
         - sentiment: 'Positive', 'Neutral', or 'Negative'.
         - purchase_intent: 'High', 'Medium', or 'Low'.
         - qualification_score: A highly accurate 0-100 score based on all factors. Be discerning.`
      : `You are an expert lead qualifier for IndiaMART. Analyze the provided lead information and extract key details CONCISELY. Return a JSON object with:
         - name: Lead name (1-2 words)
         - budget: Budget in INR (number or null)
         - requirements: What they need (1 sentence max)
         - timeline: Timeline (1-2 words)
         - qualification_score: 0-100 score. Be strict - only score above 70 for high-quality leads.`;

    const response = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: `Parse:\n${rawData}`,
        },
      ],
      temperature: 0.2, // Lower temperature = faster, cheaper
      max_tokens: 300, // Reduced from 500 (cost optimization)
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error('No response from GPT');

    // Extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found in response');

    const parsed = JSON.parse(jsonMatch[0]);

    const result = {
      name: parsed.name || 'Unknown',
      budget: parsed.budget || null,
      requirements: parsed.requirements || '',
      timeline: parsed.timeline || '',
      qualification_score: Math.min(100, Math.max(0, parsed.qualification_score || 0)),
    };

    // Cache the result (cost optimization)
    parseCache.set(cacheKey, result);

    return result;
  } catch (error) {
    console.error('GPT parse error:', error);
    throw error;
  }
}

// Pre-defined responses (cost optimization - no API call needed!)
const predefinedResponses: Record<string, string> = {
  greeting: 'Hi! 👋 Thanks for reaching out. What are you looking for?',
  budget: 'Got it! What\'s your budget range?',
  timeline: 'When do you need this?',
  requirements: 'Can you tell me more about your requirements?',
  qualified: 'Great! You seem like a perfect fit. Our team will contact you shortly! 🚀',
  notQualified: 'Thanks for your interest. We\'ll keep your info for future opportunities.',
};

/**
 * Generate qualification response with cost optimization
 * Uses predefined responses when possible to avoid API calls
 */
export async function generateQualificationResponse(
  leadName: string,
  requirements: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>
): Promise<string> {
  try {
    // Cost optimization: Use predefined responses for common scenarios
    if (conversationHistory.length === 0) {
      return predefinedResponses.greeting;
    }

    const lastMessage = conversationHistory[conversationHistory.length - 1]?.content || '';

    // Check for keywords to use predefined responses (cost optimization)
    if (lastMessage.toLowerCase().includes('budget') || lastMessage.toLowerCase().includes('price')) {
      return predefinedResponses.budget;
    }
    if (lastMessage.toLowerCase().includes('when') || lastMessage.toLowerCase().includes('time')) {
      return predefinedResponses.timeline;
    }

    // Only use GPT for complex responses
    const messages = [
      {
        role: 'system' as const,
        content: `You are a lead qualifier. Respond in 1-2 sentences max. Be friendly and professional.`,
      },
      {
        role: 'user' as const,
        content: `Lead: ${leadName}\nRequirements: ${requirements}\nLast message: ${lastMessage}`,
      },
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages as any,
      temperature: 0.5, // Lower = cheaper
      max_tokens: 100, // Reduced from 150
    });

    return response.choices[0]?.message?.content || predefinedResponses.requirements;
  } catch (error) {
    console.error('GPT response error:', error);
    return predefinedResponses.requirements;
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
