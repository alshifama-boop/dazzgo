import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Please submit a valid form.' }, { status: 400 }); }
  const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const service = typeof body.service === 'string' ? body.service.trim() : 'Not specified';
  const description = typeof body.description === 'string' ? body.description.trim() : '';
  const consent = body.consent === 'on' || body.consent === true;
  if (fullName.length < 2 || fullName.length > 100) return NextResponse.json({ error: 'Please enter a name between 2 and 100 characters.' }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  if (description.length < 10 || description.length > 4000) return NextResponse.json({ error: 'Please describe your project in 10 to 4,000 characters.' }, { status: 400 });
  if (!consent) return NextResponse.json({ error: 'Please confirm the privacy acknowledgement.' }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || 'info@dazzgo.com';
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) return NextResponse.json({ error: 'The contact form is ready, but email delivery is not configured yet. Please email info@dazzgo.com directly, or configure RESEND_API_KEY and CONTACT_FROM_EMAIL in the deployment environment.' }, { status: 503 });

  const safe = (value: string) => value.replace(/[\r\n]/g, ' ');
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from, to: [to], reply_to: email,
      subject: `DAZZGO website enquiry — ${safe(fullName)}`,
      text: `New enquiry from the DAZZGO website\n\nName: ${safe(fullName)}\nEmail: ${safe(email)}\nService: ${safe(service || 'Not specified')}\n\nProject description:\n${description}`
    })
  });
  if (!response.ok) return NextResponse.json({ error: 'We could not send your enquiry right now. Please try again or email info@dazzgo.com.' }, { status: 502 });
  return NextResponse.json({ message: 'Thanks! Your enquiry was sent. The DAZZGO team can follow up by email.' });
}
