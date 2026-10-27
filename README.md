# DAZZGO Business Customer Service Agent

A Vercel-ready Next.js starter for the DAZZGO corporate website, with a responsive black/lime visual theme, a working FAQ-style demo chat assistant, an enquiry form API, and optional ElevenLabs voice-agent integration.

## Requirements
- Node.js 20.9 or later
- npm

## Run locally
1. Extract the ZIP.
2. Open a terminal inside `dazzgo-customer-agent`.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open http://localhost:3000

The FAQ chat works without an API key. The voice widget is optional. The contact form validates fields, but sending email requires configuration as explained below.

## Configure email delivery
1. Create a Resend account and verify a sender/domain that you are allowed to send from.
2. Copy `.env.example` to `.env.local`.
3. Set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL` (defaults to `info@dazzgo.com`).
4. Restart the development server and submit a real test enquiry.
5. Add the same variables in Vercel → Project → Settings → Environment Variables, then redeploy.

Do not commit `.env.local` or expose the Resend API key in browser-side code. Without email configuration, the form deliberately reports that delivery is not configured; it does not falsely claim an email was sent.

## Enable ElevenLabs voice agent (optional)
1. Create/configure an agent in your ElevenLabs account.
2. Copy `.env.example` to `.env.local` if you have not already.
3. Set `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` to your real agent ID.
4. Restart locally, or add the variable to Vercel and redeploy.
5. Configure the agent's instructions, permitted domains, privacy settings, and human escalation behaviour in ElevenLabs.

The voice widget will not connect until a valid agent ID and suitable ElevenLabs account configuration are supplied.

## Deploy to Vercel
1. Push this folder to a GitHub repository.
2. Sign in at https://vercel.com and choose **Add New → Project**.
3. Import the repository. Vercel should detect Next.js automatically.
4. Add environment variables if using email or voice features.
5. Click **Deploy**.
6. Test the deployed page, mobile layout, chat responses, contact form, and any configured voice/email integrations.

## What's implemented
- Responsive homepage with five service categories.
- Navigation, process section, and contact section.
- Working browser-side FAQ chat with approved sample answers and safe fallback for unknown questions.
- Server-side contact validation and optional Resend email delivery.
- Optional ElevenLabs voice widget hook-up.
- Basic page metadata and reduced-motion support.

## Important limitations before production
- The chat is a deterministic FAQ demo, not a generative AI model and not a connected CRM/database.
- Customer enquiries are not stored in a database. Configure email delivery or add a secure database/CRM if persistence is required.
- Add an approved privacy policy, spam protection/rate limiting, and business-approved copy before production launch.
- Confirm all pricing, timelines, company claims, contact details, and legal requirements with DAZZGO before publishing.
