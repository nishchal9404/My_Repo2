import React, { useState, useEffect, useRef } from 'react';
import content from '../data/content.js';

const BG = { style: { backgroundColor: '#f48fb1' } };

// ── Passcode Lock ──────────────────────────────────────────────────────────────
const PasscodeLock = ({ onUnlock }) => {
  const [input, setInput] = useState('');
  const [shake, setShake] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key >= '0' && e.key <= '9') press(e.key);
      if (e.key === 'Backspace') del();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [input]);

  const press = (digit) => {
    if (input.length >= 4) return;
    const next = input + digit;
    setInput(next);
    if (next.length === 4) {
      if (next === content.passcode) {
        setTimeout(onUnlock, 300);
      } else {
        setShake(true);
        setError(true);
        setTimeout(() => { setInput(''); setShake(false); setError(false); }, 800);
      }
    }
  };

  const del = () => setInput(i => i.slice(0, -1));

  return (
    <div className="min-h-screen flex items-center justify-center" {...BG}>
      <div className="flex items-stretch w-full min-h-screen">

        {/* ── Polaroid — left half ── */}
        <div className="flex-1 flex items-center justify-center p-10">
          <div className="relative" style={{ width: '100%', maxWidth: 420 }}>

            {/* flower top-left */}
            <div className="absolute pointer-events-none" style={{ top: -28, left: -22, zIndex: 10, transform: 'rotate(-25deg)', fontSize: 52 }}>🌸</div>
            {/* flower bottom-right */}
            <div className="absolute pointer-events-none" style={{ bottom: 18, right: -26, zIndex: 10, transform: 'rotate(20deg)', fontSize: 44 }}>🌺</div>
            {/* small sparkle accent */}
            <div className="absolute pointer-events-none animate-float" style={{ top: 10, right: -18, zIndex: 10, fontSize: 22, animationDelay: '0.5s' }}>✨</div>

            <div
              style={{ background: 'white', padding: '12px', paddingBottom: '56px',
                boxShadow: '0 24px 80px rgba(0,0,0,0.35)', borderRadius: '4px',
                transform: 'rotate(-2deg)' }}
              className="hover:rotate-0 hover:scale-105 transition-all duration-300"
            >
              <img src="https://picsum.photos/seed/bday-p1/600/700" alt="memory"
                style={{ width: '100%', height: '55vh', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </div>

        {/* ── Passcode — right half ── */}
        <div className="flex-1 flex flex-col items-center justify-center gap-8 p-10">
          <div className="text-center">
            <div className="text-7xl mb-4">🎂</div>
            <h1 className="text-white text-3xl font-bold tracking-widest">{content.pages.passcodeLock.header}</h1>
            <p className="text-pink-200 text-base mt-2">{content.pages.passcodeLock.signature}</p>
          </div>

          <div className={`flex gap-6 ${shake ? 'animate-shake' : ''}`}>
            {[0,1,2,3].map(i => (
              <div key={i} className={`w-7 h-7 rounded-full border-2 transition-all duration-200 ${
                i < input.length
                  ? error ? 'bg-red-300 border-red-300' : 'bg-white border-white'
                  : 'bg-transparent border-white/60'
              }`} />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-5">
            {[1,2,3,4,5,6,7,8,9].map(n => (
              <button key={n} onClick={() => press(String(n))}
                className="w-20 h-20 rounded-full bg-white/20 text-white text-2xl font-semibold border border-white/30 hover:bg-white/30 active:scale-90 transition-all duration-150">{n}</button>
            ))}
            <div />
            <button onClick={() => press('0')}
              className="w-20 h-20 rounded-full bg-white/20 text-white text-2xl font-semibold border border-white/30 hover:bg-white/30 active:scale-90 transition-all duration-150">0</button>
            <button onClick={del}
              className="w-20 h-20 rounded-full bg-white/20 text-white text-2xl font-semibold border border-white/30 hover:bg-white/30 active:scale-90 transition-all duration-150">⌫</button>
          </div>
        </div>

      </div>
    </div>
  );
};

// ── Intro Modal (2 cards, auto-advance) ────────────────────────────────────────
const INTRO_TEXTS = [
  "It's Your Special Day",
  'Have a look at it...',
];

const IntroModal = ({ onDone }) => {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);

  // Auto-advance cards after 1 second each, then call onDone
  useEffect(() => {
    const t1 = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        if (step < INTRO_TEXTS.length - 1) {
          setStep(s => s + 1);
          setVisible(true);
        } else {
          onDone();
        }
      }, 400);
    }, 1000);
    return () => clearTimeout(t1);
  }, [step, onDone]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#1a0010 0%,#3d0030 60%,#1a0010 100%)' }}>
      <div
        className="relative flex flex-col items-center justify-between gap-8 rounded-2xl shadow-2xl px-10 py-12"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,200,220,0.18)', backdropFilter: 'blur(12px)', minWidth: 320, maxWidth: 380 }}
      >
        <div className="text-4xl animate-float">🎂</div>
        <p
          className={`text-white text-center text-2xl font-semibold tracking-wide transition-all duration-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ fontFamily: 'Georgia, serif', lineHeight: 1.4 }}
        >
          {INTRO_TEXTS[step]}
        </p>
        <div className="flex gap-2 mt-2">
          {INTRO_TEXTS.map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full transition-all duration-300" style={{ background: i === step ? '#f9a8c9' : 'rgba(255,255,255,0.25)' }} />
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Stage Prep Sequencer ───────────────────────────────────────────────────────
const STAGE_STEPS = [
  { text: 'The Stage is Set...', btn: 'TURN ON LIGHTS', key: 'lights' },
  { text: 'Music makes it better...', btn: 'PLAY MUSIC', key: 'music' },
  { text: 'Let the colors fly!', btn: 'FLY BALLOONS', key: 'balloons' },
  { text: 'Almost there...', btn: "Let's goo..", key: 'curtain' },
];

const FairyLights = () => (
  <div className="fairy-lights-bar">
    {Array.from({ length: 28 }).map((_, i) => (
      <span key={i} className="fairy-bulb" style={{ animationDelay: `${(i * 0.13) % 1.4}s` }} />
    ))}
  </div>
);

const Balloons = () => (
  <div className="balloons-container" aria-hidden>
    {Array.from({ length: 28 }).map((_, i) => {
      const colors = ['#ff6b9d','#ffd700','#7c3aed','#22d3ee','#f97316','#ec4899','#84cc16','#f43f5e','#06b6d4','#a855f7','#fb923c','#34d399','#f472b6','#818cf8','#facc15'];
      const left = 2 + (i * 3.5) + (Math.sin(i * 2.3) * 2.5);
      const delay = (i * 0.18) % 2.8;
      const size = 32 + (i % 5) * 9;
      return (
        <div key={i} className="balloon" style={{ left: `${left}%`, animationDelay: `${delay}s`, '--bcolor': colors[i % colors.length], '--bsize': `${size}px` }} />
      );
    })}
  </div>
);

const StagePrep = ({ onCurtain, bgAudioRef }) => {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState([]);
  const [visible, setVisible] = useState(true);
  const bgSongs = [
    '/songs/Lord_Huron_-_The_Night_We_Met__Official_Audio_(256k).mp3',
    '/songs/Stephen_Sanchez_Performs__Until_I_Found_You____We_Speak_Music(256k).mp3'
  ];

  // Start the background playlist when "PLAY MUSIC" is clicked
  const playBgPlaylist = () => {
    const audio = bgAudioRef?.current;
    if (!audio) return;

    // Remove previous ended listener to avoid duplicates
    audio.onended = null;

    // Remove the loop attribute so songs auto-advance
    audio.loop = false;

    audio.src = bgSongs[0];
    audio.volume = 0.07;
    audio.play().catch(() => {});

    // When song ends, play next
    audio.onended = () => {
      let songIndex = 0;
      // Find current song index from the src
      bgSongs.forEach((s, i) => {
        if (audio.src.includes(s.replace('/songs/', '')) || audio.src.includes(s)) {
          songIndex = i;
        }
      });
      const nextIndex = (songIndex + 1) % bgSongs.length;
      audio.src = bgSongs[nextIndex];
      audio.volume = 0.07;
      audio.play().catch(() => {});
    };
  };

  const handleStep = () => {
    const key = STAGE_STEPS[step].key;
    if (key === 'curtain') { onCurtain(); return; }
    if (key === 'music') { playBgPlaylist(); }
    setDone(d => [...d, key]);
    setVisible(false);
    setTimeout(() => { setStep(s => s + 1); setVisible(true); }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg,#0d0010 0%,#2d0028 60%,#0d0010 100%)' }}>

      {done.includes('lights') && <FairyLights />}
      {done.includes('balloons') && <Balloons />}

      <div
        className="relative z-10 flex flex-col items-center gap-8 rounded-2xl px-10 py-12"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,200,220,0.15)', backdropFilter: 'blur(10px)', minWidth: 320, maxWidth: 380 }}
      >
        <div className="flex gap-1">
          {STAGE_STEPS.map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full transition-all duration-300"
              style={{ background: i < step ? '#f9a8c9' : i === step ? '#e91e8c' : 'rgba(255,255,255,0.2)' }} />
          ))}
        </div>
        <p
          className={`text-white text-center text-xl font-semibold tracking-wide transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ fontFamily: 'Georgia, serif' }}
        >
          {STAGE_STEPS[step].text}
        </p>
        <button
          onClick={handleStep}
          className="px-8 py-3 rounded-full font-bold tracking-widest text-sm transition-all duration-200 hover:scale-105 active:scale-95"
          style={{ background: 'linear-gradient(90deg,#e91e8c,#ff6b9d)', color: '#fff', boxShadow: '0 4px 24px rgba(233,30,140,0.35)' }}
        >
          {STAGE_STEPS[step].btn}
        </button>
      </div>
    </div>
  );
};

