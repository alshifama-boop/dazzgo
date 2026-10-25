'use client';
import { useEffect, useState } from 'react';

export default function VoiceAgent() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
    if (!agentId || document.querySelector('elevenlabs-convai')) return;
    const widget = document.createElement('elevenlabs-convai');
    widget.setAttribute('agent-id', agentId);
    document.body.appendChild(widget);
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);
    return () => { widget.remove(); script.remove(); };
  }, []);
  const enabled = Boolean(process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID);
  if (!mounted) return null;
  return enabled ? <p className="voice-status"><span className="pulse-dot"/> Voice agent connected — use the voice bubble on the page.</p> : <p className="voice-status"><span className="voice-icon">◖))</span> Voice support can be enabled by adding your ElevenLabs Agent ID to <code>.env.local</code>.</p>;
}
