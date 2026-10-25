'use client';
import { FormEvent, useState } from 'react';

type Message = { from: 'agent' | 'user'; text: string };
const replies: { terms: string[]; answer: string }[] = [
  { terms: ['service', 'services', 'offer', 'do you do'], answer: 'DAZZGO focuses on five service areas: web and app development, IT support and consulting, AI and automation, software and SaaS products, and digital marketing. Which one would you like to explore?' },
  { terms: ['price', 'cost', 'pricing', 'how much', 'budget'], answer: 'Project pricing depends on the scope, features, and timeline. I don’t have a confirmed price list to quote here, so I won’t guess. Use the enquiry form and share your requirements to request a tailored discussion.' },
  { terms: ['time', 'timeline', 'delivery', 'how long', 'deadline'], answer: 'Delivery time depends on the project scope and requirements. The DAZZGO team should confirm a realistic timeline after learning more about your project.' },
  { terms: ['website', 'web development', 'app', 'application'], answer: 'DAZZGO’s web and app development service covers responsive websites and practical digital applications. Tell us what you want to build and who will use it.' },
  { terms: ['ai', 'automation', 'chatbot', 'voice agent'], answer: 'AI and automation can help streamline repetitive tasks and improve customer workflows. A good first step is to describe the task you want to make easier.' },
  { terms: ['human', 'person', 'team', 'contact', 'talk to someone', 'email'], answer: 'You can contact the DAZZGO team at info@dazzgo.com or use the enquiry form on this page. A team member can review your specific requirements.' },
  { terms: ['marketing', 'seo', 'social media'], answer: 'DAZZGO’s digital marketing service includes online visibility, search visibility, content, and campaign optimisation. The right approach depends on your audience and goals.' },
  { terms: ['saas', 'software', 'product'], answer: 'DAZZGO’s software and SaaS service focuses on digital products and subscription-based experiences designed around customer needs.' },
  { terms: ['it support', 'consulting', 'technical support'], answer: 'IT support and consulting can help with technology decisions, systems, infrastructure, and technical challenges. Share the issue you are trying to solve.' }
];
function getReply(input: string) {
  const value = input.toLowerCase();
  const match = replies.find((item) => item.terms.some((term) => value.includes(term)));
  return match?.answer ?? 'I don’t have enough confirmed information to answer that accurately. Please contact info@dazzgo.com or send your question through the enquiry form so the team can follow up.';
}

export default function ChatAgent() {
  const [messages, setMessages] = useState<Message[]>([{ from: 'agent', text: 'Hi there! I’m the DAZZGO assistant. Ask me about our services, getting started, or how to contact the team.' }]);
  const [input, setInput] = useState('');
  function sendMessage(event?: FormEvent) {
    event?.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((current) => [...current, { from: 'user', text }, { from: 'agent', text: getReply(text) }]);
    setInput('');
  }
  return <div className="chat-content"><div className="messages" aria-live="polite">{messages.map((message, index) => <div className={`message-row ${message.from}`} key={`${index}-${message.from}`}><div className="message-bubble">{message.text}</div></div>)}</div><div className="suggestions"><button type="button" onClick={() => { setInput('What services do you offer?'); }}>Services</button><button type="button" onClick={() => { setInput('How much does a website cost?'); }}>Pricing</button><button type="button" onClick={() => { setInput('I want to speak to a person'); }}>Contact team</button></div><form className="chat-input-row" onSubmit={sendMessage}><label className="sr-only" htmlFor="chat-message">Ask the DAZZGO assistant</label><input id="chat-message" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask us anything..." autoComplete="off"/><button type="submit" aria-label="Send message">↑</button></form><p className="chat-disclaimer">Demo assistant · Please confirm project details with the DAZZGO team.</p></div>;
}
