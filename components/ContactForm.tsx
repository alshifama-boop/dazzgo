
'use client';

import { FormEvent, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
  const [status, setStatus] = useState<{
    kind: 'success' | 'error';
    text: string;
  } | null>(null);

  const [sending, setSending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setSending(true);

    try {
      const form = event.currentTarget;

      await emailjs.sendForm(
        'service_pfnk48h',
        'template_ktk3fu2',
        form,
        { publicKey: 'PtG6CEVqrs_fUy-V4' }
      );

      setStatus({
        kind: 'success',
        text: 'Your enquiry was sent successfully!',
      });

      form.reset();
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus({
        kind: 'error',
        text: 'Unable to send your enquiry. Please try again.',
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-heading">
        <span>PROJECT ENQUIRY</span>
        <span className="form-step">01 / 01</span>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="fullName">Your name *</label>
          <input id="fullName" name="fullName" placeholder="Full name" autoComplete="name" required maxLength={100} />
        </div>
        <div className="field">
          <label htmlFor="email">Email address *</label>
          <input id="email" name="email" type="email" placeholder="you@company.com" autoComplete="email" required maxLength={254} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="service">What do you need help with?</label>
        <select id="service" name="service" defaultValue="">
          <option value="" disabled>Select a service</option>
          <option>Web & app development</option>
          <option>IT support & consulting</option>
          <option>AI & automation</option>
          <option>Software & SaaS products</option>
          <option>Digital marketing</option>
          <option>Something else</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="description">Tell us about your project *</label>
        <textarea id="description" name="description" placeholder="A little about your goals, requirements, or challenge..." rows={4} required minLength={10} maxLength={4000} />
      </div>

      <label className="consent">
        <input type="checkbox" name="consent" required />
        <span>I agree that DAZZGO may use these details to respond to my enquiry.</span>
      </label>

      <button className="button form-submit" type="submit" disabled={sending}>
        {sending ? 'Sending...' : 'Send project enquiry'} <span>↗</span>
      </button>

      {status && (
        <p className={`form-status ${status.kind}`} role="status">
          {status.text}
        </p>
      )}

      <p className="form-footnote">
        Prefer email? <a href="mailto:dazzgo@outlook.com">dazzgo@outlook.com</a>
      </p>
    </form>
  );
}