// ── Curtain Reveal ─────────────────────────────────────────────────────────────
const CurtainReveal = ({ onDone }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setOpen(true), 80);
    const t2 = setTimeout(onDone, 1300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 flex overflow-hidden" aria-hidden>
      <div className="curtain-half curtain-left" style={{ transform: open ? 'translateX(-100%)' : 'translateX(0)' }} />
      <div className="curtain-half curtain-right" style={{ transform: open ? 'translateX(100%)' : 'translateX(0)' }} />
    </div>
  );
};

// ── Cake Cut ──────────────────────────────────────────────────────────────────
const CakeCut = ({ onDone }) => {
  const [phase, setPhase] = useState('idle');
  const [showMessage, setShowMessage] = useState(false);

  // Cake dimensions matching reference image proportions.
  // Reference: cake occupies ~24% of the full image frame.
  // Width scales with viewport; height derived from cake's natural aspect ratio (677:369).
  const W = Math.min(window.innerWidth * 0.8, 650);
  const H = Math.round(W * (369 / 677));
  const HALF = Math.round(W / 2);

  const handleCut = () => {
    if (phase !== 'idle') return;
    setPhase('cutting');
    setTimeout(() => setPhase('split'), 400);
    setTimeout(() => {
      setPhase('disappear');
      setShowMessage(true);
    }, 1400);
    // Message stays visible for ~5.6 seconds
    setTimeout(onDone, 7000);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center select-none relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg,#2d0036 0%,#1a0028 40%,#0d001a 100%)' }}
    >
      {Array.from({length:14}).map((_,i)=>(
        <div key={i} className="absolute text-xl pointer-events-none"
          style={{ left:`${4+i*7}%`, top:`${8+((i*41)%82)}%`,
            opacity:0.12+(i%3)*0.05,
            animation:`float ${2.4+(i%3)*0.9}s ease-in-out infinite`,
            animationDelay:`${(i*0.28)%2}s` }}>🌸</div>
      ))}

      {phase === 'idle' && (
        <p className="relative z-10 text-pink-200/80 text-sm tracking-widest uppercase animate-pulse mb-3">
          ✨ Tap the cake to cut it ✨
        </p>
      )}

      {/* outer wrapper — centers the cake */}
      <div className="relative z-10" style={{ width: W, height: H }}>

        {phase === 'idle' && (
          <div className="absolute z-20 pointer-events-none"
            style={{ left: HALF - 16, top: -44, fontSize: 34, transform: 'rotate(180deg)' }}>🔪</div>
        )}

        {phase === 'cutting' && (
          <div className="absolute z-20 pointer-events-none cake-cut-line"
            style={{ left: HALF - 2, top: 0, width: 4, height: H,
              background: 'linear-gradient(to bottom,white,rgba(255,255,255,0.1))',
              borderRadius: 4, boxShadow: '0 0 20px 8px rgba(255,255,255,0.98)' }} />
        )}

        {/* SINGLE INTACT CAKE — shown before and during the cut */}
        {(phase === 'idle' || phase === 'cutting') && (
          <img src="/cake.png"
            width={W} height={H}
            style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }}
            alt="cake"
          />
        )}

        {/* LEFT HALF — only appears after cutting, slides left */}
        {(phase === 'split' || phase === 'disappear') && (
          <div style={{
            position: 'absolute', left: 0, top: 0,
            width: HALF, height: H,
            overflow: 'hidden',
            transform: phase === 'disappear'
              ? `translateX(-${HALF}px) rotate(-15deg)`
              : `translateX(-${Math.round(HALF * 0.25)}px) rotate(-5deg)`,
            transition: 'transform 0.8s cubic-bezier(0.22,1.2,0.36,1), opacity 0.6s ease-out',
            transformOrigin: 'bottom left',
            opacity: phase === 'disappear' ? 0 : 1,
          }}>
            <img src="/cake.png"
              width={W} height={H}
              style={{ display: 'block', width: W, height: H, maxWidth: 'none' }}
              alt="cake left half"
            />
          </div>
        )}

        {/* RIGHT HALF — only appears after cutting, slides right */}
        {(phase === 'split' || phase === 'disappear') && (
          <div style={{
            position: 'absolute', left: HALF, top: 0,
            width: HALF, height: H,
            overflow: 'hidden',
            transform: phase === 'disappear'
              ? `translateX(${HALF}px) rotate(15deg)`
              : `translateX(${Math.round(HALF * 0.25)}px) rotate(5deg)`,
            transition: 'transform 0.8s cubic-bezier(0.22,1.2,0.36,1), opacity 0.6s ease-out',
            transformOrigin: 'bottom right',
            opacity: phase === 'disappear' ? 0 : 1,
          }}>
            <img src="/cake.png"
              width={W} height={H}
              style={{ display: 'block', width: W, height: H, maxWidth: 'none', marginLeft: -HALF }}
              alt="cake right half"
            />
          </div>
        )}

        {/* Happy Birthday celebration — big party */}
        {showMessage && (
          <div className="absolute z-30 pointer-events-none"
            style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>

            {/* Wave 1 — Massive confetti explosion */}
            {Array.from({length:80}).map((_,i)=>(<div key={`conf1-${i}`} className="absolute cake-confetti" style={{
              '--angle': `${(i/80)*360}deg`,
              '--dist': `${60+(i%10)*30}px`,
              background: ['#f472b6','#fbbf24','#a78bfa','#34d399','#fb7185','#60a5fa','#fde68a','#f9a8d4','#ff6b9d','#ffd700','#7c3aed','#22d3ee','#ec4899','#f97316'][i%14],
              width: i%4===0?18:10, height: i%4===0?18:10,
              borderRadius: i%2===0?'50%':'2px',
              animationDelay: `${i*0.02}s`,
              animationDuration: '2s',
            }} />))}

            {/* Wave 2 — delayed confetti */}
            {Array.from({length:50}).map((_,i)=>(<div key={`conf2-${i}`} className="absolute cake-confetti" style={{
              '--angle': `${(i/50)*360+30}deg`,
              '--dist': `${40+(i%6)*35}px`,
              background: ['#facc15','#f472b6','#60a5fa','#34d399','#fb923c','#c084fc','#f472b6','#22d3ee'][i%8],
              width: i%3===0?14:8, height: i%3===0?14:8,
              borderRadius: i%2===0?'50%':'1px',
              animationDelay: `${0.4+i*0.025}s`,
              animationDuration: '2.2s',
            }} />))}

            {/* Wave 3 — late confetti burst */}
            {Array.from({length:30}).map((_,i)=>(<div key={`conf3-${i}`} className="absolute cake-confetti" style={{
              '--angle': `${(i/30)*360+90}deg`,
              '--dist': `${50+(i%5)*40}px`,
              background: ['#ffd700','#ff6b9d','#a78bfa','#fbbf24','#34d399'][i%5],
              width: 12, height: 12,
              borderRadius: '50%',
              animationDelay: `${0.8+i*0.04}s`,
              animationDuration: '2.5s',
            }} />))}

            {/* Shooting stars / streamers */}
            {Array.from({length:12}).map((_,i)=>(<div key={`star-${i}`} className="absolute" style={{
              left: '50%', top: '50%',
              width: '4px', height: '40px',
              background: `linear-gradient(to top, transparent, ${['#ffd700','#f472b6','#60a5fa','#34d399','#fb923c','#c084fc','#f472b6','#facc15','#22d3ee','#ff6b9d','#a78bfa','#fde68a'][i]})`,
              borderRadius: '2px',
              transform: `translate(-50%, -50%) rotate(${i*30}deg) translateY(-${120+Math.random()*60}px)`,
              opacity: 0,
              animation: `confettiBurst 1.8s ease-out ${0.6+i*0.05}s forwards`,
              '--angle': `${i*30}deg`,
              '--dist': `${150+Math.random()*80}px`,
            }} />))}

            {/* Golden sparkle particles */}
            {Array.from({length:30}).map((_,i)=>(<div key={`spark-${i}`} className="absolute animate-float" style={{
              left: `${-80+Math.random()*160}%`,
              top: `${-80+Math.random()*160}%`,
              fontSize: `${12+Math.random()*24}px`,
              animationDelay: `${i*0.08}s`,
              animationDuration: `${1.5+Math.random()*1.5}s`,
            }}>✨</div>))}
            
            {/* Twinkle stars */}
            {Array.from({length:15}).map((_,i)=>(<div key={`twinkle-${i}`} className="absolute" style={{
              left: `${-70+Math.random()*140}%`,
              top: `${-70+Math.random()*140}%`,
              fontSize: `${18+Math.random()*20}px`,
              opacity: 0,
              animation: `twinkleStar 1s ease-out ${0.5+Math.random()*0.8}s infinite alternate`,
            }}>⭐</div>))}
            
            {/* Multiple glow rings */}
            <div style={{
              position:'absolute', left:'50%', top:'50%',
              transform:'translate(-50%,-50%)',
              width:450, height:450,
              borderRadius:'50%',
              background:'radial-gradient(circle, rgba(244,114,182,0.6) 0%, rgba(167,139,250,0.35) 30%, rgba(251,191,36,0.15) 50%, transparent 70%)',
              animation:'hbGlow 2s ease-out forwards',
            }} />
            <div style={{
              position:'absolute', left:'50%', top:'50%',
              transform:'translate(-50%,-50%)',
              width:320, height:320,
              borderRadius:'50%',
              background:'radial-gradient(circle, rgba(251,191,36,0.5) 0%, rgba(244,114,182,0.3) 40%, transparent 65%)',
              animation:'hbGlow 2.2s ease-out forwards',
              animationDelay: '0.3s',
            }} />
            <div style={{
              position:'absolute', left:'50%', top:'50%',
              transform:'translate(-50%,-50%)',
              width:220, height:220,
              borderRadius:'50%',
              background:'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(251,191,36,0.2) 50%, transparent 70%)',
              animation:'hbGlow 1.5s ease-out forwards',
              animationDelay: '0.6s',
            }} />
            
            {/* main celebration text */}
            <div style={{
              position:'relative',
              display:'flex', flexDirection:'column', alignItems:'center', gap:14,
              animation:'hbPop 0.9s cubic-bezier(0.34,1.56,0.64,1) forwards',
            }}>
              {/* Top emojis — bigger festive row */}
              <div style={{ 
                display:'flex', gap:'24px', 
                fontSize: '52px',
                animation: 'float 2.5s ease-in-out infinite',
                marginBottom: '12px'
              }}>
                <span style={{ animationDelay: '0s' }}>🎉</span>
                <span style={{ animationDelay: '0.15s' }}>🎂</span>
                <span style={{ animationDelay: '0.3s' }}>🎊</span>
                <span style={{ animationDelay: '0.45s' }}>🎉</span>
                <span style={{ animationDelay: '0.6s' }}>🎂</span>
              </div>
              
              {/* Main Happy Birthday text - BIG CELEBRATION STYLE */}
              <div style={{
                position: 'relative',
                width: '520px',
                height: '190px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg viewBox="0 0 600 220" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f472b6" />
                      <stop offset="25%" stopColor="#fbbf24" />
                      <stop offset="50%" stopColor="#f472b6" />
                      <stop offset="75%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#fbbf24" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    <filter id="strongGlow">
                      <feGaussianBlur stdDeviation="6" result="blur"/>
                      <feColorMatrix in="blur" type="matrix"
                        values="1 0 0 0 0.2  0 0.5 0 0 0  0 0 0.5 0 0  0 0 0 1 0"/>
                      <feMerge>
                        <feMergeNode/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Glow behind text */}
                  <ellipse cx="300" cy="120" rx="240" ry="70" fill="rgba(244,114,182,0.15)" filter="url(#strongGlow)">
                    <animate attributeName="rx" values="220;260;220" dur="2s" repeatCount="indefinite"/>
                  </ellipse>
                  
                  {/* Curved path for text - wider arc to fit full text */}
                  <path 
                    id="curvePath" 
                    d="M 30 160 Q 300 15 570 160" 
                    fill="none" 
                    stroke="none"
                  />
                  
                  {/* Text along the curve */}
                  <text 
                    fill="url(#textGradient)" 
                    fontFamily="Georgia, serif" 
                    fontWeight="900" 
                    fontSize="50"
                    letterSpacing="0.08em"
                    filter="url(#glow)"
                  >
                    <textPath 
                      href="#curvePath" 
                      startOffset="50%" 
                      textAnchor="middle"
                      style={{
                        animation: 'pulse 1.5s ease-in-out infinite',
                      }}
                    >
                      Happy Birthday!
                    </textPath>
                  </text>
                </svg>
              </div>
              
              {/* Bottom emojis */}
              <div style={{ 
                display:'flex', gap:'24px',
                fontSize: '52px',
                animation: 'float 2.5s ease-in-out infinite reverse',
                marginTop: '12px'
              }}>
                <span style={{ animationDelay: '0.6s' }}>🎂</span>
                <span style={{ animationDelay: '0.45s' }}>🎊</span>
                <span style={{ animationDelay: '0.3s' }}>🎉</span>
                <span style={{ animationDelay: '0.15s' }}>🎂</span>
                <span style={{ animationDelay: '0s' }}>🎉</span>
              </div>
              
              {/* Side floating balloons */}
              <div style={{
                position: 'absolute', top: '-50%', left: '-30%',
                fontSize: '42px',
                animation: 'float 2s ease-in-out infinite',
              }}>🎈</div>
              <div style={{
                position: 'absolute', top: '-40%', right: '-30%',
                fontSize: '36px',
                animation: 'float 2.2s ease-in-out infinite',
                animationDelay: '0.4s',
              }}>🎈</div>
              <div style={{
                position: 'absolute', bottom: '-30%', left: '-20%',
                fontSize: '32px',
                animation: 'float 1.8s ease-in-out infinite',
                animationDelay: '0.8s',
              }}>🎊</div>
              <div style={{
                position: 'absolute', bottom: '-25%', right: '-25%',
                fontSize: '38px',
                animation: 'float 2.4s ease-in-out infinite',
                animationDelay: '0.2s',
              }}>🎉</div>
            </div>
          </div>
        )}

        <div className="absolute inset-0 z-10 cursor-pointer" onClick={handleCut} />
      </div>
    </div>
  );
};


