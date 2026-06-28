// Tiny Web Audio synth — zero deps, generated on the fly.
// Persisted mute state in localStorage. Init lazily on first user gesture.

type Voice = "hover" | "click" | "glitch" | "success" | "open" | "type";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let muted = typeof window !== "undefined" && window.localStorage.getItem("sfx:muted") === "1";
const listeners = new Set<(m: boolean) => void>();

function ensure() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.08;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  return ctx;
}

function blip(freq: number, dur: number, type: OscillatorType = "square", slide = 0, vol = 1) {
  const c = ensure();
  if (!c || !master || muted) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = freq;
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(60, freq + slide), c.currentTime + dur);
  g.gain.value = 0;
  g.gain.linearRampToValueAtTime(vol, c.currentTime + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
  o.connect(g).connect(master);
  o.start();
  o.stop(c.currentTime + dur + 0.02);
}

function noise(dur: number, vol = 0.4) {
  const c = ensure();
  if (!c || !master || muted) return;
  const buf = c.createBuffer(1, c.sampleRate * dur, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  const src = c.createBufferSource();
  src.buffer = buf;
  const g = c.createGain();
  g.gain.value = vol;
  const hp = c.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 1200;
  src.connect(hp).connect(g).connect(master);
  src.start();
}

export const sfx = {
  play(v: Voice) {
    switch (v) {
      case "hover":  return blip(880, 0.05, "triangle", 200, 0.5);
      case "click":  return blip(1320, 0.08, "square", -400, 0.7);
      case "type":   return blip(2200 + Math.random() * 400, 0.02, "square", 0, 0.3);
      case "glitch": noise(0.08, 0.3); return blip(110, 0.12, "sawtooth", 60, 0.6);
      case "open":   blip(440, 0.08, "triangle", 220); setTimeout(() => blip(660, 0.1, "triangle", 220), 60); return;
      case "success":
        blip(523, 0.08, "triangle", 0, 0.7);
        setTimeout(() => blip(659, 0.08, "triangle", 0, 0.7), 70);
        setTimeout(() => blip(784, 0.18, "triangle", 0, 0.7), 140);
        return;
    }
  },
  setMuted(m: boolean) {
    muted = m;
    if (typeof window !== "undefined") window.localStorage.setItem("sfx:muted", m ? "1" : "0");
    listeners.forEach((l) => l(m));
  },
  isMuted() { return muted; },
  subscribe(l: (m: boolean) => void) { listeners.add(l); return () => { listeners.delete(l); }; },
};
