export const DOCS_CONTENT: Record<string, { title: string; content: string }> = {
  introduction: {
    title: 'Introduction to LeadFilter',
    content: `
      <p class="text-xl text-zinc-400 leading-relaxed mb-8">
        LeadFilter is your AI-powered WhatsApp assistant built specifically for IndiaMART sellers. It automatically qualifies leads 24/7, so you only spend time on serious buyers.
      </p>
      <h2 class="text-2xl font-bold text-white mt-12 mb-4">How It Works</h2>
      <ol class="list-decimal list-inside space-y-4 text-zinc-400">
        <li><b>Connect IndiaMART:</b> Link your seller account using the API key from your Lead Manager.</li>
        <li><b>Leads Auto-Sync:</b> New leads are instantly sent to your AI assistant "Riya".</li>
        <li><b>AI Qualification:</b> Riya asks about budget, timeline, and requirements via WhatsApp.</li>
        <li><b>Lead Scoring:</b> Leads are scored as Hot/Warm/Cold based on their responses.</li>
        <li><b>Focus on Closings:</b> You only talk to qualified leads ready to buy.</li>
      </ol>
    `,
  },
  'getting-started': {
    title: 'Getting Started',
    content: `
      <p class="text-xl text-zinc-400 leading-relaxed mb-8">
        Go from signup to qualifying your first lead in under 5 minutes.
      </p>
      <h2 class="text-2xl font-bold text-white mt-12 mb-4">Step 1: Sign Up</h2>
      <p class="text-zinc-400 mb-4">Choose a plan and create your account. Once you sign up, you'll be taken directly to your dashboard.</p>
      
      <h2 class="text-2xl font-bold text-white mt-12 mb-4">Step 2: Add Your WhatsApp Number</h2>
      <p class="text-zinc-400 mb-4">Go to <b>Settings → Integrations</b> and click 'Connect' on the WhatsApp card. Simply enter the WhatsApp number you want to use for receiving alerts.</p>
      <p class="text-zinc-400 mb-4">You do <b>not</b> need to set up a Meta or Twilio account. We handle all the technical infrastructure for you.</p>
      
      <h2 class="text-2xl font-bold text-white mt-12 mb-4">Step 3: Watch the Magic!</h2>
      <p class="text-zinc-400 mb-4">That's it! Our AI agent is now ready. Link your IndiaMART account next to start pulling in leads automatically.</p>
    `,
  },
  'ai-qualification': {
    title: 'AI Qualification - Meet Riya',
    content: `
      <p class="text-xl text-zinc-400 leading-relaxed mb-8">
        Meet <b class="text-cyan-400">Riya</b> - your AI sales agent. She's powered by GPT-4o-mini and trained specifically for Indian B2B conversations. Riya qualifies leads by understanding context, not just keywords.
      </p>
      <div class="bg-zinc-900/50 border border-cyan-500/20 rounded-xl p-6 my-8">
        <h3 class="text-lg font-bold text-white mb-4">🤖 Riya's Capabilities</h3>
        <ul class="space-y-3 text-zinc-400">
          <li class="flex items-start gap-2"><span class="text-cyan-400">✓</span> Responds in <b>under 2 seconds</b></li>
          <li class="flex items-start gap-2"><span class="text-cyan-400">✓</span> Remembers conversation context</li>
          <li class="flex items-start gap-2"><span class="text-cyan-400">✓</span> Asks qualifying questions (budget, timeline, quantity)</li>
          <li class="flex items-start gap-2"><span class="text-cyan-400">✓</span> Scores leads as <b>Hot</b>/<b>Warm</b>/<b>Cold</b></li>
          <li class="flex items-start gap-2"><span class="text-cyan-400">✓</span> Natural Hindi/English conversation</li>
          <li class="flex items-start gap-2"><span class="text-cyan-400">✓</span> Works 24/7 - never misses a lead</li>
        </ul>
      </div>
      <h2 class="text-2xl font-bold text-white mt-12 mb-4">Cost Per Conversation</h2>
      <p class="text-zinc-400 mb-4">Using OpenAI's GPT-4o-mini, each AI conversation costs approximately <b class="text-white">₹0.20</b>. WhatsApp service conversations (when customer initiates) are <b class="text-green-400">FREE</b>.</p>
      
      <h2 class="text-2xl font-bold text-white mt-12 mb-4">Lead Scoring Logic</h2>
      <p class="text-zinc-400 mb-4">Riya analyzes responses for:</p>
      <ul class="list-disc list-inside space-y-2 text-zinc-400">
        <li><b>Budget signals:</b> Mentions of price ranges, quantities</li>
        <li><b>Timeline:</b> "Urgent", "immediately", "this month"</li>
        <li><b>Intent:</b> Questions about delivery, payment, specifications</li>
        <li><b>Red flags:</b> Price shopping only, no contact info, spam patterns</li>
      </ul>
    `,
  },
  'lead-sources': {
    title: 'Lead Sources & Verticals',
    content: `
      <p class="text-xl text-zinc-400 leading-relaxed mb-8">
        LeadFilter is built to be platform-agnostic. While we started with B2B marketplaces, our ingestion engine is designed to handle leads from any vertical.
      </p>
      
      <h2 class="text-2xl font-bold text-white mt-12 mb-4">Supported Verticals</h2>
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-4 text-zinc-400 mb-8">
        <li class="flex items-center gap-2"><span class="text-cyan-400">✓</span> IndiaMART (Live)</li>
        <li class="flex items-center gap-2"><span class="text-zinc-600">⌛</span> TradeIndia (Coming Soon)</li>
        <li class="flex items-center gap-2"><span class="text-zinc-600">⌛</span> JustDial (Coming Soon)</li>
        <li class="flex items-center gap-2"><span class="text-zinc-600">⌛</span> Facebook Lead Ads (Coming Soon)</li>
        <li class="flex items-center gap-2"><span class="text-cyan-400">✓</span> CSV Upload / Manual Entry</li>
        <li class="flex items-center gap-2"><span class="text-cyan-400">✓</span> Custom API Webhook</li>
      </ul>

      <h2 class="text-2xl font-bold text-white mt-12 mb-4">How We Pull Leads (The Backend Logic)</h2>
      <p class="text-zinc-400 mb-4">For platforms that don't support real-time webhooks (like many legacy B2B portals), obtaining leads requires a robust polling architecture.</p>
      
      <h3 class="text-xl font-semibold text-white mt-8 mb-2">1. The "Pulse" (Cron Job) 💓</h3>
      <p class="text-zinc-400 mb-4">Our system runs a scheduled task every <b>15 minutes</b> (customizable for Enterprise) to check for new data across all your connected accounts.</p>
      
      <h3 class="text-xl font-semibold text-white mt-8 mb-2">2. Intelligent Deduplication 🔄</h3>
      <p class="text-zinc-400 mb-4">We blindly fetch the latest batch of leads and compare them against our database. If a Lead ID has already been processed, we skip it. This ensures zero duplicates, even if the source platform sends the same data twice.</p>
      
      <h3 class="text-xl font-semibold text-white mt-8 mb-2">3. Instant Trigger 🤖</h3>
      <p class="text-zinc-400 mb-4">The moment a unique lead is identified, it is stored in your Dashboard and the AI Agent is <b>immediately</b> triggered to send the first WhatsApp message. No waiting.</p>
    `,
  },
  'integration-indiamart': {
    title: 'IndiaMART Integration',
    content: `
      <p class="text-xl text-zinc-400 leading-relaxed mb-8">
        Connect your IndiaMART seller account to automatically fetch new leads and send them to your AI agent.
      </p>
      <h2 class="text-2xl font-bold text-white mt-12 mb-4">How to Connect</h2>
      <ol class="list-decimal list-inside space-y-4 text-zinc-400">
        <li>Log in to your IndiaMART Seller Panel.</li>
        <li>Navigate to <b>Settings → API Key</b>.</li>
        <li>Generate a new API key if you don't have one.</li>
        <li>Copy the API key.</li>
        <li>Go to your LeadFilter <b>Settings → Integrations</b> page, find IndiaMART, and click 'Connect'.</li>
        <li>Paste your API key into the modal and click 'Verify & Connect'.</li>
      </ol>
      <p class="text-zinc-400 mt-8">Once connected, LeadFilter will periodically check for new leads in your IndiaMART account and automatically begin the qualification process.</p>
    `,
  },
  'api-leads': {
    title: 'Leads API',
    content: `
      <p class="text-xl text-zinc-400 leading-relaxed mb-8">
        Programmatically manage your leads using our REST API.
      </p>
      <h2 class="text-2xl font-bold text-white mt-12 mb-4">Fetch Leads</h2>
      <p class="text-zinc-400 mb-4">Retrieve a list of all leads for the authenticated user.</p>
      <div class="bg-zinc-950 p-4 rounded-lg border border-white/10 font-mono text-sm text-zinc-300 mt-4 mb-8">
        <span class="text-green-400">GET</span> /api/leads
      </div>

      <h2 class="text-2xl font-bold text-white mt-12 mb-4">Create a Lead</h2>
      <p class="text-zinc-400 mb-4">Manually create a new lead. This is useful for testing or for importing leads from other sources.</p>
      <div class="bg-zinc-950 p-4 rounded-lg border border-white/10 font-mono text-sm text-zinc-300 mt-4 mb-8">
        <span class="text-green-400">POST</span> /api/leads
        <br><br>
        <span class="text-purple-400">Body:</span>
        <pre>{
  "name": "Test Lead",
  "phone": "+919876543210",
  "budget": 50000,
  "raw_data": { "source": "Manual Entry" }
}</pre>
      <div class="bg-zinc-950 p-4 rounded-lg border border-white/10 font-mono text-sm text-zinc-300 mt-4 mb-8">
        <span class="text-green-400">POST</span> /api/leads
        <br><br>
        <span class="text-purple-400">Body:</span>
        <pre>{
  "name": "Test Lead",
  "phone": "+919876543210",
  "budget": 50000,
  "raw_data": { "source": "Manual Entry" }
}</pre>
      </div>
    `,
  },
  'whatsapp-automation': {
    title: 'WhatsApp Automation',
    content: `
      <p class="text-xl text-zinc-400 leading-relaxed mb-8">
        Understand how LeadFilter interacts with your potential customers on WhatsApp.
      </p>
      <h2 class="text-2xl font-bold text-white mt-12 mb-4">Fully Managed Service</h2>
      <p class="text-zinc-400 mb-4">LeadFilter uses a verified WhatsApp Business API account to message your leads. You don't need to worry about hosting, API tokens, or server maintenance.</p>

      <h2 class="text-2xl font-bold text-white mt-12 mb-4">The 24-Hour Rule</h2>
      <p class="text-zinc-400 mb-4">Meta (WhatsApp) enforces a 24-hour customer service window. LeadFilter can reply freely to any user message within 24 hours. After that, we use approved Templates to re-engage the customer.</p>
      
      <h2 class="text-2xl font-bold text-white mt-12 mb-4">AI Persona & Tone</h2>
      <p class="text-zinc-400 mb-4">You can customize the AI's tone (Formal, Friendly, Aggressive) in your Settings. By default, it uses a professional, helpful assistant persona named "Riya".</p>
    `,
  },
  'integration-zoho': {
    title: 'Zoho CRM Integration',
    content: `
      <p class="text-xl text-zinc-400 leading-relaxed mb-8">
        Sync qualified leads directly to Zoho CRM to streamline your sales pipeline.
      </p>
      <h2 class="text-2xl font-bold text-white mt-12 mb-4">Prerequisites</h2>
      <ul class="list-disc list-inside space-y-2 text-zinc-400 mb-4">
        <li>A Zoho CRM account (Standard edition or higher).</li>
        <li>Administrator access to generate API grants.</li>
      </ul>

      <h2 class="text-2xl font-bold text-white mt-12 mb-4">Setup Steps</h2>
      <ol class="list-decimal list-inside space-y-4 text-zinc-400">
        <li>Go to <b>Settings → Integrations</b> in LeadFilter.</li>
        <li>Click "Connect" on the Zoho CRM card.</li>
        <li>You will be redirected to Zoho to authorize the application.</li>
        <li>Click "Accept" to grant LeadFilter permission to create Leads.</li>
      </ol>
      <p class="text-zinc-400 mt-8">Once connected, any lead with a "High" or "Medium" qualification score will be automatically pushed to your Zoho "Leads" module.</p>
    `,
  },
  'integration-hubspot': {
    title: 'HubSpot Integration',
    content: `
      <p class="text-xl text-zinc-400 leading-relaxed mb-8">
        Automatically push hot leads into your HubSpot funnel.
      </p>
      <h2 class="text-2xl font-bold text-white mt-12 mb-4">One-Click Install</h2>
      <p class="text-zinc-400 mb-4">HubSpot integration uses OAuth V2 for a secure, one-click connection.</p>
      
      <ol class="list-decimal list-inside space-y-4 text-zinc-400">
        <li>Navigate to <b>Settings → Integrations</b>.</li>
        <li>Find the HubSpot card and click "Connect".</li>
        <li>Select your HubSpot portal ID if prompted.</li>
        <li>Approve the permissions.</li>
      </ol>
      <p class="text-zinc-400 mt-8">We map the following fields automatically: First Name, Last Name, Phone, Email, and Lifecycle Stage.</p>
    `,
  },
  'api-auth': {
    title: 'API Authentication',
    content: `
      <p class="text-xl text-zinc-400 leading-relaxed mb-8">
        Securely access the LeadFilter API.
      </p>
      <h2 class="text-2xl font-bold text-white mt-12 mb-4">API Keys</h2>
      <p class="text-zinc-400 mb-4">LeadFilter uses Bearer Token authentication. You must include your API key in the Authorization header of every request.</p>
      
      <div class="bg-zinc-950 p-4 rounded-lg border border-white/10 font-mono text-sm text-zinc-300 mt-4 mb-8">
        Authorization: Bearer lf_live_key_12345...
      </div>

      <p class="text-zinc-400 mb-4">You can generate and manage your API keys from the <b>Settings → Developer</b> page. Keep your keys secret; never share them in client-side code.</p>
    `,
  },
  'api-webhooks': {
    title: 'Webhooks',
    content: `
      <p class="text-xl text-zinc-400 leading-relaxed mb-8">
        Listen for real-time events from LeadFilter.
      </p>
      <h2 class="text-2xl font-bold text-white mt-12 mb-4">Events</h2>
      <p class="text-zinc-400 mb-4">We support the following event types:</p>
      <ul class="list-disc list-inside space-y-2 text-zinc-400 mb-6">
        <li><code>lead.created</code>: Fired when a new lead enters the system.</li>
        <li><code>lead.qualified</code>: Fired when the AI completes qualification.</li>
        <li><code>lead.disqualified</code>: Fired when a lead is marked as spam or low intent.</li>
      </ul>

      <h2 class="text-2xl font-bold text-white mt-12 mb-4">Payload Example</h2>
      <div class="bg-zinc-950 p-4 rounded-lg border border-white/10 font-mono text-sm text-zinc-300 mt-4 mb-8">
        <pre>{
  "event": "lead.qualified",
  "payload": {
    "id": "ld_123",
    "score": 95,
    "summary": "High intent buyer, budget 5L, wants urgent delivery."
  },
  "timestamp": "2024-12-10T10:00:00Z"
}</pre>
      </div>
    `,
  },
  'privacy': {
    title: 'Privacy Policy',
    content: `
      <p class="text-xl text-zinc-400 leading-relaxed mb-8">
        Your privacy is important to us. This policy explains how LeadFilter collects, uses, and protects your information.
      </p>
      <h2 class="text-2xl font-bold text-white mt-12 mb-4">Information We Collect</h2>
      <ul class="list-disc list-inside space-y-2 text-zinc-400 mb-6">
        <li><b>Account Information:</b> Email address, password (hashed), and billing details.</li>
        <li><b>Lead Data:</b> Information from your connected sources (IndiaMART, etc.) including customer names, phone numbers, and inquiry details.</li>
        <li><b>Usage Data:</b> How you interact with our dashboard and features.</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-white mt-12 mb-4">How We Use Your Data</h2>
      <ul class="list-disc list-inside space-y-2 text-zinc-400 mb-6">
        <li>To provide and improve our AI qualification service.</li>
        <li>To send WhatsApp messages to your leads on your behalf.</li>
        <li>To sync qualified leads to your connected CRMs.</li>
        <li>To send you important service updates and billing information.</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-white mt-12 mb-4">Data Security</h2>
      <p class="text-zinc-400 mb-4">We use industry-standard encryption (TLS 1.3) for all data in transit. Your data is stored securely in Supabase with row-level security policies.</p>
      
      <h2 class="text-2xl font-bold text-white mt-12 mb-4">Contact</h2>
      <p class="text-zinc-400 mb-4">For privacy concerns, email us at <a href="mailto:privacy@leadfilter.pro" class="text-cyan-400 hover:underline">privacy@leadfilter.pro</a></p>
    `,
  },
  'terms': {
    title: 'Terms of Service',
    content: `
      <p class="text-xl text-zinc-400 leading-relaxed mb-8">
        By using LeadFilter, you agree to these terms. Please read them carefully.
      </p>
      <h2 class="text-2xl font-bold text-white mt-12 mb-4">1. Service Description</h2>
      <p class="text-zinc-400 mb-4">LeadFilter is an AI-powered lead qualification platform that integrates with your lead sources and CRM systems.</p>
      
      <h2 class="text-2xl font-bold text-white mt-12 mb-4">2. Acceptable Use</h2>
      <ul class="list-disc list-inside space-y-2 text-zinc-400 mb-6">
        <li>You must have the right to contact the leads you send through our system.</li>
        <li>You may not use LeadFilter for spam, fraud, or illegal activities.</li>
        <li>You are responsible for the content of messages sent via our AI agent.</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-white mt-12 mb-4">3. Billing</h2>
      <p class="text-zinc-400 mb-4">Subscription fees are billed monthly. Refunds are available within 7 days of subscription start if no leads have been processed.</p>
      
      <h2 class="text-2xl font-bold text-white mt-12 mb-4">4. Limitation of Liability</h2>
      <p class="text-zinc-400 mb-4">LeadFilter is provided "as is". We are not liable for any indirect, incidental, or consequential damages arising from your use of the service.</p>
      
      <h2 class="text-2xl font-bold text-white mt-12 mb-4">5. Changes to Terms</h2>
      <p class="text-zinc-400 mb-4">We may update these terms from time to time. We'll notify you of significant changes via email.</p>
    `,
  },
  'about': {
    title: 'About LeadFilter',
    content: `
      <p class="text-xl text-zinc-400 leading-relaxed mb-8">
        LeadFilter was built to solve a real problem faced by thousands of Indian businesses: wasted time on unqualified leads.
      </p>
      <h2 class="text-2xl font-bold text-white mt-12 mb-4">Our Mission</h2>
      <p class="text-zinc-400 mb-4">To help SMBs and enterprises focus on high-value buyers by automating the tedious work of initial lead qualification.</p>
      
      <h2 class="text-2xl font-bold text-white mt-12 mb-4">The Problem We Solve</h2>
      <p class="text-zinc-400 mb-4">Business owners on platforms like IndiaMART receive hundreds of inquiries daily. Most are price shoppers, spam, or low-intent buyers. Manually filtering these takes hours every day.</p>
      
      <h2 class="text-2xl font-bold text-white mt-12 mb-4">Our Solution</h2>
      <p class="text-zinc-400 mb-4">LeadFilter's AI agent automatically chats with each new lead via WhatsApp, asking qualifying questions about budget, timeline, and requirements. Only hot leads make it to your sales team.</p>
      
      <h2 class="text-2xl font-bold text-white mt-12 mb-4">Contact Us</h2>
      <p class="text-zinc-400 mb-4">
        <b>Email:</b> <a href="mailto:hello@leadfilter.pro" class="text-cyan-400 hover:underline">hello@leadfilter.pro</a><br/>
        <b>Support:</b> <a href="mailto:support@leadfilter.pro" class="text-cyan-400 hover:underline">support@leadfilter.pro</a>
      </p>
    `,
  },
};