// ── Gift Hub ───────────────────────────────────────────────────────────────────
const PHOTOS = [
  { src: 'https://picsum.photos/seed/ph1/200/200', rot: '-6deg', dy: 0 },
  { src: 'https://picsum.photos/seed/ph2/200/200', rot: '4deg',  dy: 14 },
  { src: 'https://picsum.photos/seed/ph3/200/200', rot: '-3deg', dy: 4 },
  { src: 'https://picsum.photos/seed/ph4/200/200', rot: '6deg',  dy: 18 },
  { src: 'https://picsum.photos/seed/ph5/200/200', rot: '-5deg', dy: 8 },
];

const PhotoString = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="relative w-full" style={{ height: 320 }}>
      <svg className="absolute inset-0 w-full" height="320" style={{ zIndex: 0 }} preserveAspectRatio="none">
        <defs>
          {/* Warm glow filter for lights */}
          <filter id="warmGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" type="matrix"
              values="1 0 0 0 0.3  0 0.6 0 0 0.1  0 0 0.2 0 0  0 0 0 1 0" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Stronger glow for bulbs */}
          <filter id="bulbGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" type="matrix"
              values="1 0 0 0 0.4  0 0.7 0 0 0.15  0 0 0.3 0 0  0 0 0 1 0" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Rope texture gradient */}
          <linearGradient id="ropeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b5a2b" />
            <stop offset="50%" stopColor="#5c3a1e" />
            <stop offset="100%" stopColor="#3d2512" />
          </linearGradient>
        </defs>

        {/* ── Thin brown wire with waves (where photos hang from) ── */}
        {/* Wire shadow/depth */}
        <path
          d="M 2% 15 Q 8% 12, 15% 15 Q 22% 18, 30% 15 Q 38% 12, 45% 15 Q 52% 18, 60% 15 Q 68% 12, 75% 15 Q 82% 18, 90% 15 Q 95% 13, 98% 15"
          fill="none"
          stroke="#3d2512"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.4"
        />
        {/* Main wire body */}
        <path
          d="M 2% 15 Q 8% 12, 15% 15 Q 22% 18, 30% 15 Q 38% 12, 45% 15 Q 52% 18, 60% 15 Q 68% 12, 75% 15 Q 82% 18, 90% 15 Q 95% 13, 98% 15"
          fill="none"
          stroke="#6b341a"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.9"
        />
        {/* Wire highlight */}
        <path
          d="M 2% 15 Q 8% 12, 15% 15 Q 22% 18, 30% 15 Q 38% 12, 45% 15 Q 52% 18, 60% 15 Q 68% 12, 75% 15 Q 82% 18, 90% 15 Q 95% 13, 98% 15"
          fill="none"
          stroke="#8b5a2b"
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* ── Warm fairy lights attached to wire ── */}
        {Array.from({ length: 20 }).map((_, i) => {
          const t = i / 19;
          const x = 2 + t * 96;
          const y = 15;
          
          // Alternating light sizes and brightness
          const isLarge = i % 3 === 0;
          const baseRadius = isLarge ? 5 : 3.5;
          const radius = mounted ? baseRadius : 0;
          const glowRadius = radius * 2.5;
          const opacity = 0.7 + (i % 4) * 0.1;
          const hue = i % 5 === 0 ? '#ff6b9d' : i % 5 === 1 ? '#ffd700' : i % 5 === 2 ? '#ffb86b' : i % 5 === 3 ? '#ff9ecd' : '#ffcc80';
          
          return (
            <g key={`light-${i}`} style={{ animation: mounted ? `lightPulse ${1.8 + (i % 3) * 0.4}s ease-in-out infinite` : 'none', animationDelay: `${i * 0.15}s` }}>
              {/* Outer glow */}
              <circle cx={`${x}%`} cy={`${y}%`} r={glowRadius} fill={hue} opacity={opacity * 0.25} filter="url(#bulbGlow)" />
              {/* Middle glow */}
              <circle cx={`${x}%`} cy={`${y}%`} r={radius * 1.6} fill="#fff5e6" opacity={opacity * 0.5} />
              {/* Core bulb */}
              <circle cx={`${x}%`} cy={`${y}%`} r={radius} fill={hue} opacity={opacity} />
              {/* Bright center */}
              <circle cx={`${x}%`} cy={`${y}%`} r={radius * 0.4} fill="#ffffff" opacity={opacity * 0.9} />
            </g>
          );
        })}

        {/* ── Hanging straps from wire to photos ── */}
        {PHOTOS.map((_, i) => {
          const x = 8 + i * (84 / (PHOTOS.length - 1));
          const y = 15;
          const strapLength = 18; // Length of strap in percentage
          return (
            <g key={`strap-${i}`}>
              {/* Thin hanging strap */}
              <line x1={`${x}%`} y1={`${y}%`} x2={`${x}%`} y2={`${y + strapLength}%`}
                stroke="#6b341a" strokeWidth="1.5" opacity="0.7" />
              {/* Small clip at top connecting to wire */}
              <circle cx={`${x}%`} cy={`${y}%`} r="2.5" fill="#d4a96a" stroke="#8b5a2b" strokeWidth="0.8" />
            </g>
          );
        })}
      </svg>

      {/* ── Photo cards hanging from wire ── */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        {PHOTOS.map((p, i) => {
          const x = 8 + i * (84 / (PHOTOS.length - 1));
          const y = 18;
          return (
            <div key={i}
              className="absolute"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: `translate(-50%, 0) rotate(${p.rot})`,
                transformOrigin: 'top center',
                animation: mounted ? `photoSway ${2.8 + i * 0.4}s ease-in-out infinite alternate` : 'none',
                animationDelay: `${i * 0.3}s`,
              }}
            >
              {/* Larger photo card */}
              <div
                style={{
                  background: 'white',
                  padding: 8,
                  paddingBottom: 12,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.15)',
                  borderRadius: 4,
                  width: 140,
                  transform: 'translateX(-50%)',
                }}
              >
                <img
                  src={p.src}
                  alt="memory"
                  style={{ width: '100%', height: 120, objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


const GiftHub = ({ onSelect, bgAudioRef: externalBgAudioRef }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const internalBgAudioRef = useRef(null);
  
  // Use external ref if provided, otherwise use internal
  const bgAudio = externalBgAudioRef || internalBgAudioRef;

  // Background playlist — only set up the "ended" listener to advance songs.
  // Music is already started from StagePrep's "PLAY MUSIC" button.
  useEffect(() => {
    const audioEl = bgAudio.current;
    if (!audioEl) return;

    const bgSongs = [
      '/songs/Lord_Huron_-_The_Night_We_Met__Official_Audio_(256k).mp3',
      '/songs/Stephen_Sanchez_Performs__Until_I_Found_You____We_Speak_Music(256k).mp3'
    ];

    const playNextSong = () => {
      setCurrentSongIndex(prev => {
        const nextIndex = (prev + 1) % bgSongs.length;
        audioEl.src = bgSongs[nextIndex];
        audioEl.volume = 0.07;
        audioEl.play().catch(() => {});
        return nextIndex;
      });
    };

    // Only attach ended listener — don't start playback (already started by StagePrep)
    audioEl.addEventListener('ended', playNextSong);

    return () => {
      audioEl.removeEventListener('ended', playNextSong);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col" {...BG}>
      <PhotoString />
      <div className="flex flex-col items-center justify-center flex-1 gap-6 p-6 pt-2">
        <h1 className="text-white text-3xl font-bold tracking-widest">{content.pages.giftHub.header}</h1>
        <p className="text-pink-200">{content.pages.giftHub.subtext}</p>
        <div className="flex flex-wrap justify-center gap-6 mt-2">
          {content.pages.giftHub.giftBoxes.map(gift => (
            <button key={gift.id} onClick={() => onSelect(gift.id)} className="gift-card group">
              <div className="text-6xl mb-3 group-hover:animate-wiggle transition-transform">{gift.emoji}</div>
              <p className="text-white font-semibold text-sm tracking-wide">{gift.label}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};


// ── Photo Memory ───────────────────────────────────────────────────────────────
const PhotoMemory = ({ onBack }) => {
  const { header, subtext, photos, captions } = content.interactions.photoMemory;
  const [active, setActive] = useState(null);

  const layouts = [
    'col-span-2 row-span-2 h-64',
    'col-span-1 row-span-1 h-32',
    'col-span-1 row-span-1 h-32',
    'col-span-1 row-span-1 h-32',
    'col-span-1 row-span-1 h-32',
  ];
  const rotations = ['rotate-1', '-rotate-2', 'rotate-2', '-rotate-1', 'rotate-1'];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6" {...BG}>
      <h1 className="text-white text-3xl font-bold">{header}</h1>
      <p className="text-pink-100">{subtext}</p>

      <div className="grid grid-cols-2 grid-rows-3 gap-3 w-full max-w-sm">
        {photos.map((src, i) => (
          <div
            key={i}
            onClick={() => setActive(active === i ? null : i)}
            className={`relative overflow-hidden rounded-2xl shadow-xl cursor-pointer transition-all duration-300 ${layouts[i]} ${
              active === i ? 'scale-105 z-10 rotate-0' : `hover:scale-102 ${rotations[i]}`
            }`}
          >
            <img src={src} alt={captions[i]} className="w-full h-full object-cover" />
            <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${
              active === i ? 'opacity-100' : 'opacity-0 hover:opacity-100'
            }`}>
              <p className="absolute bottom-2 left-0 right-0 text-center text-white text-xs font-semibold px-2">{captions[i]}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

// ── Our Songs ─────────────────────────────────────────────────────────────────
const OurSongs = ({ onBack, bgAudioRef: externalBgAudioRef }) => {
  const { header, subtext, songs } = content.interactions.ourSongs;
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const song = songs[active];

  // Audio file paths - URL encoded to handle special characters in filenames
  const audioFiles = [
    '/songs/Since_Tum(128k).m4a',
    '/songs/HUMSAFAR_-_TAIMOUR_BAIG___Prod._Raffey_Anwar__Official_Audio_(256k).mp3',
    '/songs/Ishq_Wala_Love___4K___Alia_Bhatt,_Sidharth_Malhotra,_Varun_Dhawan___Neeti_Mohan___Salim_Merchant(256k).mp3',
    '/songs/Kaise_Bataaoon_-_Full_Song_With_Lyrics___Mithoon___Amar_Mohile___3G(256k).mp3',
    '/songs/The_Fate_of_Ophelia__The_Chainsmokers_Remix_(256k).mp3'
  ];

  // Encode special characters in file paths
  const encodePath = (path) => {
    const parts = path.split('/');
    const encoded = parts.map(p => {
      if (p === '') return '';
      return encodeURIComponent(p);
    });
    return encoded.join('/').replace(/%2F/g, '/');
  };

  useEffect(() => {
    // Initialize audio with the current song
    if (audioRef.current) {
      const filePath = encodePath(audioFiles[active]);
      console.log('Loading audio file:', filePath);
      audioRef.current.src = filePath;
      audioRef.current.load();
    }
  }, [active]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
        // Resume background music
        if (externalBgAudioRef?.current) {
          externalBgAudioRef.current.play().catch(() => {});
        }
      } else {
        // Ensure audio source is set
        if (!audioRef.current.src || audioRef.current.src === '') {
          audioRef.current.src = encodePath(audioFiles[active]);
          audioRef.current.load();
        }
        console.log('Attempting to play:', audioRef.current.src);
        // Pause background music
        if (externalBgAudioRef?.current) {
          externalBgAudioRef.current.pause();
        }
        await audioRef.current.play();
        setPlaying(true);
      }
    } catch (error) {
      console.error('Playback failed:', error);
      console.log('Audio source:', audioRef.current.src);
      // Show error message to user
      alert('Could not play audio. The file may be missing or in an unsupported format. Check that song files exist in the public/songs folder.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6" {...BG}>
      <h1 className="text-white text-3xl font-bold">{header}</h1>
      <p className="text-pink-200">{subtext}</p>

      <div className="bg-white/10 backdrop-blur rounded-2xl p-6 w-full max-w-md shadow-xl">
        {/* Spinning Vinyl Record */}
        <div className="flex items-center justify-center mb-4">
          <div className={`relative ${playing ? 'animate-spin' : ''}`} style={playing ? {animationDuration:'2s'} : {}}>
            {/* Vinyl record */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-black relative"
              style={{
                boxShadow: '0 0 20px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.8)',
                border: '3px solid #1a1a1a'
              }}>
              {/* Vinyl grooves */}
              <div className="absolute inset-0 rounded-full" style={{
                background: 'repeating-radial-gradient(circle at center, transparent 0px, transparent 3px, rgba(255,255,255,0.03) 3px, rgba(255,255,255,0.03) 4px)'
              }} />
              {/* Center label */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center"
                style={{
                  boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)'
                }}>
                <div className="w-3 h-3 rounded-full bg-black" />
              </div>
            </div>
          </div>
        </div>
        
        <h2 className="text-white text-xl font-bold mb-2 text-center">{song.title}</h2>
        <p className="text-pink-200 text-sm mb-3 text-center">{song.artist}</p>
        <p className="text-white/80 text-sm italic mb-5 text-center">"{song.reason}"</p>

        {/* Hidden Audio Player */}
        <audio
          ref={audioRef}
          className="hidden"
          onEnded={() => setPlaying(false)}
        />

        {/* Play/Pause Button */}
        <div className="flex justify-center">
          <button
            onClick={togglePlay}
            className="bg-white font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform flex items-center gap-2"
            style={{ color: '#e91e8c', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            {playing ? '⏸ Pause' : '▶ Play'}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full max-w-sm">
        {songs.map((s, i) => (
          <button key={i} onClick={() => { setActive(i); setPlaying(false); }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
              active === i ? 'bg-white/20 text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}>
            <span className="text-lg">{active === i ? '🎵' : '🎶'}</span>
            <div>
              <p className="font-semibold text-sm">{s.title}</p>
              <p className="text-xs opacity-70">{s.artist}</p>
            </div>
          </button>
        ))}
      </div>

      <button onClick={onBack} className="btn-secondary mt-2">← Back</button>
    </div>
  );
};

// ── Secret Message ───────────────────────────────────────────────────────────────
const SecretMessage = ({ onBack }) => {
  const { header, subtext, message } = content.interactions.secretMessage;
  const canvasRef = useRef(null);
  const [done, setDone] = useState(false);
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#f48fb1';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    for (let i = 0; i < 12; i++) {
      ctx.font = '20px serif';
      ctx.fillText('🎀', Math.random() * canvas.width, Math.random() * canvas.height);
    }
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Scratch me! 😏', canvas.width / 2, canvas.height / 2);
  }, []);

  const scratch = (e) => {
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX ?? e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY ?? e.touches?.[0]?.clientY) - rect.top;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const total = pixels.length / 4;
    const transparent = pixels.filter((_, i) => i % 4 === 3 && pixels[i] === 0).length;
    const pct = Math.round((transparent / total) * 100);
    if (pct > 60 && !done) setDone(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6" {...BG}>
      <h1 className="text-white text-3xl font-bold">{header}</h1>
      <p className="text-pink-200">{subtext}</p>

      <div className="relative w-96 h-64 rounded-2xl overflow-hidden shadow-2xl select-none">
        <div className="absolute inset-0 bg-white/10 flex items-center justify-center p-4">
          <p className="text-white text-center text-sm font-medium leading-relaxed">{message}</p>
        </div>
        <canvas
          ref={canvasRef}
          width={384} height={256}
          className="absolute inset-0 cursor-pointer touch-none"
          onMouseDown={() => drawing.current = true}
          onMouseUp={() => drawing.current = false}
          onMouseLeave={() => drawing.current = false}
          onMouseMove={scratch}
          onTouchStart={() => drawing.current = true}
          onTouchEnd={() => drawing.current = false}
          onTouchMove={scratch}
        />
      </div>

      {done && (
        <div className="text-center animate-fade-in">
          <div className="flex justify-center gap-2 text-2xl mb-2">
            {['🎀','✨','🎀'].map((e, i) => (
              <span key={i} className="animate-float" style={{ animationDelay: `${i * 0.2}s` }}>{e}</span>
            ))}
          </div>
          <p className="text-white font-semibold text-base">Worth the scratch, wasn't it?</p>
        </div>
      )}

      <button onClick={onBack} className="btn-secondary mt-2">← Back</button>

    </div>
  );
};

// ── Compliment Garden ─────────────────────────────────────────────────────────
const FLOWER_EMOJIS = ['🌸','🌼','🌷','🌺','🌹','🌻','🌸','🌼'];

const ComplimentGarden = ({ onBack }) => {
  const { header, subtext, compliments } = content.interactions.complimentGarden;
  const [flowers, setFlowers] = useState([]);
  const [index, setIndex] = useState(0);

  const bloom = (e) => {
    if (index >= compliments.length) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setFlowers(f => [...f, {
      id: Date.now(),
      x, y,
      emoji: FLOWER_EMOJIS[index % FLOWER_EMOJIS.length],
      text: compliments[index]
    }]);
    setIndex(i => i + 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6" {...BG}>
      <h1 className="text-white text-3xl font-bold">{header}</h1>
      <p className="text-pink-200 text-sm">{subtext}</p>

      <div
        onClick={bloom}
        className="relative w-full max-w-sm h-72 rounded-2xl bg-white/10 border-2 border-white/20 cursor-pointer overflow-hidden"
      >
        {flowers.length === 0 && (
          <p className="absolute inset-0 flex items-center justify-center text-white/40 text-sm">Tap to bloom 🌸</p>
        )}
        {flowers.map(f => (
          <div key={f.id} className="absolute animate-fade-in flex flex-col items-center" style={{ left: f.x - 24, top: f.y - 24 }}>
            <span className="text-3xl animate-float">{f.emoji}</span>
          </div>
        ))}
      </div>

      {flowers.length > 0 && (
        <div className="bg-white/10 rounded-xl px-5 py-3 max-w-sm w-full text-center animate-fade-in">
          <p className="text-white text-sm italic">{flowers[flowers.length - 1].text}</p>
        </div>
      )}

      {index >= compliments.length && (
        <p className="text-pink-200 text-sm animate-fade-in">🌱 Your garden is in full bloom! 🌸</p>
      )}

      <button onClick={onBack} className="btn-secondary mt-2">← Back</button>

    </div>
  );
};

// ── Take A Selfie ──────────────────────────────────────────────────────────────
const TakeASelfie = ({ onBack }) => {
  const [photos, setPhotos] = useState([]);
  const [flashing, setFlashing] = useState(false);
  const [cameraReady, setCameraReady] = useState(true);
  const audioRef = useRef(null);

  // Camera click sound effect
  useEffect(() => {
    // Create audio context for camera click sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    const playClickSound = () => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    };

    if (audioRef.current) {
      audioRef.current.playClickSound = playClickSound;
    }
  }, []);

  const takePhoto = () => {
    if (photos.length >= 5 || !cameraReady) return;
    
    // Flash effect
    setFlashing(true);
    setCameraReady(false);
    
    // Play camera sound
    if (audioRef.current && audioRef.current.playClickSound) {
      audioRef.current.playClickSound();
    }
    
    // Add new photo
    const newPhoto = {
      id: Date.now(),
      src: `https://picsum.photos/seed/selfie${Date.now()}/200/200`,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setTimeout(() => {
      setPhotos(prev => [...prev, newPhoto]);
      setFlashing(false);
      setCameraReady(true);
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6" {...BG}>
      <h1 className="text-white text-3xl font-bold">📸 Take A Selfie</h1>
      <p className="text-pink-200">Capture your special moments! ({photos.length}/5 photos)</p>

      {/* Camera Flash Overlay */}
      {flashing && (
        <div className="fixed inset-0 bg-white z-50 animate-flash" />
      )}

      {/* Camera */}
      <div className="relative">
        {/* Camera Body */}
        <div className="relative bg-gray-800 rounded-xl p-3 shadow-2xl" 
          style={{ 
            width: 180, 
            height: 180,
            boxShadow: '0 10px 40px rgba(0,0,0,0.4), 0 0 25px rgba(255,184,107,0.2)'
          }}>
          
          {/* Camera Lens */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Outer lens ring */}
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center"
                style={{ 
                  boxShadow: 'inset 0 3px 10px rgba(0,0,0,0.6), 0 0 15px rgba(0,0,0,0.4)',
                  border: '2px solid #4a4a4a'
                }}>
                {/* Inner lens */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-900 to-black flex items-center justify-center"
                  style={{ 
                    boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.8)',
                    border: '2px solid #2a2a2a'
                  }}>
                  {/* Lens glass */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-800 via-purple-900 to-black relative overflow-hidden"
                    style={{ 
                      boxShadow: 'inset 0 0 15px rgba(0,0,0,0.9)',
                      border: '1px solid #1a1a1a'
                    }}>
                    {/* Lens reflection */}
                    <div className="absolute top-2 left-3 w-5 h-5 bg-white opacity-10 rounded-full blur-sm" />
                    <div className="absolute bottom-5 right-5 w-2 h-2 bg-white opacity-5 rounded-full blur-sm" />
                  </div>
                </div>
              </div>
              
              {/* Camera flash light */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-10 h-2.5 bg-yellow-100 rounded-full opacity-80"
                style={{ 
                  boxShadow: '0 0 15px rgba(255,255,200,0.6)',
                  border: '1px solid #ffd700'
                }} />
            </div>
          </div>

          {/* Camera brand label */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
            <div className="text-gray-400 text-xs font-bold tracking-widest">CAMERA</div>
          </div>

          {/* Shutter button on top */}
          <div className="absolute -top-2.5 right-5 w-5 h-5 bg-gray-700 rounded-full border-2 border-gray-600"
            style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.3)' }} />
        </div>

        {/* Photo coming out animation */}
        {flashing && (
          <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 animate-photoEject">
            <div className="bg-white p-2 rounded shadow-lg" style={{ width: 140, height: 140 }}>
              <img 
                src={`https://picsum.photos/seed/selfie${Date.now()}/200/200`}
                alt="captured"
                className="w-full h-full object-cover rounded"
              />
            </div>
          </div>
        )}
      </div>

      {/* Click Button */}
      <button
        onClick={takePhoto}
        disabled={!cameraReady || photos.length >= 5}
        className="relative group"
      >
        <div className="w-16 h-16 rounded-full bg-white border-4 border-gray-300 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ 
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}>
          <div className="w-11 h-11 rounded-full bg-red-500 group-hover:bg-red-600 transition-colors" />
        </div>
      </button>

      {/* Captured Photos Gallery */}
      {photos.length > 0 && (
        <div className="w-full">
          <div className="text-white text-sm mb-3 text-center">Your Photos ✨</div>
          <div className="flex flex-row justify-center items-end gap-4 overflow-x-auto pb-4">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className="animate-photoAppear flex-shrink-0"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  transform: `rotate(${(index % 2 === 0 ? -1 : 1) * (2 + index)}deg)`
                }}
              >
                <div className="bg-white p-4 pb-10 shadow-lg relative"
                  style={{ 
                    width: 200, 
                    transform: 'rotate(-2deg)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
                  }}>
                  <img 
                    src={photo.src} 
                    alt={`selfie ${index + 1}`}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute bottom-1 left-0 right-0 text-center text-xs text-gray-500">
                    {photo.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Back Button */}
      <button onClick={onBack} className="btn-secondary mt-4">← Back</button>

      {/* Hidden audio element for sound effects */}
      <audio ref={audioRef} />
    </div>
  );
};

// ── Love Letter ────────────────────────────────────────────────────────────────
const LoveLetter = ({ onBack }) => {
  const [open, setOpen] = useState(false);
  const { header, note } = content.interactions.loveLetter;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6" {...BG}>
      <h1 className="text-white text-3xl font-bold">{header}</h1>

      {!open ? (
        <div className="flex flex-col items-center gap-4">
          <div className="envelope cursor-pointer hover:scale-105 transition-transform" onClick={() => setOpen(true)}>
            <div className="envelope-flap" />
            <div className="envelope-body">
              <div className="text-4xl">💌</div>
            </div>
          </div>
          <p className="text-pink-200 animate-pulse">Click to open 💕</p>
        </div>
      ) : (
        <div className="letter-paper animate-fade-in max-w-md w-full">
          <div className="text-2xl text-center mb-4">💌</div>
          <pre className="whitespace-pre-wrap text-gray-700 font-serif text-sm leading-relaxed">{note}</pre>
          <div className="text-center mt-4 text-xl">🌹</div>
        </div>
      )}

    </div>
  );
};

// ── Main Home ──────────────────────────────────────────────────────────────────
const Home = () => {
  const [page, setPage] = useState('passcode');
  const [showCurtain, setShowCurtain] = useState(false);
  const bgAudioRef = useRef(null);

  const pages = {
    passcode:   <PasscodeLock onUnlock={() => setPage('intro')} />,
    intro:      <IntroModal onDone={() => setPage('stage')} />,
    stage:      <StagePrep onCurtain={() => setShowCurtain(true)} bgAudioRef={bgAudioRef} />,
    cakeCut:    <CakeCut onDone={() => setPage('gifts')} />,
    gifts:      <GiftHub onSelect={setPage} bgAudioRef={bgAudioRef} />,
    takeSelfie: <TakeASelfie key={page} onBack={() => setPage('gifts')} />,
    photoMemory:       <PhotoMemory key={page} onBack={() => setPage('gifts')} />,
    loveLetter:        <LoveLetter key={page} onBack={() => setPage('gifts')} />,
    ourSongs:          <OurSongs key={page} onBack={() => setPage('gifts')} bgAudioRef={bgAudioRef} />,
    secretMessage:     <SecretMessage key={page} onBack={() => setPage('gifts')} />,
    complimentGarden:  <ComplimentGarden key={page} onBack={() => setPage('gifts')} />,
  };

  return (
    <div className="transition-all duration-500">
      {/* Persistent audio element — lives across all pages */}
      <audio ref={bgAudioRef} preload="auto" />
      
      {pages[page]}
      {showCurtain && <CurtainReveal onDone={() => { setShowCurtain(false); setPage('cakeCut'); }} />}
    </div>
  );
};

export default Home;