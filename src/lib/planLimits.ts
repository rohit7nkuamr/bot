// Plan configuration with limits and feature flags
export interface PlanConfig {
    name: string;
    leads: number;
    aiConversations: number;
    features: {
        indiamart: boolean;
        whatsapp: boolean;
        leadScoring: boolean;
        zohoCrm: boolean;
        hubspotCrm: boolean;
        analytics: boolean;
        apiAccess: boolean;
        customAi: boolean;
    };
}

export const PLAN_LIMITS: Record<string, PlanConfig> = {
    starter: {
        name: 'Starter',
        leads: 50,
        aiConversations: 100,
        features: {
            indiamart: false,
            whatsapp: false,
            leadScoring: false,
            zohoCrm: false,
            hubspotCrm: false,
            analytics: false,
            apiAccess: false,
            customAi: false,
        },
    },
    growth: {
        name: 'Growth',
        leads: 500,
        aiConversations: 2000,
        features: {
            indiamart: true,
            whatsapp: true,
            leadScoring: true,
            zohoCrm: false,
            hubspotCrm: false,
            analytics: false,
            apiAccess: false,
            customAi: false,
        },
    },
    professional: {
        name: 'Professional',
        leads: 2000,
        aiConversations: 10000,
        features: {
            indiamart: true,
            whatsapp: true,
            leadScoring: true,
            zohoCrm: true,
            hubspotCrm: true,
            analytics: true,
            apiAccess: false,
            customAi: false,
        },
    },
    business: {
        name: 'Business',
        leads: Infinity,
        aiConversations: Infinity,
        features: {
            indiamart: true,
            whatsapp: true,
            leadScoring: true,
            zohoCrm: true,
            hubspotCrm: true,
            analytics: true,
            apiAccess: true,
            customAi: true,
        },
    },
};

export function getPlanConfig(plan: string): PlanConfig {
    return PLAN_LIMITS[plan.toLowerCase()] || PLAN_LIMITS.starter;
}

export function canAccessFeature(plan: string, feature: keyof PlanConfig['features']): boolean {
    const config = getPlanConfig(plan);
    return config.features[feature];
}

export function isWithinLimit(plan: string, type: 'leads' | 'aiConversations', currentCount: number): boolean {
    const config = getPlanConfig(plan);
    const limit = config[type];
    return limit === Infinity || currentCount < limit;
}
