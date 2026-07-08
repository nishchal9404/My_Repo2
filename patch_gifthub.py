import sys
sys.stdout.reconfigure(encoding='utf-8')

path = r'c:\Users\vyasn\OneDrive\Desktop\project\bday\birthday-gift-spa\src\pages\Home.jsx'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find and replace from line 392 to 406 by locating exact substring
start_marker = 'const GiftHub = ({ onSelect, onBack }) => (\n  <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6" {...BG}>'
end_marker = ');\n\n// \u2500\u2500 Candle Blow'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print(f'start_idx={start_idx}, end_idx={end_idx}')
else:
    old_block = content[start_idx:end_idx + 2]  # include ");\n"
    print('Found block, length:', len(old_block))

    new_block = '''const PHOTOS = [
  { src: 'https://picsum.photos/seed/ph1/200/200', rot: '-6deg', dy: 0 },
  { src: 'https://picsum.photos/seed/ph2/200/200', rot: '4deg',  dy: 14 },
  { src: 'https://picsum.photos/seed/ph3/200/200', rot: '-3deg', dy: 4 },
  { src: 'https://picsum.photos/seed/ph4/200/200', rot: '6deg',  dy: 18 },
  { src: 'https://picsum.photos/seed/ph5/200/200', rot: '-5deg', dy: 8 },
];

const PhotoString = () => (
  <div className="relative w-full" style={{ height: 170 }}>
    <svg className="absolute inset-0 w-full" height="170" style={{ zIndex: 0 }} preserveAspectRatio="none">
      <path d="M 0 28 Q 25% 18, 50% 24 Q 75% 30, 100% 20"
        fill="none" stroke="#7c3a1e" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
    </svg>
    <div className="absolute inset-0 flex items-start justify-around px-4" style={{ zIndex: 1 }}>
      {PHOTOS.map((p, i) => (
        <div key={i} className="flex flex-col items-center"
          style={{ marginTop: 14 + p.dy, transform: `rotate(${p.rot})`,
            transformOrigin: 'top center',
            animation: `photoSway ${2.8 + i * 0.4}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.3}s` }}>
          <div style={{ width: 1.5, height: 22, background: '#7c3a1e', opacity: 0.7 }} />
          <div style={{ width: 10, height: 14, background: '#d4a96a', borderRadius: '2px 2px 4px 4px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)', marginBottom: -2, position: 'relative', zIndex: 2 }} />
          <div style={{ background: 'white', padding: 4, paddingBottom: 18,
            boxShadow: '0 4px 16px rgba(0,0,0,0.22)', borderRadius: 2, width: 72 }}>
            <img src={p.src} alt="memory"
              style={{ width: '100%', height: 64, objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const GiftHub = ({ onSelect }) => (
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
);\n'''

    content = content[:start_idx] + new_block + content[end_idx + 2:]
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('SUCCESS')
