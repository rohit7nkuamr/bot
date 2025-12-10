import axios from 'axios';

interface IndiamartLead {
    UNIQUE_QUERY_ID: string;
    SENDER_NAME: string;
    SENDER_MOBILE: string;
    SENDER_EMAIL: string;
    SUBJECT: string;
    QUERY_MESSAGE: string;
    QUERY_TIME: string;
    SENDER_COMPANY: string;
    SENDER_ADDRESS: string;
    SENDER_CITY: string;
    SENDER_STATE: string;
    SENDER_COUNTRY_ISO: string;
}

export async function fetchIndiamartLeads(apiKey: string) {
    try {
        // Indiamart CRM API V2 endpoint
        // Docs: https://developer.indiamart.com/docs/crm-api/v2/
        const response = await axios.get('https://api.indiamart.com/wservce/crm/crmListing/v2/', {
            params: {
                glusr_crm_key: apiKey,
                start_time: getLast15MinutesTimestamp(), // Fetch recent leads
                end_time: getCurrentTimestamp(),
            },
        });

        if (response.data.STATUS !== 'SUCCESS') {
            console.error('Indiamart API Error:', response.data);
            return [];
        }

        return response.data.RESPONSE as IndiamartLead[];
    } catch (error) {
        console.error('Failed to fetch Indiamart leads', error);
        return [];
    }
}

function getCurrentTimestamp() {
    // Format: dd-MMM-yyyy HH:mm:ss
    // Not strictly robust but sufficient for MVP against their API
    // Using a library like date-fns is recommended for production
    const now = new Date();
    return formatDate(now);
}

function getLast15MinutesTimestamp() {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 15);
    return formatDate(date);
}

function formatDate(date: Date) {
    // Indiamart format: dd-MMM-yyyy HH:mm:ss
    // e.g., 29-Sep-2023 10:00:00
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}
