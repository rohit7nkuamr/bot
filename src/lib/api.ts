/**
 * API Client Library
 * Centralized API calls for frontend
 */

const API_BASE_URL = typeof window !== 'undefined'
  ? '' // Browser: use relative path to avoid CORS
  : (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'); // Server: use absolute URL

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  stats?: any; // To accommodate dashboard stats
  error?: string;
  message?: string;
}

/**
 * Generic API call handler
 */
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}/api${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API call failed');
    }

    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Authentication API calls
 */
export const authAPI = {
  signup: (email: string, password: string) =>
    apiCall('/auth', {
      method: 'POST',
      body: JSON.stringify({ action: 'signup', email, password }),
    }),

  login: (email: string, password: string) =>
    apiCall('/auth', {
      method: 'POST',
      body: JSON.stringify({ action: 'login', email, password }),
    }),

  logout: () =>
    apiCall('/auth', {
      method: 'POST',
      body: JSON.stringify({ action: 'logout' }),
    }),

  getCurrentUser: () =>
    apiCall('/auth', {
      method: 'POST',
      body: JSON.stringify({ action: 'get-user' }),
    }),
};

/**
 * Leads API calls
 */
export const leadsAPI = {
  getLeads: (status?: string) => {
    const query = status ? `?status=${status}` : '';
    return apiCall(`/leads${query}`, { method: 'GET' });
  },

  createLead: (phone: string, name: string, budget?: number, raw_data?: any) =>
    apiCall('/leads', {
      method: 'POST',
      body: JSON.stringify({ phone, name, budget, raw_data }),
    }),
};

/**
 * Payments API calls
 */
export const paymentsAPI = {
  createSubscription: (planId: string, userId: string) =>
    apiCall('/payments', {
      method: 'POST',
      body: JSON.stringify({ action: 'create-subscription', planId, userId }),
    }),

  handleWebhook: (data: any) =>
    apiCall('/payments', {
      method: 'POST',
      body: JSON.stringify({ action: 'webhook', data }),
    }),
};
