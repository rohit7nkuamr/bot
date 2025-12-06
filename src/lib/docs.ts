export const DOCS_CONTENT: Record<string, { title: string; content: string }> = {
  introduction: {
    title: 'Introduction to LeadFilter',
    content: `
      <p class="text-xl text-zinc-400 leading-relaxed mb-8">
        LeadFilter is an intelligent AI agent that sits between your lead sources (like WhatsApp and IndiaMART) and your CRM. It autonomously chats with new leads to qualify their intent, budget, and timeline before handing them off to your sales team, saving you hours every day.
      </p>
      <h2 class="text-2xl font-bold text-white mt-12 mb-4">How It Works</h2>
      <ol class="list-decimal list-inside space-y-4 text-zinc-400">
        <li><b>Connect Your Sources:</b> Link your WhatsApp Business and IndiaMART accounts in the settings page.</li>
        <li><b>Leads Arrive:</b> When a new lead comes in, it's instantly sent to your LeadFilter agent.</li>
        <li><b>AI Conversation:</b> The AI starts a natural, human-like conversation via WhatsApp to ask qualifying questions.</li>
        <li><b>Real-time Dashboard:</b> You see the lead, the conversation, and the AI's qualification score on your live dashboard.</li>
        <li><b>Focus on Hot Leads:</b> Your sales team spends time only on the leads that are ready to buy.</li>
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
      
      <h2 class="text-2xl font-bold text-white mt-12 mb-4">Step 2: Connect WhatsApp</h2>
      <p class="text-zinc-400 mb-4">This is the most critical step. Go to the <b>Settings → Integrations</b> page and connect your WhatsApp Business Account. You will need your Account SID and Auth Token from your Twilio dashboard.</p>
      
      <h2 class="text-2xl font-bold text-white mt-12 mb-4">Step 3: Configure Webhook</h2>
      <p class="text-zinc-400 mb-4">In your Meta for Developers dashboard, you need to set your webhook URL to point to our server. This allows us to receive messages on your behalf.</p>
      <div class="bg-zinc-950 p-4 rounded-lg border border-white/10 font-mono text-sm text-zinc-300 mt-4 mb-8">
        <span class="text-green-400">POST</span> https://your-app-name.vercel.app/api/webhooks/whatsapp
      </div>
      <p class="text-zinc-400 mb-4">You will also need to add a Webhook Verify Token. You can generate any random string for this and add it to your environment variables as <code>META_WEBHOOK_VERIFY_TOKEN</code>.</p>

      <h2 class="text-2xl font-bold text-white mt-12 mb-4">Step 4: Watch the Magic!</h2>
      <p class="text-zinc-400 mb-4">That's it! New incoming leads will now appear on your dashboard and the AI will begin qualifying them instantly.</p>
    `,
  },
};
